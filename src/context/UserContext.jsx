// UserContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext(); // ✅ give it a proper name

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("userUsername") || "";
  });

  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || "";
  });

  useEffect(() => {
    if (username) {
      localStorage.setItem("userUsername", username);
    }
  }, [username]);

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Export a custom hook for easy usage
export const useUser = () => useContext(UserContext);
