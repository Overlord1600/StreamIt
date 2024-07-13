import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth 
      ? JSON.parse(storedAuth) 
      : { id: '', username: '', token: '', email: '', isAuth: false };
  });

  const setAuthInfo = (id, username, token, email, isAuth) => {
    const newAuthState = { id, username, token, email, isAuth };
    setAuthState(newAuthState);
    localStorage.setItem('auth', JSON.stringify(newAuthState));
  };
  const clearAuthInfo = () => {
    setAuthState({ id: '', username: '', token: '', email: '', isAuth: false, });
    localStorage.removeItem('auth');
  };
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth && !authState.token) {
      setAuthState(JSON.parse(storedAuth));
    }
  }, [authState]);

  return (
    <AuthContext.Provider value={{ ...authState, setAuthInfo ,clearAuthInfo}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
