import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import './index.css'
import { useEffect } from 'react';
import { initializeTheme } from './utils/theme.js';
import Dashboard from "./Dashboard/Dashboard.jsx";

const App = () => {
  useEffect(() => {
    initializeTheme(); // Initialize theme on page load
  }, []);

  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element = {<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
