import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definición de la interfaz User
interface User {
  name: string;
  email: string;
  picture: string;
}

// Definición de las propiedades del contexto de autenticación
interface AuthContextProps {
  user: User | null;
  login: (userData: User) => void;
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

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
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
