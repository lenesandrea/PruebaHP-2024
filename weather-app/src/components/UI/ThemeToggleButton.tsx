// components/ThemeToggleButton.tsx
import React from 'react';
import styled from 'styled-components';

interface ToggleButtonProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ToggleContainer = styled.div<{ isDark: boolean }>`
  width: 60px;
  height: 30px;
  background-color: ${({ isDark }) => (isDark ? '#87CEEB' : '#FFA500')};
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: fixed;  // Posición fija
  top: 20px;        // Desde la parte superior
  right: 20px;      // Desde la parte derecha
  z-index: 1000;    // Asegurarte de que esté por encima de otros elementos
`;

const ToggleCircle = styled.div<{ isDark: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${({ isDark }) => (isDark ? '#fff' : '#FFD700')};
  border-radius: 50%;
  position: relative;
  left: ${({ isDark }) => (isDark ? '30px' : '0')};
  transition: left 0.3s ease;
`;

const CloudIcon = styled.div`
  position: absolute;
  top: 7px;
  left: 8px;
  font-size: 8px;
  color: white;
`;

const SunIcon = styled.div`
  position: absolute;
  top: 7px;
  left: 8px;
  font-size: 8px;
  color: white;
`;

const ThemeToggleButton: React.FC<ToggleButtonProps> = ({ isDarkTheme, toggleTheme }) => {
  return (
    <ToggleContainer isDark={isDarkTheme} onClick={toggleTheme}>
      <ToggleCircle isDark={isDarkTheme}>
        {isDarkTheme ? <CloudIcon>☁️ </CloudIcon> : <SunIcon>🌞</SunIcon>}
      </ToggleCircle>
    </ToggleContainer>
  );
};

export default ThemeToggleButton;
