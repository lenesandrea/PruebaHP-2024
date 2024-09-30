import { useTheme } from '../../context/ThemeContext';
import React from 'react';
import styled from 'styled-components';


const ToggleContainer = styled.div`
  width: 60px;
  height: 30px;
  background-color: ${({ theme }) => (theme.isDarkMode ? '#87CEEB' : '#FFA500')};
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: fixed;  
  top: 20px;        
  right: 20px;      
  z-index: 1000;    
`;

const ToggleCircle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => (theme.isDarkMode ? '#fff' : '#FFD700')};
  border-radius: 50%;
  position: relative;
  left: ${({ theme }) => (theme.isDarkMode ? '30px' : '0')};
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

const ThemeToggleButton: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <ToggleContainer onClick={toggleTheme}>
      <ToggleCircle>
        {isDarkTheme ? <CloudIcon>☁️ </CloudIcon> : <SunIcon>🌞</SunIcon>}
      </ToggleCircle>
    </ToggleContainer>
  );
};

export default ThemeToggleButton;
