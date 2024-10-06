export const getUsuarioStorage = () => {
  return {
    agenteLocal: localStorage.getItem("agenteLocal"),
    escritorioLocal: localStorage.getItem("escritorioLocal"),
  };
};
