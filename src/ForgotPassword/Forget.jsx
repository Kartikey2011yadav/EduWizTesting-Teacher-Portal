import { Link, useNavigate } from 'react-router-dom';
import logodark from '../assets/logo-dark.svg';
import logolight from '../assets/logo-light.svg';
import { useContext, useState } from 'react';
import axios from 'axios';
import SuccessModal from '../AlertModel/AlertModel';
import { ThemeContext } from '../contexts/ThemeContext';

const Forget = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState(''); // State for email input
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const [isError, setIsError] = useState(false); // State to determine if it's an error modal
  const [shouldNavigate, setShouldNavigate] = useState(false); // State to determine if navigation should happen after modal closes
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Capture email input value
  };

  const handleResetPassword = () => {
    axios
      .post('http://localhost:5000/teacher/forgot-password', { email })
      .then((response) => {
        console.log(response.data);
        setModalMessage('Password reset link sent successfully!');
        setIsError(false);
        setIsModalOpen(true); // Open the modal for success
        setShouldNavigate(true); // Set flag to navigate after modal closes
      })
      .catch((error) => {
        setModalMessage('An error occurred: ' + error.message);
        setIsError(true);
        setIsModalOpen(true); // Open the modal for error
      });
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    if (shouldNavigate) {
      navigate('/'); // Navigate after modal closes if password reset is successful
    }
  };

  return (
    <div className="m-0 w-screen px-[20px] h-screen flex justify-center items-center bg-[#F3F4F6] text-black dark:bg-[#010B18] dark:text-white">
      <div className="m-auto rounded-lg  py-[20px] flex flex-col justify-start items-center shadow-[0px_0px_10px_#00000059;] dark:shadow-[0px_0px_10px_#ffffff7a;] bg-[#FFFFFF] text-black dark:bg-[#1F2937] dark:text-white">
        <div className="flex-col mt-6 px-10 w-full h-fit flex justify-start items-center">
          <img src={theme === 'dark' ? logodark : logolight} className="w-[60px] h-[60px] mb-4" alt="logo" />

          <h1 className="mt-4 text-3xl justify-center font-bold">Forget Password</h1>
          <h1 className="text-lg justify-center text-center text-black dark:text-slate-400 mt-3">
            Enter Your Email to Reset Your Password
          </h1>

          <div className="flex flex-col font-bold mt-10 w-full gap-4 text-lg">
            <h1>Email:</h1>
            <input
              placeholder="Enter Your Email"
              value={email}
              onChange={handleEmailChange}
              className="flex border-2 h-12 rounded-md border-slate-200 dark:border-slate-500 items-center px-4 dark:bg-transparent dark:bg-slate-700 min-h-8"
            />
          </div>

          <button
            onClick={handleResetPassword}
            className="mt-6 w-full h-[50px] bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-xl"
          >
            Reset Password
          </button>

          <div className="flex flex-row gap-1 items-center justify-center mt-4 w-full text-lg">
            <h1>Remember Your Password?</h1>
            <Link to="/" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Modal for displaying success or error messages */}
      <SuccessModal isOpen={isModalOpen} onClose={closeModal} message={modalMessage} isError={isError} />
    </div>
  );
};

export default Forget;
