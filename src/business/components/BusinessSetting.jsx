import { useState, useEffect } from "react";
import axios from "axios";
import style from "../styles/usernotification.module.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../../context/UserContext"; // Make sure you're importing the context

function BusinessSetting() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(
    sessionStorage.getItem("profileImage") || ""
  );

  const { username, email } = useUser();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    gender: "",
    dateEstablished: "",
    // maritalStatus: "",
    // employmentStatus: "",
    city: "",
    state: "",
    country: "",
    profilePicture: "",
  });

  const [isEditing, setIsEditing] = useState(false); // Controls edit mode
  // const [loading, setLoading] = useState(false); // Loading state to improve user experience
  const [formattedDate, setFormattedDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, profilePicture: file }));
      setImageSrc(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  const handleSubmit = async () => {
    try {
      // const currentUsername = sessionStorage.getItem("individualUsername");
      // const currentUsername =
      // sessionStorage.getItem("individualUsername") || 
      // sessionStorage.getItem("busUsername");
      const currentUsername = username || sessionStorage.getItem("busUsername") || sessionStorage.getItem("individualUsername");

      if (!currentUsername) {
        toast.error("Username is not available. Please log in again.");
        return;
      }

      // const token = sessionStorage.getItem("individualAuthToken");
      const token =
      sessionStorage.getItem("individualAuthToken") || // individual
      sessionStorage.getItem("businessAuthToken");
      if (!token) {
        toast.error("Unauthorized access. Please log in.");
        return;
      }

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "profileBusPicture") {
          // Only append the image if a new file is selected
          if (formData[key] instanceof File) {
            data.append(key, formData[key]);
          }
        } else {
          data.append(key, formData[key] || "");
        }
      });

      console.log("Form data before submission:", formData);

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

      const response = await axios.put(
        `${API_BASE_URL}/user/bus/profile/${currentUsername}`,
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(response.data.message);

      const updatedProfileData = {
        ...formData,
        profilePictureUrl: response.data.profilePictureUrl || imageSrc, // Keep existing image if not updated
      };

      sessionStorage.setItem("profileData", JSON.stringify(updatedProfileData));
      sessionStorage.setItem(
        "profileBusImage",
        updatedProfileData.profilePictureUrl
      );

      setImageSrc(updatedProfileData.profilePictureUrl); // Keep the same profile picture

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      // const currentUsername = sessionStorage.getItem("individualUsername");
      const currentUsername =
          username ||
          sessionStorage.getItem("individualUsername") || // individual
          sessionStorage.getItem("busUsername"); 
      if (!currentUsername) {
        toast.error("User not found. Please log in.");
        return;
      }

      // const token = sessionStorage.getItem("individualAuthToken");
      const token =
      sessionStorage.getItem("individualAuthToken") || // individual
      sessionStorage.getItem("businessAuthToken");
      console.log("Retrieved Token:", token); // Debugging

      if (!token) {
        toast.error("Unauthorized access. Please log in.");
        return;
      }

      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

        const response = await axios.get(
          `${API_BASE_URL}/user/bus/profile/${currentUsername}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Fetched Profile Data:", response.data); // Debugging

        setFormData(response.data.data);
        // Ensure profile picture updates correctly
        if (response.data.data.profilePictureUrl) {
          const updatedImageUrl = `${
            response.data.data.profilePictureUrl
          }?t=${new Date().getTime()}`; // Prevent caching
          setImageSrc(updatedImageUrl);
          sessionStorage.setItem("profileBusImage", updatedImageUrl);
        }

        // Save fresh data in localStorage
        sessionStorage.setItem("profileData", JSON.stringify(response.data.data));
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to fetch profile data.");
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    // Convert the ISO date string to the correct format (yyyy-MM-dd)
    if (formData.dateEstablished) {
      const date = new Date(formData.dateEstablished);
      const formatted = date.toISOString().split("T")[0]; // "yyyy-MM-dd"
      setFormattedDate(formatted);
    }
  }, [formData.dateEstablished]);

  const handlePasswordClick = () => {
    navigate("/user/business-settings"); // Navigate to the '/compound' page
  };

  const handleProfileClick = () => {
    navigate("/user/business-password"); // Navigate to the '/compound' page
  };

  return (
    <div>
      <div className={style.set}>
        <div className={style.profilePassword}>
          <button className={style.profile} onClick={handlePasswordClick}>
            Profile
          </button>
          <button className={style.password} onClick={handleProfileClick}>
            Password
          </button>
        </div>

        <div className={style.imageText}>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          ) : (
            <img src="defaultImagePath.jpg" alt="Default Profile" />
          )}
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
            disabled={!isEditing}
          />

          <div className={style.texts}>
            <p className={style.text1}>{username}</p>
            <p className={style.text2}>{email}</p>
          </div>
        </div>

        <div className={style.edit}>
          {isEditing ? (
            <button className={style.edits} onClick={handleSubmit}>
              Save
            </button>
          ) : (
            <button className={style.edits} onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>

        <div className={style.labeInpu}>
          <div className={style.labe}>
            <label className={style.lab} htmlFor="">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+111-12121212121"
              className={style.input}
              disabled={!isEditing}
            />
          </div>

          <div className={style.labe}>
            <label className={style.lab} htmlFor="">
              Gender
            </label>
            <select
              value={formData.gender}
              name="gender"
              onChange={handleChange}
              id=""
              className={style.input}
              disabled={!isEditing}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>


        <div className={style.labeInpu}>
          <div className={style.labe}>
            <label className={style.lab} htmlFor="">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={style.input}
              disabled={!isEditing}
            />
          </div>

          <div className={style.labe}>
            <label className={style.lab} htmlFor="">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={style.input}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default BusinessSetting;
