import { createContext, useState } from "react";

export const AppContent = createContext();

const AppContext = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState(false);
  const value = {
    backendUrl,
    isLogged,
    setIsLogged,
    userData,
    setUserData,
  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};

export default AppContext;
