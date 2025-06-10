// // UserContext.jsx
// import { createContext, useState, useEffect, useContext } from "react";

// const UserContext = createContext(); // ✅ give it a proper name

// export const UserProvider = ({ children }) => {
//   const [username, setUsername] = useState(() => {
//     return localStorage.getItem("userUsername") || "";
//   });

//   const [userId, setUserId] = useState(() => {
//     return localStorage.getItem("userId") || "";
//   });

//   useEffect(() => {
//     if (username) {
//       localStorage.setItem("userUsername", username);
//     }
//   }, [username]);

//   useEffect(() => {
//     if (userId) {
//       localStorage.setItem("userId", userId);
//     }
//   }, [userId]);

//   return (
//     <UserContext.Provider value={{ username, setUsername, userId, setUserId }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // ✅ Export a custom hook for easy usage
// export const useUser = () => useContext(UserContext);

// UserContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { LOCAL_KEYS } from "../storage/storageKeys";

const getRoleKeys = () => {
  const role = localStorage.getItem(LOCAL_KEYS.shared.role);
  return LOCAL_KEYS[role] || {};
};

const UserContext = createContext(); // ✅ give it a proper name

export const UserProvider = ({ children }) => {
  const keys = getRoleKeys();

  const [username, setUsername] = useState(() => {
    return localStorage.getItem(keys.username) || "";
  });

  const [userId, setUserId] = useState(() => {
    return localStorage.getItem(keys.userId) || "";
  });

  useEffect(() => {
    if (username && keys.username) {
      localStorage.setItem(keys.username, username);
    }
  }, [username]);

  useEffect(() => {
    if (userId && keys.userId) {
      localStorage.setItem(keys.userId, userId);
    }
  }, [userId]);

  const clearUser = () => {
    Object.values(LOCAL_KEYS.individual).forEach(key => localStorage.removeItem(key));
    Object.values(LOCAL_KEYS.business).forEach(key => localStorage.removeItem(key));
    localStorage.removeItem(LOCAL_KEYS.shared.role);
    setUsername("");
    setUserId("");
  };

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId, clearUser}}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Export a custom hook for easy usage
export const useUser = () => useContext(UserContext);
