import { useLocation, useNavigate } from 'react-router-dom';
import logodark from '../assets/logo-dark.svg';
import logolight from '../assets/logo-light.svg';
import { useContext, useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SuccessModal from '../AlertModel/AlertModel';
import axios from 'axios';
import { ThemeContext } from '../contexts/ThemeContext';

const Reset = () => {
  const { theme } = useContext(ThemeContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false); // Track navigation state
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePasswordStrength = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async () => {
    setLoading(true);

    if (password !== confirmPassword) {
      setModalMessage('Passwords do not match');
      setIsError(true);
      setIsModalOpen(true);
      setLoading(false);
      return;
    }

    if (!validatePasswordStrength(password)) {
      setModalMessage(
        'Password should have at least one uppercase letter, one lowercase letter, one digit, one special character, and a minimum length of 8'
      );
      setIsError(true);
      setIsModalOpen(true);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/teacher/reset-password',
        {
          newPassword: password,
          email,
          token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setModalMessage('Password reset successfully');
        setIsError(false);
        setIsModalOpen(true);
        setShouldNavigate(true); // Set navigation flag to true after success
      } else {
        setModalMessage('Failed to reset password');
        setIsError(true);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setModalMessage('An unexpected error occurred. Please try again later.');
      setIsError(true);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (shouldNavigate) {
      navigate('/'); // Navigate to the home page or login after successful reset
    }
  };

  useEffect(() => {
    document.title = 'Reset Password | EduWiz';
  }, []);

  return (
    <div className="m-0 w-screen px-[20px] h-screen flex justify-center items-center bg-[#F3F4F6] text-black dark:bg-[#010B18] dark:text-white">
      <div className="w-full p-8 max-w-md m-auto rounded-lg py-[20px] flex flex-col justify-start items-center bg-[#FFFFFF] shadow-[0px_0px_10px_#00000059;] dark:shadow-[0px_0px_10px_#ffffff7a;] text-black dark:bg-[#1F2937] dark:text-white">
        <div className="flex-col  w-full h-fit flex justify-start items-center">
          <img src={theme === 'dark' ? logodark : logolight} className="w-[80px] h-[80px]" alt="logo" />
          <h1 className="mt-4 text-2xl justify-center font-[600]">Reset Password</h1>
          <p className=" justify-center text-center text-black dark:text-white mt-2 font-[400]">
            Enter Your Password and Confirm Password
          </p>

          <div className="w-full mt-6  space-y-2 flex flex-col">
            <label htmlFor="password" className="text-sm font-[500] text-black dark:text-white">
              Password:
            </label>

            <div className=" flex relative flex-col   w-full gap-4">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full  text-base border p-2 pr-10 rounded-md  text-black dark:bg-[#374151] dark:text-white bg-[#f8f9fa] outline-none" // Adjusted padding-right (pr-10) for icon spacing
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 cursor-pointer text-gray-500 dark:text-white mt-1"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="w-full mt-6 space-y-2 flex flex-col">
            <label htmlFor="password" className="text-sm font-[500] text-black dark:text-white">
              Confirm Password:
            </label>

            <div className=" flex relative flex-col   w-full gap-4 text-lg">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-base border p-2 pr-10 rounded-md  text-black dark:bg-[#374151] dark:text-white bg-[#f8f9fa] outline-none" // Adjusted padding-right (pr-10) for icon spacing
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-2 cursor-pointer text-gray-500 dark:text-white mt-1"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <button
            disabled={loading}
            onClick={handleResetPassword}
            className="mt-6 w-full h-[40px] bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-[16px]"
          >
            {loading ? 'Please Wait' : 'Reset Password'}
          </button>
        </div>
      </div>

      {/* Success/Error Modal */}
      <SuccessModal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} isError={isError} />
    </div>
  );
};

export default Reset;
