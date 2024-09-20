import { useEffect } from 'react';
import { toggleTheme, initializeTheme } from '../utils/theme.js';

const Home = () => {

  useEffect(() => {
    initializeTheme(); // Initialize theme on page load

    const themeToggleBtn = document.getElementById('theme-toggle');
    themeToggleBtn.addEventListener('click', toggleTheme);

    return () => {
      themeToggleBtn.removeEventListener('click', toggleTheme);
    };
  }, []);

  return (
    <div className="text-container-dark dark:text-container-light ">
      Home
      <button id="theme-toggle" className="mt-4 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white rounded-lg">
        Toggle Theme
      </button>

      <div className="container">
        <h1>Login</h1>
        <form>
          <button className='cool' type="submit">Submit</button>
        </form>
      </div>
  
    </div>
  );
};

export default Home;
