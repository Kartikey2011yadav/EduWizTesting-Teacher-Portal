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
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value); // Capture email input value
  };

  const handleResetPassword = () => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
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
      <div className="w-full max-w-md m-auto rounded-lg  p-8 flex flex-col justify-start items-center shadow-[0px_0px_10px_#00000059;] dark:shadow-[0px_0px_10px_#ffffff7a;] bg-[#FFFFFF] text-black dark:bg-[#1F2937] dark:text-white">
        <div className="flex-col  w-full h-fit flex justify-start items-center">
          <img src={theme === 'dark' ? logodark : logolight} className="w-[80px] h-[80px]" alt="logo" />

          <h1 className="mt-4 text-2xl justify-center font-[600]">Forget Password</h1>
          <p className=" justify-center text-center text-black dark:text-white mt-3 font-[400]">
            Enter Your Email to Reset Your Password
          </p>
          <div className="flex flex-col  mt-10 w-full gap-4 text-lg">
            <label htmlFor="email" className="text-md font-[500] text-black dark:text-white">
              Email:
            </label>
            <input
              type="text"
              placeholder="Enter Username or Email"
              required
              value={email}
              onChange={handleEmailChange}
              className="w-full border p-2 pr-10 rounded-md  text-black dark:bg-[#374151] dark:text-white bg-[#f8f9fa] outline-none"
            />
          </div>

          <button
            disabled={loading}
            onClick={handleResetPassword}
            className="mt-6 w-full h-[40px] bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-600 dark:bg-blue-500 text-white rounded-lg text-[16px]"
          >
            {loading ? 'Please Wait' : 'Reset Password'}
          </button>

          <div className="flex flex-row gap-1 items-center justify-center mt-4 w-full text-lg">
            <h1 className="font-bold text-[16px]">Remember Your Password?</h1>
            <Link to="/" className="text-blue-500 font-bold text-[16px] hover:underline">
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
