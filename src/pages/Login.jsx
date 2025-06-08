import React, { useState } from "react";
import { User } from "../components/User";
// import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import { useUser } from "../context/UserContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/Register.module.css";

function Login() {
  const { setUsername, setUserId} = useUser(); // Access UserContext
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const navigate = useNavigate();

  // Validation schema for Formik
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${API_BASE_URL}/user/login`, values);
      console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);

      const { userData, authToken: token } = response.data;
      if (token && userData?.role && (userData.busName || userData.username)) {
        // Choose the right name based on role
        const nameToUse =
          userData.role === "business" ? userData.busName : userData.username;
      
        // Save to localStorage
        localStorage.setItem("userAuthToken", token);
        localStorage.setItem("userUsername", nameToUse);
        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("userId", userData._id);

        // Update context
        setUsername(nameToUse);
        setUserId(userData._id);
      
        toast.success("Login successful!", { autoClose: 2000 });
      
        // Redirect by role
        setTimeout(() => {
          if (userData.role === "individual") {
            navigate("/user/dashboard-individual");
          } else if (userData.role === "business") {
            navigate("/user/business-dashboard");
          } else {
            navigate("/user/dashboard"); // fallback
          }
        }, 2000);
      } else {
        throw new Error("Invalid response from server");
      }     
      // if (token && userData?.busName && userData?.role) {
      //   // Save to localStorage
      //   localStorage.setItem("userAuthToken", token);
      //   localStorage.setItem("userUsername", userData.busName);
      //   localStorage.setItem("userRole", userData.role);

      //   // Update context
      //   setUsername(userData.busName);

      //   toast.success("Login successful!", { autoClose: 2000 });

      //   // Redirect by role
      //   setTimeout(() => {
      //     if (userData.role === "individual") {
      //       navigate("/user/dashboard-individual");
      //     } else if (userData.role === "business") {
      //       navigate("/user/business-dashboard");
      //     } else {
      //       navigate("/user/dashboard"); // fallback
      //     }
      //   }, 2000);
      // } else {
      //   throw new Error("Invalid response from server");
      // }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.status === 403) {
        toast.error(
          "Your email is not verified. Please check your email for the verification code."
        );
      } else {
        toast.error("Login failed! Please check your credentials.");
      }
    } finally {
      setSubmitting(false); // Reset the form submission state
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div className={style.register}>
        <img src="./images/authPic.png" alt="auth" className={style.left} />

        <div className={style.registerForm}>
          <div className={style.Para}>
            <img src="./images/GPay.png" alt="gpay" />

            <p className={style.cardTitle}>Welcome Back</p>
            <p>Log in to access your personalized investment dashboard.</p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={style.action}>
                <div className={style.textInputs}>
                  <h4 className={style.label}>Email:</h4>
                  <div className={style.inputP}>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      component={TextInput}
                      ariaLabel="Enter Your Email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div>
                  <div
                    className={style.textInputs}
                    style={{ position: "relative" }}
                  >
                    <h4 className={style.label}>Password:</h4>
                    <div className={style.pass}>
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter Your Password"
                        component={TextInput}
                        style={{ position: "relative" }}
                        ariaLabel="Enter Your Password"
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        className="material-symbols-outlined"
                      >
                        {showPassword ? "visibility" : "visibility_off"}
                      </span>
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.forgt}>
                  <div className={style.checkme}>
                    <input type="checkbox" name="" className={style.check} />
                    <p>Remember Me</p>
                  </div>

                  <li className={style.navLi}>
                    <NavLink to="/forgot-password">Forgot Password</NavLink>
                  </li>
                </div>

                <div className={style.btn}>
                  <button
                    type="submit"
                    className={style.investConsult3}
                    aria-label="Login"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <ClipLoader // Use react-spinners
                        height="20"
                        width="20"
                        color="#fff"
                        ariaLabel="loading"
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className={style.navUl}>
            <p>New here? </p>

            <li className={style.navLi}>
              <NavLink to="/register">Create an Account</NavLink>
            </li>
          </div>

          <div className={style.linav}>
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
      <ToastContainer />
    </>
  );
}

export default Login;
