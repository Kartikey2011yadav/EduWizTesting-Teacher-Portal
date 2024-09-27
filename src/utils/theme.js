export function toggleTheme() {
  const html = document.documentElement;
  const elements = document.querySelectorAll('.theme-toggle'); // Elements to add 'dark' class
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    elements.forEach((el) => el.classList.remove('dark'));
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    elements.forEach((el) => el.classList.add('dark'));
  }
}

export function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const elements = document.querySelectorAll('.theme-toggle'); // Elements to add 'dark' class

  if (savedTheme) {
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      elements.forEach((el) => el.classList.add('dark'));
    } else {
      document.documentElement.classList.remove('dark');
      elements.forEach((el) => el.classList.remove('dark'));
    }
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      elements.forEach((el) => el.classList.add('dark'));
    } else {
      document.documentElement.classList.remove('dark');
      elements.forEach((el) => el.classList.remove('dark'));
    }
    localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
  }
}
