import React, { useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

const AuthContext = React.createContext();

const getStoredToken = async setIsLoggedIn => {
  const token = await AsyncStorage.getItem('token');
  setIsLoggedIn(Boolean(token));
};

export const Provider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (loading) {
    return (
      <AppLoading
        startAsync={async () => getStoredToken(setIsLoggedIn)}
        onFinish={() => setLoading(false)}
      />
    );
  }

  const setToken = async token => {
    if (token) {
      await AsyncStorage.setItem('token', token);
    } else {
      await AsyncStorage.removeItem('token');
    }
    setIsLoggedIn(Boolean(token));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
