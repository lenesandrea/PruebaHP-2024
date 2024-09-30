import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { type } from 'os';

const AlertBoxStyled = styled.div<{ bgColor: string; textColor: string }>`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.textColor};
  padding: 15px;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
`;

const AlertText = styled.p`
  margin: 0;
  padding-left: 10px;
  font-size: 1rem;
  font-weight: 500;
`;

const AlertIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin-right: 10px;
`;

interface AlertBoxProps {
  type?: 'error' | 'warning' | 'info' | 'success';
  message: string;
}

const AlertBox: React.FC<AlertBoxProps> = ({ type = 'info', message }) => {
  let icon, bgColor, textColor;

  switch (type) {
    case 'error':
      icon = faExclamationCircle;
      bgColor = '#FDEAEA';  
      textColor = '#D8000C'; 
      break;
    case 'warning':
      icon = faExclamationTriangle;
      bgColor = '#FFF4E5';  
      textColor = '#9F6000'; 
      break;
    case 'info':
      icon = faInfoCircle;
      bgColor = '#E5F6FD';  
      textColor = '#00529B'; 
      break;
    case 'success':
      icon = faCheckCircle;
      bgColor = '#E6F4EA';  
      textColor = '#4F8A10'; 
      break;
    default:
      icon = faInfoCircle;
      bgColor = '#E5F6FD';
      textColor = '#00529B';
  }

  return (
    <AlertBoxStyled bgColor={bgColor} textColor={textColor}>
      <AlertIcon icon={icon} />
      <AlertText>{message}</AlertText>
    </AlertBoxStyled>
  );
};

export default AlertBox;
