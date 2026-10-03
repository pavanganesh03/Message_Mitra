import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (phone, password) => {
    const res = await api.post('/auth/login', { phone, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const register = async (name, phone, password, preferredLanguage) => {
    const res = await api.post('/auth/register', { name, phone, password, preferredLanguage });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data));
    setUser(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateLang = (lang) => {
    if(user) {
       const updated = {...user, preferredLanguage: lang};
       setUser(updated);
       localStorage.setItem('user', JSON.stringify(updated));
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateLang }}>
      {children}
    </AuthContext.Provider>
  );
};
