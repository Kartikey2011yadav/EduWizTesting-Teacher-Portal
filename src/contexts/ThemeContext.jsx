import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { initializeTheme as initializeThemeUtils, toggleTheme as toggleThemeUtils } from '../utils/theme';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      initializeThemeUtils();
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
      initializeThemeUtils();
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    toggleThemeUtils();
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

// Define PropTypes for ThemeProvider
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
