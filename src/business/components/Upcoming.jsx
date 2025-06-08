import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/upcoming.module.css";

import { NavLink } from "react-router-dom";

function Upcoming() {

  const [notifications, setNotifications] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${API_BASE_URL}/admin/notification`);

        console.log("API Response:", response.data); // Debugging log

        if (response.data && Array.isArray(response.data.allNotifications)) {
          const formattedNotifications = response.data.allNotifications.flatMap(
            (user) =>
              user.notifications.map((notification) => ({
                ...notification,
                username: user.username, // Attach username to each notification
              }))
          );

          setNotifications(formattedNotifications);
        } else {
          console.error("Invalid data format:", response.data);
          setNotifications([]);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />


      <div className={style.upcoming}>
        <div className={style.upAll}>
          <p className={style.up}>Upcoming Actions</p>
          <button className={style.view}>
                  <NavLink to="/user/notification" className={style.link}>
                    View All
                  </NavLink>
                </button>
        </div>

        {notifications.length > 0 ? (
        notifications.slice(0, 3).map((notification, index) => (
          <React.Fragment key={notification.notificationId || index}>
            
        <div className={style.dateInvest}>
          <div className={style.date}>
            <p className={style.wed}>{notification.date}</p>
            {/* <p className={style.colorl}>16</p> */}
          </div>
          <div className={style.investDirect}>
            <div className={style.invest}>
              <p className={style.color}> {notification.title}</p>
              <p className={style.colors}>{notification.update}</p>
            </div>
            <NavLink to="/user/notification" className={style.linke}>
                   
                   <span class="material-symbols-outlined">arrow_right</span>
                   </NavLink>
          </div>
        </div>
      </React.Fragment>
        ))
      ) : (
        <p>
          No notifications found
          {/* <td colSpan="6">No notifications found</td> */}
        </p>
      )}
      </div>
    </>
  );
}

export default Upcoming;
