import { createContext, useContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    // Check if the username is saved in sessionStorage
    const savedUsername = sessionStorage.getItem("adminUsername");
    return savedUsername || "";
  });

  // Sync username to sessionStorage whenever it changes
  useEffect(() => {
    if (username) {
      sessionStorage.setItem("adminUsername", username);  // Save username to sessionStorage
    }
  }, [username]);

  return (
    <AdminContext.Provider value={{ username, setUsername }}>
      {children}
    </AdminContext.Provider>
  );
};

// Hook for consuming context
export const useAdmin = () => useContext(AdminContext);
