import style from "../styles/userheader.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useHeader } from "../../context/HeaderContext";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

function UserHeader() {
  const context = useUser() || {};
  const { username, setUsername } = context;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const { headerTitle } = useHeader();
  const [imageSrc, setImageSrc] = useState("");
  const [hasNotifications, setHasNotifications] = useState(false);
  const handleNotificationClick = () => {
    setHasNotifications(false); // Clear the red dot
    navigate("/user/notification"); // Adjust this to your actual notifications page route
  };

  const goBack = () => {
    navigate(-1); // This takes the user to the previous page
  };

  // useEffect(() => {
  //   const markNotificationsRead = async () => {
  //     try {
  //       const token = sessionStorage.getItem("individualAuthToken");
  //       // const currentIdentifier = sessionStorage.getItem("individualUsername");
  //       const currentIdentifier = username || sessionStorage.getItem("individualUsername"); // This should hold either username or busName


  //       await axios.put(
  //         `${import.meta.env.VITE_API_BASE_URL}/api/notification/${currentIdentifier}/mark-read`,
  //         {},
  //         { headers: { Authorization: `Bearer ${token}` } }
  //       );
  //     } catch (error) {
  //       console.error("Failed to mark notifications as read:", error);
  //     }
  //   };

  //   markNotificationsRead();
  // }, []);

  // const fetchNotifications = async () => {
  //   try {
  //     const token = sessionStorage.getItem("individualAuthToken");
  //     // const currentIdentifier = username || sessionStorage.getItem("individualUsername");
  //     const currentIdentifier = username || sessionStorage.getItem("individualUsername"); // This should hold either username or busName


  //     const response = await axios.get(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/notification/${currentIdentifier}`,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     const hasUnread = response.data.notifications.some(
  //       (notification) => !notification.read
  //     );

  //     setHasNotifications(hasUnread); // ✅ Correct logic
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotifications();
  // }, [username]);

  useEffect(() => {
    const storedProfileImage = sessionStorage.getItem("profileImage");
    if (storedProfileImage) {
      setImageSrc(storedProfileImage); // Set the header image to the saved one
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        // let currentIdentifier = username || sessionStorage.getItem("individualUsername");

        const currentIdentifier =
        username ||
        sessionStorage.getItem("individualUsername") 

        if (!currentIdentifier) {
          toast.error("Username is not available. Redirecting to login...");
          navigate("/login");
          return;
        }

        // const token = sessionStorage.getItem("individualAuthToken");
        const token =
        sessionStorage.getItem("individualAuthToken")

        if (!token) {
          toast.error("Unauthorized access. Please log in.");
          navigate("/login");
          return;
        }

        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(
          `${API_BASE_URL}/user/one-user/${currentIdentifier}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData(response.data.userData);

        // Optional: If you want to update imageSrc from API if localStorage image is missing
        if (!storedProfileImage && response.data.userData.profilePictureUrl) {
          setImageSrc(response.data.userData.profilePictureUrl);
          sessionStorage.setItem(
            "profileImage",
            response.data.userData.profilePictureUrl
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username, navigate]);

  return (
    <>
      <div className={style.haeder}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />

        <div className={style.dashIcon}>
          <p className={style.dashboard}>{headerTitle}</p>
          <span class="material-symbols-outlined" onClick={goBack}>
            chevron_left
          </span>
        </div>

        <div className={style.dashLogos}>
          <div
            className={style.notificationIcon}
            onClick={handleNotificationClick}
          >
            <span className="material-symbols-outlined">notifications</span>
            {hasNotifications && (
              <span className={style.notificationDot}></span>
            )}
          </div>

          <div className={style.profile}>
            <img
              src={imageSrc || "/images/default-profile.jpg"}
              alt="Profile"
              className={style.person}
            />
          </div>
          <p>{username}</p>
          <span class="material-symbols-outlined">keyboard_arrow_down</span>
        </div>
      </div>
    </>
  );
}

export default UserHeader;
