// // UserContext.jsx
// import { createContext, useState, useEffect, useContext } from "react";

// const UserContext = createContext(); // ✅ give it a proper name

// export const UserProvider = ({ children }) => {
//   const [username, setUsername] = useState(() => {
//     return sessionStorage.getItem("individualUsername") || "";
//   });

//   const [userId, setUserId] = useState(() => {
//     return sessionStorage.getItem("userId") || "";
//   });

//   useEffect(() => {
//     if (username) {
//       sessionStorage.setItem("individualUsername", username);
//     }
//   }, [username]);

//   useEffect(() => {
//     if (userId) {
//       sessionStorage.setItem("userId", userId);
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
// import { createContext, useState, useEffect, useContext } from "react";
// import { LOCAL_KEYS } from "../storage/storageKeys";

// const getRoleKeys = () => {
//   const role = sessionStorage.getItem(LOCAL_KEYS.shared.role);
//   return LOCAL_KEYS[role] || {};
// };

// const UserContext = createContext(); // ✅ give it a proper name

// export const UserProvider = ({ children }) => {
//   const keys = getRoleKeys();

//   const [username, setUsername] = useState(() => {
//     return sessionStorage.getItem(keys.username) || "";
//   });

//   const [userId, setUserId] = useState(() => {
//     return sessionStorage.getItem(keys.userId) || "";
//   });

//   useEffect(() => {
//     if (username && keys.username) {
//       sessionStorage.setItem(keys.username, username);
//     }
//   }, [username]);

//   useEffect(() => {
//     if (userId && keys.userId) {
//       sessionStorage.setItem(keys.userId, userId);
//     }
//   }, [userId]);

//   const clearUser = () => {
//     Object.values(LOCAL_KEYS.individual).forEach(key => sessionStorage.removeItem(key));
//     Object.values(LOCAL_KEYS.business).forEach(key => sessionStorage.removeItem(key));
//     sessionStorage.removeItem(LOCAL_KEYS.shared.role);
//     setUsername("");
//     setUserId("");
//   };

//   return (
//     <UserContext.Provider value={{ username, setUsername, userId, setUserId, clearUser}}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // ✅ Export a custom hook for easy usage
// export const useUser = () => useContext(UserContext);

import { createContext, useState, useEffect, useContext } from "react";
import { LOCAL_KEYS } from "../storage/storageKeys";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const role = sessionStorage.getItem(LOCAL_KEYS.shared.role);
  const keys = LOCAL_KEYS[role] || {};

  const [username, setUsername] = useState(() => sessionStorage.getItem(keys.username) || "");
  const [userId, setUserId] = useState(() => sessionStorage.getItem(keys.userId) || "");

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

  const clearUser = () => {
    // Remove both individual and business keys
    Object.values(LOCAL_KEYS.individual).forEach((key) => sessionStorage.removeItem(key));
    Object.values(LOCAL_KEYS.business).forEach((key) => sessionStorage.removeItem(key));
    sessionStorage.removeItem(LOCAL_KEYS.shared.currentRole);
    setUsername("");
    setUserId("");
  };

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
