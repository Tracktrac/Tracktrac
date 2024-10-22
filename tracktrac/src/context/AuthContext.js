import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('api_token');
    setIsAuthenticated(!!token); 
  }, []);

  const logout = () => {
    localStorage.removeItem('api_token');
    localStorage.removeItem('code');
    navigate('/'); 
    setIsAuthenticated(false);
  };

  const login =  ()=> {
    setIsAuthenticated(true); 
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
