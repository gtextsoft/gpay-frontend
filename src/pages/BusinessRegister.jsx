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

function BusinessRegister() {
  const { setUsername } = useUser(); // Access setUsername from UserContext
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    busName: Yup.string()
      .required("First name is required")
      .min(5, "First name must be at least 5 characters"),
    busLastName: Yup.string()
      .required("Last name is required")
      .min(5, "Last name must be at least 5 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.number()
      .typeError("Must be a number")
      .required("Number is required"),

    position: Yup.string().required("Position is required"),
    businessName: Yup.string().required("Business name is required"),

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
        `${API_BASE_URL}/user/business-register`
      );

      const payload = {
        busName: values.busName,
        busLastName: values.busLastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        businessName: values.businessName,
        position: values.position,
        phoneNumber: values.phoneNumber.toString(), // ensure string format
      };

      console.log("Registration payload:", payload);

      const response = await axios.post(
        `${API_BASE_URL}/user/business-register`,
        payload,
        {
          timeout: 10000,
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
      setUsername(values.busName);

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
              busName: "",
              busLastName: "",
              email: "",
              position: "",
              phoneNumber: "",
              businessName: "",
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
                        name="busName"
                        component={TextInput}
                        placeholder="Enter your first name"
                        ariaLabel="Enter Your First Name"
                      />
                    </div>
                    <ErrorMessage
                      name="busName"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className={style.textInputs}>
                    <p className={style.label}>Last Name</p>
                    <div className={style.inputP}>
                      <Field
                        type="text"
                        name="busLastName"
                        component={TextInput}
                        placeholder="Enter your last name"
                        ariaLabel="Enter Your Last Name"
                      />
                    </div>
                    <ErrorMessage
                      name="busLastName"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>

                {/* <div className={style.textInputs}>
                  <p className={style.label}>Email</p>
                  <div className={style.inputP}>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      component={TextInput}
                      ariaLabel="Enter Your Email"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div> */}

                <div className={style.textInputs}>
                  <p className={style.label}>Position</p>
                  <div className={style.inputP}>
                    <Field
                      type="text"
                      name="position"
                      placeholder="Enter your position (e.g, CEO, HR Manager, Admin)"
                      component={TextInput}
                      ariaLabel="Enter Your Position (e.g, CEO, HR Manager, Admin)"
                    />
                  </div>
                  <ErrorMessage
                    name="position"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>Business Name</p>
                  <div className={style.inputP}>
                    <Field
                      type="text"
                      name="businessName"
                      placeholder="Enter your business name?"
                      component={TextInput}
                      ariaLabel="Enter Your Business Name?"
                    />
                  </div>
                  <ErrorMessage
                    name="businessName"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>Business Email Address</p>
                  <div className={style.inputP}>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your business email address?"
                      component={TextInput}
                      ariaLabel="Enter your business email address?"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>Phone Number</p>
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
                        placeholder="Enter your password"
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
                        placeholder="Confirm your password"
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
                    <a href="/term" className={style.term}>
                      Terms of Use
                    </a>{" "}
                    and consent to{" "}
                    <a href="/privacy" className={style.term}>
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
                      "Next ->"
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
        </div>
      </div>
    </>
  );
}

export default BusinessRegister;
