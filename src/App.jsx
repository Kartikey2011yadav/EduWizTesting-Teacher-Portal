import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import './index.css'
import { useEffect } from 'react';
import { initializeTheme } from './utils/theme.js';
import Login from "./Login/Login.jsx";
import SignUp from './SignUp/SignUp.jsx'
import NotFound from "./NotFound/NotFound.jsx";


const App = () => {
  useEffect(() => {
    initializeTheme(); // Initialize theme on page load
  }, []);

  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/notfound" element={<NotFound />} />
       
      </Routes>
    </Router>
  );
};

export default App;
