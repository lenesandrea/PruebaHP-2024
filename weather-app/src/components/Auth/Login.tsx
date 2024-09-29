import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import styled, { ThemeProvider } from 'styled-components';
import ThemeToggleButton from './../UI/ThemeToggleButton';
import lightThemeImage from '../../assets/images/Día.png';
import darkThemeImage from '../../assets/images/noche.png';

const lightTheme = {
  background: '#f0f0f0',
  color: '#333',
  backgroundImage: lightThemeImage, // Ruta para la imagen clara
};

const darkTheme = {
  background: '#282c34',
  color: '#f0f0f0',
  backgroundImage: darkThemeImage, // Ruta para la imagen oscura
};

const Container = styled.div<{ theme: any }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Altura completa de la ventana */
  width: 100vw; /* Ancho completo de la ventana */
  background-color: ${({ theme }) => theme.background};
  background-image: url(${({ theme }) => theme.backgroundImage}); /* Cambiar la imagen de fondo según el tema */
  background-size: cover;
  background-position: center;
  color: ${({ theme }) => theme.color};
  transition: all 0.3s ease;
  overflow: hidden; /* Evitar el desbordamiento */
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
`;

const Login: React.FC = () => {
  const { login } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleLoginSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse.credential) as any;

    login({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    }, credentialResponse.credential);
  };

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Container>
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
