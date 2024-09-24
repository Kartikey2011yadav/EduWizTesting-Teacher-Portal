import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Test from "./Test/test.jsx";
import './index.css'
import { useEffect } from 'react';
import { initializeTheme } from './utils/theme.js';
import Login from "./Login/Login.jsx";
import SignUp from './SignUp/SignUp.jsx'
import UploadOmr from "./UploadOMR/UploadOmr.jsx";
import SubmitPage from "./Submit/SubmitPage.jsx";
import Reset from "./Reset/Reset.jsx";


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
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/upload" element={<UploadOmr />} />
        <Route path="/reset_password" element={<Reset />} />
      </Routes>
    </Router>
  );
};
export default App;
