import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token, id } = useContext(AuthContext);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/find/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  };

  const [currentUser, setCurrentUser] = useState(() => {
    const fetchUser = async () => {
      const user = await fetchCurrentUser();
      setCurrentUser(user);
    };
    fetchUser();
  });

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await fetchCurrentUser();
  //     setCurrentUser(user);
  //   };

  //   fetchUser();
  // }, [token, id]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
