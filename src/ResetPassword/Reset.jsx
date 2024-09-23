import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ThemeToggleButton from '../Components/ThemeToggle';
import  SuccessModal from '../AlertModel/AlertModel'
import axios from 'axios';

const Reset = () => {
  const [logoSrc] = useState(logo);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); 
  const location= useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState('');  // State for modal message
  const [isError, setIsError] = useState(false);  // State to indicate error or success
  const queryParams = new URLSearchParams(location.search);  // Create an instance of URLSearchParams
  const token = queryParams.get('token');  // Get the token from query params
  const email = queryParams.get('email');  // Get the email from query params
  
  const validatePasswordStrength = (password) => {
    // Check for at least one uppercase letter, one lowercase letter, one digit, one special character, and a minimum length of 8
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleResetPassword = async () => {
    setError(''); // Clear any existing errors
    // Simple client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setModalMessage('Passwords do not match');
      setIsError(true);
      setIsModalOpen(true);  // Open the modal
      return;
    }
    
    
    if (!validatePasswordStrength(password)) {
      console.log(validatePasswordStrength(password))
      setModalMessage('Password should have at least one uppercase letter, one lowercase letter, one digit, one special character, and a minimum length of 8');
      setIsError(true);
      setIsModalOpen(true);  // Open the modal
      return;
    }

    try {
      
      const response = await axios.post('http://localhost:5000/teacher/reset-password', {
        newPassword: password,
        email,
        token
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    
      if (response.status === 200) {
        setModalMessage('Password reset successfully');
        setIsError(false);
        setIsModalOpen(true);  // Open success modal
      } else {
        setModalMessage('Failed to reset password');
        setIsError(true);
        setIsModalOpen(true);  // Open error modal
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setModalMessage('An unexpected error occurred. Please try again later.');
      setIsError(true);
      setIsModalOpen(true);  // Open error modal
    }}

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
  };

  return (
    <div className='m-0 w-screen h-screen flex justify-center items-center bg-[#F3F4F6] text-black dark:bg-[#010B18] dark:text-white'>
      <ThemeToggleButton />
      <div className='m-auto rounded-lg w-[40%] h-[82%] flex flex-col justify-start items-center bg-[#FFFFFF] text-black dark:bg-[#1F2937] dark:text-white'>
        <div className='flex-col mt-6 px-10 w-full h-fit flex justify-start items-center'>
          <img src={logoSrc} alt="logo" className='w-[60px] h-[60px]' />
          <h1 className="mt-4 text-3xl justify-center font-bold">Reset Password</h1>
          <h1 className="text-lg justify-center text-black dark:text-slate-400 mt-2">Enter Your Password and Confirm Password</h1>

          {error && <div className="text-red-500">{error}</div>}

          <div className='flex flex-col font-bold mt-10 w-full gap-4 text-lg'>
            <h1>Password:</h1>
           <div className='flex'><input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Your Password'
              type={showPassword ? "text" : "password"}
              className='flex border-2 h-12 px-4 rounded-md w-full border-slate-200 dark:border-2 dark:border-slate-500 items-center dark:bg-transparent dark:bg-slate-700 min-h-8'
            />
            <span onClick={togglePasswordVisibility} className='ml-[-30px] flex justify-center items-center'>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span></div> 
          </div>

          <div className='flex flex-col mt-6 font-bold w-full gap-4 text-lg'>
            <h1>Confirm Password:</h1>
            <div className='flex'><input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm Your Password'
              className='flex h-12 border-2 rounded-md px-4 w-full border-slate-200 dark:border-2 dark:border-slate-500 items-center dark:bg-transparent dark:bg-slate-700 min-h-8'
            />
             <span onClick={toggleConfirmPasswordVisibility} className='ml-[-30px] flex justify-center items-center'>
                {showConfirmPassword ? <FaEye/> : <FaEyeSlash />}
              </span></div>
          </div>

          <button
            onClick={handleResetPassword}
            className='mt-10 w-full h-[50px] bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-xl'
          >
            Reset Password
          </button>

          <div className='flex flex-row gap-1 items-center justify-center mt-4 w-full text-lg'>
            <h1>Remember Password?</h1>
            <Link to='/' className='text-blue-500'>Back to Login</Link>
          </div>
        </div>
      </div>

      {/* Success/Error Modal */}
      <SuccessModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
        isError={isError}
      />
    </div>
  );
};

export default Reset;