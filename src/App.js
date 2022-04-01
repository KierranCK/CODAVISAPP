import './App.css';
import React, { useState, useEffect, useCallback, component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Launchpad from './frontend/pages/Launchpad/Launchpad';
import Dashboard from './frontend/pages/Dashboard/Dashboard';
import Report from './frontend/pages/Report/Report';
import About from './frontend/pages/About/About';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Launchpad />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/about" element={<About />} />
          {/* <Route exact path="/about" element={<About />} />  */}
          <Route path="*" element={<Launchpad />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
