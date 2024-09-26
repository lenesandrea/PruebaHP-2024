import { useAuth } from '../../context/AuthContext';
import { googleLogout } from '@react-oauth/google';

const Logout: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    googleLogout();
    logout();
  };

  return <button onClick={handleLogout}>Cerrar Sesión</button>;
};

export default Logout;
