import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners"; // Import spinner
import style from "../styles/Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import { useUser } from "../context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Register() {
  const { setUsername } = useContext(useUser); // Access setUsername from UserContext
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("First name is required")
      .min(5, "First name must be at least 5 characters"),
    lastname: Yup.string()
      .required("Last name is required")
      .min(5, "Last name must be at least 5 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.number()
      .typeError("Must be a number")
      .required("Phone Number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one digit"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      console.log("API BASE URL:", API_BASE_URL);
      console.log(
        "Sending registration request to:",
        `${API_BASE_URL}/user/register`
      );
      console.log("Registration payload:", values);

      const response = await axios.post(
        `${API_BASE_URL}/user/register`,
        values,
        {
          timeout: 10000, // 10 seconds
        }
      );

      const { verificationToken, email } = response.data;
      localStorage.setItem("VerifyToken", verificationToken);
      localStorage.setItem("userEmail", email);
      console.log("Saved email to localStorage:", email);
      console.log(
        "Saved verification token to localStorage:",
        verificationToken
      );

      console.log(response.data);
      // Save username globally using UserContext
      setUsername(values.username);

      // Display success message using toastify
      toast.success("Registration successful! Please verify your email.", {
        autoClose: 2000,
      });
      console.log("Submitting data:", values);
      console.log("API BASE URL:", import.meta.env.VITE_API_BASE_URL);

      // Redirect to the login page after a short delay
      setTimeout(() => {
        navigate("/verify-email");
      }, 2000); // Delay for 2 seconds before redirecting
    } catch (error) {
      console.error("Registration error:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data);
        toast.error(
          error.response.data.message ||
            "Registration failed! Please try again."
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server. Please try again later.");
      } else {
        console.error("Unexpected error:", error.message);
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false); // Reset the form submission state
    }
  };

  console.log("Loaded VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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

            <div className={style.textPara}>
              <p className={style.cardTitle}>Create Your Gpay Account</p>
              <p className={style.cardPara}>
                Create a personal account with GPay and start sending money,
                saving, and investing with ease. Everything you need in one
                secure place.
              </p>
            </div>
          </div>

          <Formik
            initialValues={{
              username: "",
              lastname: "",
              email: "",
              phoneNumber: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={style.action}>
                <div className={style.name}>
                  <div className={style.textInputs}>
                    <p className={style.label}>First Name</p>
                    <div className={style.inputP}>
                      <Field
                        type="text"
                        name="username"
                        component={TextInput}
                        placeholder="Enter Your First Name"
                        ariaLabel="Enter Your First Name"
                      />
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className={style.textInputs}>
                    <p className={style.label}>Last Name</p>
                    <div className={style.inputP}>
                      <Field
                        type="text"
                        name="lastname"
                        component={TextInput}
                        placeholder="Enter Your Last Name"
                        ariaLabel="Enter Your Last Name"
                      />
                    </div>
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>Email</p>
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

                <div className={style.textInputs}>
                  <p className={style.label}>Mobile Number</p>
                  <div className={style.inputP}>
                    <Field
                      type="number"
                      name="phoneNumber"
                      component={TextInput}
                      placeholder="Enter your phone number?"
                      ariaLabel="Enter your phone number?"
                    />
                  </div>
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.passErr}>
                  <div
                    className={style.textInputs}
                    style={{ position: "relative" }}
                  >
                    <p className={style.label}>Password</p>
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

                <div className={style.passErr}>
                  <div
                    className={style.textInputs}
                    style={{ position: "relative" }}
                  >
                    <p className={style.label}>Confirm Password</p>

                    <div className={style.pass}>
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Your Password"
                        component={TextInput}
                        style={{ position: "relative" }}
                        ariaLabel="Confirm Your Password"
                      />
                      <span
                        onClick={toggleConfirmPasswordVisibility}
                        className="material-symbols-outlined"
                      >
                        {showConfirmPassword ? "visibility" : "visibility_off"}
                      </span>
                    </div>
                  </div>

                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.copy}>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className={style.agree}
                  />
                  <p className={style.tp}>
                    I agree to Graph's{" "}
                    <a href="/terms-condition" className={style.term}>
                      Terms of Use
                    </a>{" "}
                    and consent to{" "}
                    <a href="/privacy-policy" className={style.term}>
                      Privacy Policy
                    </a>
                  </p>
                </div>

                <div className={style.btn}>
                  <button
                    type="submit"
                    className={style.investConsult3}
                    aria-label="Register"
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
                      // "Next ->"
                      // style={{ marginLeft: "5px", verticalAlign: "middle" }}
                      <div className={style.arrowForward}>
                      Next
                      <span className="material-icons" >
                      arrow_forward
                      </span>
                    </div>
                    )}
                  </button>
                </div>

                <div className={style.navUl}>
                  <p>Already have an account? </p>

                  <li className={style.navLi}>
                    <NavLink to="/login">Log in</NavLink>
                  </li>
                </div>
              </Form>
            )}
          </Formik>

          <ToastContainer />

          {/* <div className={style.linav}>
            <p className={style.vest}>@ 2024 Gvest. Alrights reserved. </p>

            <div className={style.navUl}>
              <li className={style.navLi}>
                <NavLink to="/t&c">Terms & Condition</NavLink>
              </li>
              <li className={style.navLi}>
                <NavLink to="/privacy-policy">Privacy Policy</NavLink>
              </li>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Register;
