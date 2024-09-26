import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const context = useContext(AuthContext);

    // Verifica si el contexto es undefined
    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de AuthProvider");
    }

    // Desestructura las propiedades del contexto
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
