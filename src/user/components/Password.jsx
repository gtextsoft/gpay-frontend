import style from "../styles/usernotification.module.css";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
function Password() {
  const navigate = useNavigate();

  const handlePasswordClick = () => {
    navigate("/user/setting"); // Navigate to the '/compound' page
  };

  const handleProfileClick = () => {
    navigate("/user/password"); // Navigate to the '/compound' page
  };
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      await axios.post(`${API_BASE_URL}/user/forgot-password`, { email });
      // `http://localhost:4000/user/forgot-password`, { email });
      toast.success("Check your email for reset instructions.");
      //  setEmail(""); // Clear input after successful request
    } catch (error) {
      // toast.error(
      //   error.response?.data?.message || "Error sending reset email."
      // );
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
          {/* <div className={style.labet}>
            <label className={style.lab} htmlFor="">
              Old Password
            </label>

            <input
              type="text"
              name=""
              id=""
              placeholder="my old password"
              className={style.input}
            />
          </div>

          <div className={style.labet}>
            <label className={style.lab} htmlFor="">
              New Password
            </label>

            <input
              type="text"
              name=""
              id=""
              placeholder="my new password"
              className={style.input}
            />  
          </div>

          <div className={style.labet}>
            <label className={style.lab} htmlFor="">
              Confirm Password
            </label>

            <input
              type="text"
              name=""
              id=""
              placeholder="my new password"
              className={style.input}
            />
          </div> */}

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
            {/* <br /> */}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={style.input}
              placeholder="Input Your Registered Email Address"
            />
          </div>

          {/* <button className={style.savt}>
            {loading ? "Submitting..." : "Submit"}
          </button> */}

          {/* <div className={style.sav}> */}
          <button className={style.sav}>Save</button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}

export default Password;
