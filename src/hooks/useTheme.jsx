import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Theme: 'light' (warm plaster) or 'dark' (charcoal architectural studio)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('colournest_theme');
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // Accent: 'clay', 'sand', 'sage', 'charcoal', 'indigo', 'bronze', 'rose-clay'
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem('colournest_accent') || 'clay';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('colournest_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('colournest_accent', accent);
  }, [accent]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const changeAccent = (newAccent) => {
    setAccent(newAccent);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accent, changeAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
