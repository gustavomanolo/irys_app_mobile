import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const CONTEXT_EMPTY = {
    category: null,
    subcategory: null,
    description: null,
    location: null
  }

  const [dataContext, setDataContext] = useState(CONTEXT_EMPTY);
  const resetContext = () => {
    setDataContext(CONTEXT_EMPTY)
  }

  return (
    <DataContext.Provider value={{ dataContext, setDataContext, resetContext }}>
      {children}
    </DataContext.Provider>
  );
};
