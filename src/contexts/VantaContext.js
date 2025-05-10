import React, { createContext, useState, useContext } from 'react';

const VantaContext = createContext();

export const useVanta = () => useContext(VantaContext);

export const VantaProvider = ({ children }) => {
  // isHomePageActive controls if the HomePage animation sequence is overriding default Vanta behavior
  const [isHomePageActive, setIsHomePageActive] = useState(false);
  // vantaVisibleForHome controls if Vanta should be visible during HomePage's sequence
  const [vantaVisibleForHome, setVantaVisibleForHome] = useState(false);

  return (
    <VantaContext.Provider value={{ isHomePageActive, setIsHomePageActive, vantaVisibleForHome, setVantaVisibleForHome }}>
      {children}
    </VantaContext.Provider>
  );
};