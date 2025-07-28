import { createContext, useState, useEffect, useContext } from "react";
import { LOCAL_KEYS } from "../storage/storageKeys";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const role = sessionStorage.getItem(LOCAL_KEYS.shared.role);
  const keys = LOCAL_KEYS[role] || {};

  const [username, setUsername] = useState(
    () => sessionStorage.getItem(keys.username) || ""
  );
  const [email, setEmail] = useState(
    () => sessionStorage.getItem(keys.email) || ""
  );
  const [userId, setUserId] = useState(
    () => sessionStorage.getItem(keys.userId) || ""
  );

  useEffect(() => {
    if (username && keys.username) {
      sessionStorage.setItem(keys.username, username);
    }
  }, [username, keys.username]);

  useEffect(() => {
    if (userId && keys.userId) {
      sessionStorage.setItem(keys.userId, userId);
    }
  }, [userId, keys.userId]);

  useEffect(() => {
    if (email && keys.email) {
      sessionStorage.setItem(keys.email, email);
    }
  }, [email, keys.email]);

  const clearUser = () => {
    // Remove both individual and business keys
    Object.values(LOCAL_KEYS.individual).forEach((key) =>
      sessionStorage.removeItem(key)
    );
    Object.values(LOCAL_KEYS.business).forEach((key) =>
      sessionStorage.removeItem(key)
    );
    sessionStorage.removeItem(LOCAL_KEYS.shared.currentRole);
    setUsername("");
    setUserId("");
    setEmail("");
  };

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        userId,
        setUserId,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
