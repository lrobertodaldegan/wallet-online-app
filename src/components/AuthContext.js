import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const BaseURL = 'https://lucasrobertodev.com.br/api/wallet';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    
    if (storedToken) {
      setToken(storedToken);
    }

    return storedToken;
  };

  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');

    return storedToken;
  };

  const signIn = async (newToken, action=()=>null) => {
    await AsyncStorage.setItem('token', newToken);
    setToken(newToken);

    action();
  };

  const signOut = async (action=()=>null) => {
    await AsyncStorage.removeItem('token');
    
    setToken(null);

    action();
  };

  return (
    <AuthContext.Provider value={{ token, signIn, signOut, loadToken, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};