import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import ThemeToggleButton from './../UI/ThemeToggleButton';
import lightThemeImage from '../../assets/images/Día.png';
import darkThemeImage from '../../assets/images/noche.png';

const lightTheme = {
  background: '#f0f0f0',
  color: '#333',
  backgroundImage: lightThemeImage, 
};

const darkTheme = {
  background: '#282c34',
  color: '#f0f0f0',
  backgroundImage: darkThemeImage, 
};

const Container = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Altura completa de la ventana */
  width: 100vw; /* Ancho completo de la ventana */
  color: ${({ theme }) => theme.color};
  transition: all 0.3s ease;
  position: relative; /* Para el posicionamiento del fondo */
  overflow: hidden; /* Evitar el desbordamiento */
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center; /* Centrar el texto */
`;

const Login: React.FC = () => {
  const { login, user } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const navigate = useNavigate(); // Instancia useNavigate

  const handleLoginSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential) as any;

    login({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    }, credentialResponse.credential);

    navigate('/weather');
  };

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  useEffect(() => {
    if (user) {
      navigate('/weather');
    };
  }, [user, navigate])
  

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container theme={isDarkTheme ? darkTheme : lightTheme}>
        <ThemeToggleButton isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
        <Title>Weather App</Title>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
