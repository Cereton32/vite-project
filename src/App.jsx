import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntryPage from './component/EntryPage';
import WorkSelectionPage from './component/WorkSelectionPage';
import FinalCalculationPage from './component/FinalCalculationPage';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} /> 
        <Route path="/workselection" element={<WorkSelectionPage />} />
        <Route path='/finalcalculation' element={<FinalCalculationPage/>}></Route>
      </Routes>
    </Router>
  );
}

export default Main;
