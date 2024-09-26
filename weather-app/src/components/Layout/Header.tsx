import React from 'react';
import { googleLogout } from 'react-oauth/google';

const Header: React.FC = () => {
  const handleLogout = () => {
    googleLogout();
    // Limpiar el estado global o token de autenticación
  };

  return (
    <header>
      <h1>Weather & Country Info</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </header>
  );
};

export default Header;
