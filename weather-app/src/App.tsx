import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import WeatherSearch from './components/Weather/WeatherSearch';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const { user } = useAuth();
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/weather" /> : <Login />} />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <WeatherSearch />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;