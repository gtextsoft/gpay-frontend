import style from "../styles/usernotification.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function Password() {
  const navigate = useNavigate();

  const handlePasswordClick = () => {
    navigate("/user/business-settings"); // Navigate to the '/compound' page
  };

  const handleProfileClick = () => {
    navigate("/user/business-password"); // Navigate to the '/compound' page
  };
  const [email, setEmail] = useState("");
  const [ setLoading] = useState(false); // State to manage loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      await axios.post(`${API_BASE_URL}/user/forgot-password`, { email });
      toast.success("Check your email for reset instructions.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error sending reset email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />{" "}
      <div className={style.set}>
        <div className={style.profilePassword}>
          <button className={style.password} onClick={handlePasswordClick}>
            Profile
          </button>
          <button className={style.profile} onClick={handleProfileClick}>
            Password
          </button>
        </div>

        <form action="" className={style.pass} onSubmit={handleSubmit}>
    

          <h2>Reset your password</h2>
          <p>
            Enter your registered email address, and we'll send you reset
            instructions.
          </p>
          <br />
          <div className={style.labet}>
            <label htmlFor="" className={style.lab}>
              Enter Your Registered Email
            </label>{" "}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={style.input}
              placeholder="Input Your Registered Email Address"
            />
          </div>

     
          <button className={style.sav}>Save</button>
      
        </form>
      </div>
    </div>
  );
}

export default Password;
