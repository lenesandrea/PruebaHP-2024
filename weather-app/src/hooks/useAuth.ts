import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de AuthProvider");
    }

    const { user, login, logout } = context;

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
