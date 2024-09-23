import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Test from "./Test/test.jsx";
import './index.css'
import { useEffect } from 'react';
import { initializeTheme } from './utils/theme.js';
import Login from "./Login/Login.jsx";
import SignUp from './SignUp/SignUp.jsx'


import SchedulePaper from "./Schedule/Schedule.jsx";

const App = () => {
  useEffect(() => {
    initializeTheme(); // Initialize theme on page load
  }, []);

  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/schedule" element={<SchedulePaper />} />
      </Routes>
    </Router>
  );
};

export default App;
