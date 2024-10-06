import { useContext, useEffect } from "react";
import { UIContext } from "../Context/UIContext";

export const useHideMenu = (ocultar) => {
  // Obtengo las propiedades necesarias de mi contexto
  const { showMenu, hideMenu } = useContext(UIContext);

  // Cuando se monte el componente miro si el ocultar esta en true/false y ejecuto la función correspondiente.
  useEffect(() => {
    if (ocultar) {
      hideMenu();
    } else {
      showMenu();
    }
  }, [ocultar, hideMenu, showMenu]);
};
