import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Reset from "./Reset/Reset";
import './index.css'
import { useEffect } from 'react';
import { initializeTheme } from './utils/theme.js';

const App = () => {
  useEffect(() => {
    initializeTheme(); // Initialize theme on page load
  }, []);

  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
};

export default App;
