import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
  }
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #cccccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 100%;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;
