import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    return data;
  };

  const googleLogin = async (token) => {
      const { data } = await api.post('/auth/google', { token });
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
  };

  const updateProfile = async (userData) => {
      const { data } = await api.put('/auth/profile', userData);
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      return data;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, updateProfile, logout, loading }}>
        {!loading && children}
    </AuthContext.Provider>
  );
};
