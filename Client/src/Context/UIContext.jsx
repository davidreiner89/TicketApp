import React, { createContext, useState } from "react";

// Creamos nuestro contexto
export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  // Estado para ocultar o mostrar el menu
  const [ocultarMenu, setOcultarMenu] = useState(false);

  // Mostrar menu
  const showMenu = () => {
    setOcultarMenu(false);
  };

  // Ocultar menu
  const hideMenu = () => {
    setOcultarMenu(true);
  };

  return (
    <UIContext.Provider value={{ ocultarMenu, showMenu, hideMenu }}>
      {children}
    </UIContext.Provider>
  );
};
