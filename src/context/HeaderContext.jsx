import { createContext, useState, useContext } from "react";

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [headerTitle, setHeaderTitle] = useState("Dashboard");
  return (
    <HeaderContext.Provider value={{ headerTitle, setHeaderTitle }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}