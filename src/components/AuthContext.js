import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const BaseURL = 'https://lucasrobertodev.com.br/api/wallet';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try{
      const storedToken = await AsyncStorage.getItem('token');
      
      if (storedToken && storedToken !== null)
        setToken(storedToken);

    } catch(error) {
      console.error('Erro ao verificar token em cache:', error);
    } finally {
      setIsLoading(false);
    }
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
    <AuthContext.Provider value={{ token, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};