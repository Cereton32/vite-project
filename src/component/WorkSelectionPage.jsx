import React from 'react';
import {useNavigate} from 'react-router-dom'

function WorkSelectionPage() {
    const navigate = useNavigate();
    const handleOAAbutton = () =>{
        
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Select Your Action</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl">
        {/* Box 1 - Get the OAA */}
        <div  onClick={()=>{
             navigate('/finalcalculation')
        }} className="aspect-square flex items-center justify-center p-4 rounded-xl sm:rounded-2xl shadow-lg text-center text-base sm:text-lg font-semibold
              bg-gradient-to-br from-indigo-400 to-blue-400 
              hover:scale-[1.03] hover:shadow-xl
              transition-all duration-200 ease-in-out cursor-pointer
              group relative overflow-hidden">
          <span className="relative z-10">Get the OEE</span>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Box 2 - Previous Excel Data */}
        <div className="aspect-square flex items-center justify-center p-4 rounded-xl sm:rounded-2xl shadow-lg text-center text-base sm:text-lg font-semibold
              bg-gradient-to-br from-rose-400 to-orange-300 
              hover:scale-[1.03] hover:shadow-xl
              transition-all duration-200 ease-in-out cursor-pointer
              group relative overflow-hidden">
          <span className="relative z-10">Previous Excel Data</span>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Box 3 - Upcoming */}
        <div className="aspect-square flex items-center justify-center p-4 rounded-xl sm:rounded-2xl shadow-lg text-center text-base sm:text-lg font-semibold
              bg-gradient-to-br from-emerald-400 to-cyan-400 
              hover:scale-[1.03] hover:shadow-xl
              transition-all duration-200 ease-in-out cursor-pointer
              group relative overflow-hidden">
          <span className="relative z-10">Upcoming</span>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Box 4 - Upcoming */}
        <div className="aspect-square flex items-center justify-center p-4 rounded-xl sm:rounded-2xl shadow-lg text-center text-base sm:text-lg font-semibold
              bg-gradient-to-br from-violet-400 to-fuchsia-400 
              hover:scale-[1.03] hover:shadow-xl
              transition-all duration-200 ease-in-out cursor-pointer
              group relative overflow-hidden">
          <span className="relative z-10">Upcoming</span>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
}

export default WorkSelectionPage;
