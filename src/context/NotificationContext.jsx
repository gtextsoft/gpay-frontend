// components/NotificationContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [hasNotifications, setHasNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const username = sessionStorage.getItem("individualUsername");
  const token = sessionStorage.getItem("individualAuthToken");

  const fetchNotifications = async () => {
    if (!username || !token) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/notification/${username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // const lastReadTime = parseInt(sessionStorage.getItem("lastReadTime") || "0");
      const lastReadTime = parseInt(
        sessionStorage.getItem("lastReadTime") || "0"
      );
      const hasUnread = response.data.notifications.some(
        (n) => !n.read || new Date(n.createdAt).getTime() > lastReadTime
      );
      setHasNotifications(hasUnread);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!username || !token) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/notification/${username}/mark-read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Optimistically clear red dot
      setHasNotifications(false);

      sessionStorage.setItem("lastReadTime", Date.now());

      // Optional: refetch to confirm (depends on backend reliability)
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notifications as read:", error);

      setHasNotifications(true); // rollback on error
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Polling every minute to check for new notifications
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [username]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        hasNotifications,
        fetchNotifications,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
