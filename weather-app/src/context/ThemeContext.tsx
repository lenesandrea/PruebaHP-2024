import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import lightThemeImage from './../assets/images/Día.png';
import darkThemeImage from './../assets/images/noche.png';

const lightTheme = {
  background: '#f0f0f0',
  color: '#333',
  backgroundImage: lightThemeImage, 
  isDarkMode: false
};

const darkTheme = {
  background: '#282c34',
  color: '#f0f0f0',
  backgroundImage: darkThemeImage,
  isDarkMode: true
};

const ThemeContext = createContext<any>(null);

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);
  
  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
