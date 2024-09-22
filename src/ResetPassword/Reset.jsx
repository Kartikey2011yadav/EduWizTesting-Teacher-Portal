import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useEffect, useState } from 'react';
import logo_light from '../assets/logo_light.svg';
import ThemeToggleButton from '../Components/ThemeToggle';

const Reset = () => {
  const [logoSrc, setLogoSrc] = useState(logo);
  const [theme] = useState(localStorage.getItem('theme') || 'dark');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (theme === 'light') {
      setLogoSrc(logo_light);
    } else {
      setLogoSrc(logo);
    }
  }, [localStorage.getItem('theme')]);

  const handleResetPassword = async () => {
    // Simple client-side validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(''); // Clear any existing errors

    try {
      const response = await fetch('https://your-api-endpoint.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newpassword: password,
          email
          
        }),
      });

      if (response.ok) {
        // Handle success, maybe redirect to login or show a success message
        console.log('Password reset successfully');
      } else {
        // Handle error
        console.log('Failed to reset password');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='m-0 w-screen h-screen flex justify-center items-center bg-[#F3F4F6] text-black dark:bg-[#010B18] dark:text-white'>
      <ThemeToggleButton />
      <div className='m-auto rounded-lg w-[40%] h-[78%] flex flex-col justify-start items-center bg-[#FFFFFF] text-black dark:bg-[#1F2937] dark:text-white'>
        <div className='flex-col mt-6 px-10 w-full h-fit flex justify-start items-center'>
          <img src={logoSrc} alt="logo" className='w-[60px] h-[60px]' />
          <h1 className="mt-4 text-3xl justify-center font-bold">Reset Password</h1>
          <h1 className="text-lg justify-center text-black dark:text-slate-400 mt-2">Enter Your Password and Confirm Password</h1>

          {error && <div className="text-red-500">{error}</div>}

          <div className='flex flex-col font-bold mt-10 w-full gap-4 text-lg'>
            <h1>Password:</h1>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Your Password'
              className='flex border-2 h-12 rounded-md border-slate-200 dark:border-2 dark:border-slate-500 items-center dark:bg-transparent dark:bg-slate-700 min-h-8'
            />
          </div>

          <div className='flex flex-col mt-6 font-bold w-full gap-4 text-lg'>
            <h1>Confirm Password:</h1>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm Your Password'
              className='flex h-12 border-2 rounded-md border-slate-200 dark:border-2 dark:border-slate-500 items-center dark:bg-transparent dark:bg-slate-700 min-h-8'
            />
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
    </div>
  );
};

export default Reset;
