import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import './index.css'
import { useEffect } from 'react';
import { initializeTheme } from './utils/theme.js';
import Reset from "./ResetPassword/Reset.jsx";
import Forget from "./ForgetPassword/Forget.jsx";

const App = () => {
  useEffect(() => {
    initializeTheme(); // Initialize theme on page load
  }, []);

  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/reset_password" element={<Reset/>} />
        <Route path="/forget_password" element={<Forget />} />
      </Routes>
    </Router>
  );
};

export default App;
