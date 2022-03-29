import './App.css';
import React, { useState, useEffect, useCallback, component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from './frontend/components/Loading/Loading';
import Launchpad from './frontend/pages/Launchpad/Launchpad';
import Dashboard from './frontend/pages/Dashboard/Dashboard';
import Report from './frontend/pages/Report/Report';
// import About from './frontend/pages/About/About';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Launchpad />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/report" element={<Report />} />
          {/* <Route exact path="/about" element={<About />} />  */}
          <Route path="*" element={<Launchpad />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
