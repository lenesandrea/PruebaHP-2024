import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import to decode the JWT token

// Definición de la interfaz User
interface User {
  name: string;
  email: string;
  picture: string;
}

// Definición de las propiedades del contexto de autenticación
interface AuthContextProps {
  user: User | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Interfaz para las propiedades del proveedor de autenticación
interface AuthProviderProps {
  children: ReactNode;
}

// Proveedor de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check local storage for existing user data and token when the app initializes
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      const decodedToken: any = jwtDecode(storedToken);

      // Check if the token is still valid
      if (decodedToken.exp * 1000 > Date.now()) {
        setUser(JSON.parse(storedUser)); // Set the user if the token is valid
      } else {
        // If the token is expired, clear storage and logout
        logout();
      }
    }
  }, []);

  const login = (userData: User, token: string) => {
    // Store the token and user data in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);

    // Update state with the logged-in user
    setUser(userData);
  };

  const logout = () => {
    // Clear user and token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Clear the user state
    setUser(null);

    console.log("Usuario ha cerrado sesión.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportar el contexto para que sea accesible en otros archivos
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de AuthProvider");
  }
  return context;
};

// Exportar AuthContext si es necesario (opcional)
export { AuthContext };
