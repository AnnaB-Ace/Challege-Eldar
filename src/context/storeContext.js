import React, { createContext, useContext, useState } from "react";

export const GlobalContext = createContext([]);
export const useGlobalContext = () => {
  // customHook
  return useContext(GlobalContext);
};

// contex Provider
export const GlobalContextProvider = ({ children }) => {
  const [isRole, setIsRol] = useState(false);
  const [rolAdmin, setRolAdmin] = useState(false);
  const [itemEdit, setItemEdit] = useState(null);


  return (
    <GlobalContext.Provider
      value={{
        rolAdmin, setRolAdmin ,isRole, setIsRol, itemEdit, setItemEdit
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalContextProvider;