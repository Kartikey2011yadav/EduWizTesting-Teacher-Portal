import logodark from "../assets/logo-dark.svg";
import logolight from "../assets/logo-light.svg";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import AlertModal from "../AlertModel/AlertModel";

export default function Login() {
  const isDark = localStorage.theme === "dark" ? true : false;
  const [visible, setVisible] = useState(false);
  const [showOtp, setOtp] = useState(false);
  const [usrEmail, setusrEmail] = useState("");
  const [usrPass, setusrPass] = useState("");
  const [usrOTP, setusrOTP] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button
  const [modalOpen, setModalOpen] = useState(false); // Modal open state
  const [modalMessage, setModalMessage] = useState(""); // Modal message
  const [isError, setIsError] = useState(false); // Modal error state
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("sessionId"); // Remove session ID from local storage
    navigate("/"); // Redirect back to login page
  };

  useEffect(() => {
    document.title = "Admin:login";

    // Check if session ID exists in local storage and is still valid
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      // Verify the session ID with the backend
      axios
        .post("http://localhost:5000/teacher/verify-session", { sessionId })
        .then((response) => {
          if (response.data.valid) {
            navigate("/Dashboard"); // Navigate to dashboard if session is valid
          } else {
            handleLogout();
          }
        })
        .catch(() => handleLogout());
    }
  }, [navigate]);

  const closeModal = () => {
    setModalOpen(false);
    if (shouldNavigate) {
      navigate("/Dashboard");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Send login request to get OTP
    axios
      .post("http://localhost:5000/teacher/login", {
        email: usrEmail,
        password: usrPass,
      })
      .then((response) => {
        setModalMessage(response.data.message);
        setModalOpen(true); // Open modal
        setIsError(false); // It's a success
        setOtp(true); // Show OTP input field
      })
      .catch((error) => {
        console.error(error);
        setModalMessage("please check your email or password");
        setIsError(true); // It's an error
        setModalOpen(true); // Open modal
      })
      .finally(() => {
        setLoading(false); // Set loading to false to enable the button
      });
  };

  const handleOTP = (e) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true); // Set loading to true

    // Send OTP verification request
    axios
      .post("http://localhost:5000/teacher/verify-otp", {
        email: usrEmail,
        otp: usrOTP,
      })
      .then((response) => {
        setModalMessage(response.data.message);
        setIsError(false);
        setModalOpen(true);
        setShouldNavigate(true);

        localStorage.setItem("adminId", response.data.adminId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("mobileNumber", response.data.mobileNumber);
        localStorage.setItem("sessionId", response.data.sessionId);
      })
      .catch((error) => {
        console.error(error);
        setModalMessage("Error in logging");
        setIsError(true);
        setModalOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 dark:bg-background-dark bg-background-light`}
    >
      <div className="w-full max-w-md p-8 space-y-6 rounded-lg shadow-md bg-container-light dark:bg-container-dark">
        <div className="flex flex-col items-center space-y-2">
          <img
            src={isDark ? logodark : logolight}
            className={`${open && "w-20"} `}
            alt=""
          />
          <h1 className="text-2xl font-bold text-center text-black dark:text-white">
            Sign In to EduWiz
          </h1>
          <p className="text-gray-500 text-center text-black dark:text-white">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        <form
          onSubmit={showOtp ? handleOTP : handleLogin}
          className="space-y-4"
        >
          <div className="space-y-2 flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-black dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Enter Username or Email"
              required
              value={usrEmail}
              onChange={(e) => setusrEmail(e.target.value)}
              className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:text-black"
            />
          </div>
          <div className="space-y-2 flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-black dark:text-white"
            >
              Password
            </label>

            <div className="relative w-full">
              <input
                type={visible ? "text" : "password"}
                placeholder="Enter Your Password"
                required
                value={usrPass}
                onChange={(e) => setusrPass(e.target.value)}
                className="w-full border p-2 pr-10 rounded-md border-gray text-black dark:text-black" // Adjusted padding-right (pr-10) for icon spacing
              />
              <span
                onClick={() => setVisible(!visible)}
                className="absolute right-2 top-2 cursor-pointer text-gray-500 dark:text-black mt-1"
              >
                {visible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {showOtp && (
            <input
              className="login_otp"
              type="text"
              placeholder="Enter OTP"
              required
              value={usrOTP}
              onChange={(e) => setusrOTP(e.target.value)}
            />
          )}

          <div className="flex items-center justify-between">
            <Link
              to="/SignUp"
              className="text-sm text-primary-light dark:text-white font-bold hover:underline"
            >
              Create account
            </Link>
            <Link
              to="/ForgetPassword"
              className="text-sm text-primary-light dark:text-white font-bold hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="">
            <button
              disabled={loading}
              className="w-full bg-primary-light hover:bg-hover-light dark:bg-primary-dark dark:hover:bg-hover-dark text-white rounded-md p-2"
              type="submit"
            >
              {loading ? "Please wait..." : showOtp ? "Login" : "Send OTP"}
            </button>
          </div>
        </form>
      </div>
      {/* Alert Modal */}
      <AlertModal
        isOpen={modalOpen}
        onClose={closeModal}
        message={modalMessage}
        isError={isError}
      />
    </div>
  );
}
