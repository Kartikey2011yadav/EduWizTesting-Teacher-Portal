export function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('theme');
  
    if (currentTheme === 'dark') {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  export function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
  
    if (savedTheme) {
      // Apply the saved theme
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Apply system preference or default to light mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
  
      // Save the system preference or default to light
      localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
  }
  