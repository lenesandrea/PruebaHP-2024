// components/Auth/Logout.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Logout: React.FC = () => {
  const { logout } = useAuth(); // Obtén la función de logout del contexto de autenticación

  const handleLogout = async () => {
    await logout(); // Llama a la función de logout
    // Aquí puedes agregar lógica adicional si es necesario, como redirigir al usuario
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default Logout;
