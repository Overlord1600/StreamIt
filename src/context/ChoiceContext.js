// ChoiceContext.js
import React, { createContext, useState } from 'react';

export const ChoiceContext = createContext();

export const ChoiceProvider = ({ children }) => {
  const [choice, setChoice] = useState('Movie'); // Default choice is 'movie'

  return (
    <ChoiceContext.Provider value={{ choice, setChoice }}>
      {children}
    </ChoiceContext.Provider>
  );
};
