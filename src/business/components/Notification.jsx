import React, { useEffect, useState } from "react";
import style from "../styles/usernotification.module.css";
import axios from "axios";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const username = localStorage.getItem("userUsername");
  const token = localStorage.getItem("userAuthToken");

  useEffect(() => {
    const markAllAsRead = async () => {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/api/notification/${username}/mark-read`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Notifications marked as read");
      } catch (error) {
        console.error("Error marking notifications as read:", error);
      }
    };
  
    markAllAsRead();
  }, [username]);

  
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/notification/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [username]);

  return (
    <div>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <React.Fragment key={notification.notificationId || index}>
            <div className={style.notification}>
              <div className={style.notificationLeft}>
                <p className={style.notiInvest}>{notification.update}</p>
                <p className={style.notiPlan}>{notification.title}</p>
                {/* <p>{notification.description}</p> */}
                <p>{notification.date}</p>
              </div>

              <div
                className={style.notificationRight}
                onClick={() =>
                  setExpandedRow(expandedRow === index ? null : index)
                }
              >
                <button className={style.btn}>View detail</button>
              </div>
            </div>

            {expandedRow === index && (
              <div className={style.expandedDetails}>
                <p>
                  <strong>Notification ID:</strong> {notification._id}
                </p>
                <p>
                  <strong>Title:</strong> {notification.title}
                </p>
                <p>
                  <strong>Update:</strong> {notification.update}
                </p>
                <p>
                  <strong>Description:</strong> {notification.description}
                </p>
                <p>
                  <strong>Date:</strong> {notification.date}
                </p>
              </div>
            )}
          </React.Fragment>
        ))
      ) : (
    
          <p colSpan="6">No notifications found</p>
     
      )}
    </div>
  );
}

export default Notification;

