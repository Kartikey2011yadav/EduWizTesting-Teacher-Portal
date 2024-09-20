import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { initializeTheme, toggleTheme } from '../utils/theme.js';

const ThemeToggleButton = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Initialize theme based on user's preference or system preference on mount
    useEffect(() => {
      initializeTheme();
      const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      setDarkMode(savedTheme === 'dark');
    }, []);
  
    // Toggle dark mode
    const handleToggle = () => {
      toggleTheme();
      setDarkMode(!darkMode); // Flip state
    };

  return (
    <button
      onClick={handleToggle}
      className="relative w-16 h-8 rounded-full bg-primary dark:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ease-in-out"
      aria-label="Toggle Dark Mode"
    >
      <div className="flex items-center justify-between h-full px-1">
        <Sun className="w-5 h-5 text-yellow-500" />
        <Moon className="w-5 h-5 text-indigo-300" />
      </div>
      <div
        className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full dark:bg-primary bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
          darkMode ? 'translate-x-8' : ''
        }`}
      />
    </button>
  );
};

export default ThemeToggleButton;