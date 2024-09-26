// src/App.jsx
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";

import Login from "./Login/Login.jsx";
import SignUp from "./SignUp/SignUp.jsx";
import NotFound from "./NotFound/NotFound.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import SchedulePaper from "./Schedule/Schedule.jsx";
import Reset from "./ResetPassword/Reset.jsx";
import Forget from "./ForgotPassword/Forget.jsx";
import ProtectedLayout from "./Layout/ProtectedLayout.jsx";

import "./index.css";
import { initializeTheme } from "./utils/theme.js";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const publicRoutes = [
      "/",
      "/signup",
      "/forget_password",
      "/reset_password",
    ];
    const sessionId = localStorage.getItem("sessionId");

    // If the current route is public, skip the authentication check
    if (publicRoutes.includes(location.pathname)) {
      return;
    }

    if (sessionId) {
      axios
        .post("http://localhost:5000/teacher/verify-session", { sessionId })
        .then((response) => {
          if (response.data.valid) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("sessionId");
            setIsAuthenticated(false);
            navigate("/"); // Redirect to login
          }
        })
        .catch(() => {
          localStorage.removeItem("sessionId");
          setIsAuthenticated(false);
          navigate("/"); // Redirect to login
        });
    } else {
      setIsAuthenticated(false);
      navigate("/"); // Redirect to login
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

      {/* Protected Routes */}
      {isAuthenticated && (
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/schedule" element={<SchedulePaper />} />
          {/* Add more protected routes here */}
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
