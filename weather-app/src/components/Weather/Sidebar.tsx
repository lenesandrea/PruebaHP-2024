// components/Sidebar.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="sidebar">
      <h2>Historial de Búsquedas</h2>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Sidebar;
