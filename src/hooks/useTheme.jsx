import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Theme is locked to 'light' (Warm Ivory / Deep Ink / Indigo / Pale Gold)
  // to maintain the static brand identity required by the creative director.
  const [theme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    try {
      localStorage.removeItem('colournest_theme');
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    // Intentionally no-op to maintain fixed brand identity
  };

  // Fixed Brand Identity: We do NOT mutate document accent on room material changes
  const changeAccent = () => {
    // Intentionally no-op to protect fixed brand identity
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accent: 'indigo', changeAccent }}>
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
