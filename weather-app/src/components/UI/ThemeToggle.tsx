import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

const lightTheme = {
  background: '#f0f0f0',
  color: '#333',
};

const darkTheme = {
  background: '#282c34',
  color: '#f0f0f0',
};

const Container = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  transition: all 0.3s ease;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
`;

const ThemeToggle: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
        <Title>Weather App</Title>
        <ToggleButton onClick={toggleTheme}>
          Cambiar a {isDarkTheme ? 'claro' : 'oscuro'}
        </ToggleButton>
      </Container>
    </ThemeProvider>
  );
};

export default ThemeToggle;
