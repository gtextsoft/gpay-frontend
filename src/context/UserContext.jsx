// import { createContext, useState, useEffect } from "react";

// export const useUser = createContext();

// export const UserProvider = ({ children }) => {
//   const [username, setUsername] = useState(() => {
//     // Check if the username is saved in localStorage
//     const savedUsername = localStorage.getItem("userUsername");
//     return savedUsername || "";
//   });

//   // Sync username to localStorage whenever it changes
//   useEffect(() => {
//     if (username) {
//       localStorage.setItem("userUsername", username); // Save username to localStorage
//     }
//   }, [username]);

//   return (
//     <useUser.Provider value={{ username, setUsername }}>
//       {children}
//     </useUser.Provider>
//   );
// };



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
    <UserContext.Provider value={{ username, setUsername, userId, setUserId  }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Export a custom hook for easy usage
export const useUser = () => useContext(UserContext);
