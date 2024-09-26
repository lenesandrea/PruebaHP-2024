import styled from 'styled-components';

export const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const WeatherInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const WeatherButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
