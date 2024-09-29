import { useLocation, useNavigate } from 'react-router-dom';
import logodark from '../assets/logo-dark.svg';
import logolight from '../assets/logo-light.svg';
import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SuccessModal from '../AlertModel/AlertModel';
import axios from 'axios';
import { ThemeContext } from '../contexts/ThemeContext';

const Reset = () => {
  const { theme } = useContext(ThemeContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
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
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
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

  return (
    <div className="m-0 w-screen px-[20px] h-screen flex justify-center items-center bg-[#F3F4F6] text-black dark:bg-[#010B18] dark:text-white">
      <div className="m-auto rounded-lg py-[20px] flex flex-col justify-start items-center bg-[#FFFFFF] shadow-[0px_0px_10px_#00000059;] dark:shadow-[0px_0px_10px_#ffffff7a;] text-black dark:bg-[#1F2937] dark:text-white">
        <div className="flex-col px-10 w-full h-fit flex justify-start items-center">
          <img src={theme === 'dark' ? logodark : logolight} className="w-[60px] h-[60px] mb-4" alt="logo" />
          <h1 className="mt-4 text-3xl justify-center font-bold">Reset Password</h1>
          <h1 className="text-lg justify-center text-center text-black dark:text-slate-400 mt-2">
            Enter Your Password and Confirm Password
          </h1>

          {error && <div className="text-red-500">{error}</div>}

          <div className="flex flex-col font-bold mt-10 w-full gap-4 text-lg">
            <h1>Password:</h1>
            <div className="flex">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                type={showPassword ? 'text' : 'password'}
                className="flex border-2 h-12 px-4 rounded-md w-full border-slate-200 dark:border-slate-500 items-center dark:bg-transparent dark:bg-slate-700"
              />
              <span onClick={togglePasswordVisibility} className="ml-[-30px] flex justify-center items-center">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <div className="flex flex-col mt-6 font-bold w-full gap-4 text-lg">
            <h1>Confirm Password:</h1>
            <div className="flex">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Your Password"
                className="flex h-12 border-2 rounded-md px-4 w-full border-slate-200 dark:border-slate-500 items-center dark:bg-transparent dark:bg-slate-700"
              />
              <span onClick={toggleConfirmPasswordVisibility} className="ml-[-30px] flex justify-center items-center">
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <button
            disabled={loading}
            onClick={handleResetPassword}
            className="mt-6 w-full h-[50px] bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-xl"
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
