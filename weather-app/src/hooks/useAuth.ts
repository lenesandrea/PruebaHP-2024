import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const { user, login, logout } = useContext(AuthContext);

    const isAuthenticated = () => {
        return !!user; 
    };

    return {
        user,
        login,
        logout,
        isAuthenticated,
    };
};

export default useAuth;
