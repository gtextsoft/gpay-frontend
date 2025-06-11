import React, { useContext, useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/register.module.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation(); // Access the query params
  const navigate = useNavigate(); // For navigation after success

  // Extract the token and email from the query string
  const params = new URLSearchParams(location.search);
  const token = params.get("token");
  const email = params.get("email");

  useEffect(() => {
    // Redirect if the token or email is missing
    if (!token || !email) {
      setError("Invalid or expired token.");
    }
  }, [token, email]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Token from URL:", token);

      console.log("Extracted email:", email);
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(
        `${API_BASE_URL}/user/reset-password`,
        // `http://localhost:4000/user/reset-password`,
        { token, email, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Token from URL:", token); // Log token to verify

      if (response.data.status === "success") {
        setMessage(response.data.message);
        toast.success(response.data.message);
        // Redirect to login page after success

        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password.");
    }

    setLoading(false);
  };

  return (
    <div className={style.register}>
      <img src="./images/authPic.png" alt="auth" className={style.left} />

      <div className={style.registerForm}>
        <div className={style.Para}>
          <img src="./images/GPay.png" alt="gpay" />

          <div className={style.textPara}>
            <p className={style.cardTitle}>Reset Your Password</p>
            <p className={style.cardPara}>
              Set your new password with a minimum of 8 characters, including a
              combination of letters and numbers.
            </p>
          </div>
        </div>

        {error && <p className={style.error}>{error}</p>}
        {message && <p className={style.success}>{message}</p>}

        <form onSubmit={handleResetPassword} className={style.input}>
          <div className={style.textInputs}>
            <p className={style.label}>New Password</p>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={style.inputs}
            />
          </div>

          <div className={style.textInputs}>
            <p className={style.label}>Confirmation New Password</p>
            <input
              type="password"
              placeholder="Re-type your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={style.inputs}
            />
          </div>
<br />
          <button
            type="submit"
            disabled={loading}
            className={style.investConsult3}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <button className={style.investConsult4}>
            <NavLink to="/">Back To Login</NavLink>{" "}
          </button>
        </form>

        {/* Toast container for showing success/error messages */}
        <ToastContainer />

        <div className={style.navUl}>
          <p>New here? </p>

          <li className={style.navLi}>
            <NavLink to="/register">Create an Account</NavLink>
          </li>
        </div>

        <div className={style.linav1}>
          <p className={style.vest}>@ 2024 Gvest. Alrights reserved. </p>

          <div className={style.navUl}>
            <li className={style.navLi}>
              <NavLink to="/t&c">Terms & Condition</NavLink>
            </li>
            <li className={style.navLi}>
              <NavLink to="/privacy-policy">Privacy Policy</NavLink>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
