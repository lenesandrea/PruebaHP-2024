import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import WeatherDashboard from './components/Weather/WeatherDashboard';
import { useAuth, AuthProvider } from './context/AuthContext';
import GlobalStyles from './assets/styles/GlobalStyles';
import { ThemeContextProvider } from './context/ThemeContext'; 

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeContextProvider>  
        <Router>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/weather"
              element={
                <ProtectedRoute>
                  <WeatherDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeContextProvider>
    </AuthProvider>
  );
};

export default App;
