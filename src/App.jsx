import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import Login from './Login/Login.jsx';
import SignUp from './SignUp/SignUp.jsx';
import NotFound from './NotFound/NotFound.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import SchedulePaper from './Schedule/Schedule.jsx';
import Reset from './ResetPassword/Reset.jsx';
import Forget from './ForgotPassword/Forget.jsx';
import AddQuestion from './AddQuestion/AddQuestion.jsx';
import ProtectedLayout from './Layout/ProtectedLayout.jsx';

import './index.css';
import { initializeTheme } from './utils/theme.js';
import IHaveAPasscode from './IHaveAPasscode/IHaveAPasscode.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ['/', '/signup', '/forget_password', '/reset_password', '/ihaveapasscode'];
    const sessionId = localStorage.getItem('sessionId');

    // If the current route is public, skip the authentication check
    if (publicRoutes.includes(location.pathname)) {
      return;
    }

    if (sessionId) {
      axios
        .post('http://localhost:5000/teacher/verify-session', { sessionId })
        .then((response) => {
          if (response.data.valid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('sessionId');
            setIsAuthenticated(false);
            navigate('/');
          }
        })
        .catch(() => {
          localStorage.removeItem('sessionId');
          setIsAuthenticated(false);
          navigate('/');
        });
    } else {
      setIsAuthenticated(false);
      navigate('/');
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    initializeTheme(); // Initialize theme on page load
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/reset_password" element={<Reset />} />
      <Route path="/forget_password" element={<Forget />} />
      <Route path="/ihaveapasscode" element={<IHaveAPasscode />} />

      {/* Protected Routes */}
      {isAuthenticated && (
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<SchedulePaper />} />
          <Route path="/add-question" element={<AddQuestion />} />
        </Route>
      )}

      {/* Fallback Route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Wrap App with Router to provide routing context
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
