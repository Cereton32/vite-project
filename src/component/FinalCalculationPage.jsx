import React, { useState } from 'react';
import { read, utils, writeFile } from 'xlsx';
import axios from 'axios';

function FinalCalculationPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const wb = read(e.target.result, { type: 'array' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = utils.sheet_to_json(ws);

        const requiredColumns = ['Date', 'MachineId', 'Availability', 'Performance'];
        const columns = Object.keys(jsonData[0] || {});
        
        if (!requiredColumns.every(col => columns.includes(col))) {
          throw new Error('Missing required columns in Excel file');
        }

        const processedData = jsonData.map(row => ({
          ...row,
          Quality: '',
          OEE: 0
        }));

        setData(processedData);
        setError('');
      } catch (err) {
        setError('Invalid file format or missing required columns');
        setData([]);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleQualityChange = (index, value) => {
    const newData = [...data];
    const numericValue = Math.min(Math.max(parseFloat(value || 0), 0), 1);
    
    newData[index].Quality = numericValue;
    newData[index].OEE = (
      newData[index].Availability * 
      newData[index].Performance * 
      numericValue
    ).toFixed(4);

    setData(newData);
  };

  const handleDownload = () => {
    const ws = utils.json_to_sheet(data.map(row => ({
      ...row,
      Quality: parseFloat(row.Quality),
      OEE: parseFloat(row.OEE)
    })));
    
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Results");
    writeFile(wb, "OEE_Results.xlsx");
  };

  const handleUploadToMongoDB = async () => {
  try {
    if (!data || data.length === 0) {
      setUploadMessage('No data available for upload.');
      return;
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${timestamp} - Aman's import`;
    
    // Log the data to make sure it's being passed correctly
    console.log('Data to upload:', data);
    
    const response = await axios.post('http://localhost:5003/uploadData', { filename, data }); // Ensure correct backend URL
    setUploadMessage(response.data.message);
  } catch (error) {
    console.error("Error uploading data:", error); // Add more details to error log
    setUploadMessage('Error uploading data to MongoDB');
  }
};


  const allQualityFilled = data.every(row => row.Quality !== '');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">OEE Calculator</h1>
        
        <div className="mb-8">
          <label className="block mb-2 font-medium">
            Upload Excel File:
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileUpload}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </label>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {data.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  {['Date', 'MachineId', 'Availability', 'Performance', 'Quality', 'OEE'].map(header => (
                    <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{row.Date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.MachineId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.Availability}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.Performance}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        max="1"
                        step="0.01"
                        value={row.Quality}
                        onChange={(e) => handleQualityChange(index, e.target.value)}
                        className="w-20 px-2 py-1 border rounded focus:ring-blue-500 focus:border-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{row.OEE}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {data.length > 0 && (
          <div className="mt-6">
            <button
              onClick={handleDownload}
              disabled={!allQualityFilled}
              className={`px-4 py-2 rounded-lg font-semibold ${allQualityFilled ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Download Updated Excel
            </button>
            <button
              onClick={handleUploadToMongeoDB}
              disabled={!allQualityFilled}
              className="ml-4 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Upload to MongoDB
            </button>
            <p className="mt-2 text-sm text-gray-600">{uploadMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FinalCalculationPage;
