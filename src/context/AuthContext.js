import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedAuth = localStorage.getItem('auth');
    return storedAuth 
      ? JSON.parse(storedAuth) 
      : { id: '', username: '', token: '', email: '', isAdmin: false };
  });

  const setAuthInfo = (id, username, token, email, isAdmin) => {
    const newAuthState = { id, username, token, email, isAdmin };
    setAuthState(newAuthState);
    localStorage.setItem('auth', JSON.stringify(newAuthState));
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth && !authState.token) {
      setAuthState(JSON.parse(storedAuth));
    }
  }, [authState.token]);

  return (
    <AuthContext.Provider value={{ ...authState, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
