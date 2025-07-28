import style from "../styles/userheader.module.css";
import axios from "axios";
import { toast} from "react-toastify";
import { useHeader } from "../../context/HeaderContext";
import "react-toastify/dist/ReactToastify.css";
import { useAdmin } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

function UserHeader() {
  const context = useContext(useAdmin) || {};
  const { username, setUsername } = context;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
    const { headerTitle } = useHeader();

  // const context = useUser() || {};
  // const { username, setUsername } = context;
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  // const [userData, setUserData] = useState(null);
  // const { headerTitle } = useHeader();
  // const [imageSrc, setImageSrc] = useState("");
  // const [hasNotifications, setHasNotifications] = useState(false);
  // const handleNotificationClick = () => {
  //   setHasNotifications(false); // Clear the red dot
  //   navigate("/admin/notification"); // Adjust this to your actual notifications page route
  // };

  // const goBack = () => {
  //   navigate(-1); // This takes the user to the previous page
  // };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        let currentUsername = username || sessionStorage.getItem("adminUsername");
        // console.log(sessionStorage.getItem("adminUsername"))

        if (!currentUsername) {
          toast.error("Username is not available. Redirecting to login...");
          navigate("/admin/login");
          return;
        }

        const token = sessionStorage.getItem("adminAuthToken");
        if (!token) {
          toast.error("Unauthorized access. Please log in.");
          navigate("/admin/login");
          return;
        }

        const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
        const response = await axios.get(
          `${API_BASE_URL}/admin/one-admin/${currentUsername}`,
         // `http://localhost:4000/admin/one-admin/${currentUsername}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log(response.data); // Check the response format

        // if (response.data && response.data.userData?.username) {
        //   console.log(response.data.userData.username);
        // }

        setUserData(response.data.adminData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 404) {
          toast.error("User not found. Please check the username.");
        } else {
          toast.error("Failed to fetch user data.");
        }
       
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username, navigate]);

  // useEffect(() => {
  //   const storedProfileImage = sessionStorage.getItem("profileAdminImage");
  //   if (storedProfileImage) {
  //     setImageSrc(storedProfileImage); // Set the header image to the saved one
  //   }

  //   const fetchUser = async () => {
  //     setLoading(true);
  //     try {
       
  //       const currentIdentifier =
  //       username ||
  //       sessionStorage.getItem("adminUsername") 

  //       if (!currentIdentifier) {
  //         toast.error("Username is not available. Redirecting to login...");
  //         navigate("/admin/login");
  //         return;
  //       }

  //       const token =
  //       sessionStorage.getItem("adminAuthToken")

  //       if (!token) {
  //         toast.error("Unauthorized access. Please log in.");
  //         navigate("/admin/login");
  //         return;
  //       }

  //       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  //       const response = await axios.get(
  //         `${API_BASE_URL}/admin/one-admin/${currentUsername}`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       setUserData(response.data.userData);

  //       // Optional: If you want to update imageSrc from API if sessionStorage image is missing
  //       if (!storedProfileImage && response.data.userData.profilePictureUrl) {
  //         setImageSrc(response.data.userData.profilePictureUrl);
  //         sessionStorage.setItem(
  //           "profileAdminImage",
  //           response.data.userData.profilePictureUrl
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching admin data:", error);
  //       toast.error("Failed to fetch admin data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [username, navigate]);

  return (
    <>
   <div className={style.haeder}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />

        <div className={style.dashIcon}>
          <p className={style.dashboard}>{headerTitle}</p>
          <span class="material-symbols-outlined">chevron_left</span>
        </div>

        <div className={style.dashLogos}>
          <span class="material-symbols-outlined">notifications</span>
          <div className={style.profile}>
            
            <img
              src={
                userData?.profilePicture ||
                "/images/default-profile.jpg"
              }
              alt="person"
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
