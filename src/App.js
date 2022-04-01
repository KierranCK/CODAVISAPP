import './App.css';
import React, { useState, useEffect, useCallback, component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Launchpad from './frontend/pages/Launchpad/Launchpad';
import Dashboard from './frontend/pages/Dashboard/Dashboard';
import Report from './frontend/pages/Report/Report';
import Country from './frontend/pages/Country/Country'
import About from './frontend/pages/About/About';
import Error from './frontend/pages/Error/Error';

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Launchpad />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/country" element={<Country />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
