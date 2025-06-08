import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners"; 
import style from "../styles/identify.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import { useUser } from "../../context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function IndIdentify3() {
  const { setUsername } = useContext(useUser); // Access setUsername from UserContext
  const [isEditing, setIsEditing] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  // Hook to navigate programmatically
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("First name is required")
      .min(5, "First name must be at least 5 characters"),
    lastname: Yup.string()
      .required("Last name is required")
      .min(5, "Last name must be at least 5 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    // number: Yup.number()
    //   .typeError("Must be a number")
    //   .required("Number is required"),
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

  const [formData, setFormData] = useState({
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    maritalStatus: "",
    employmentStatus: "",
    city: "",
    state: "",
    country: "",
    profilePicture: "",
  });

  useEffect(() => {
    // Convert the ISO date string to the correct format (yyyy-MM-dd)
    if (formData.dateOfBirth) {
      const date = new Date(formData.dateOfBirth);
      const formatted = date.toISOString().split("T")[0]; // "yyyy-MM-dd"
      setFormattedDate(formatted);
    }
  }, [formData.dateOfBirth]);

  return (
    <>
      <div className={style.outline}>
          <img src="/images/GPay.png" alt="gpay" />
          <img src="/images/progress3.png" alt="progress" />

          <p className={style.cardTitle}>
            Identification (For USD or Regulated Wallets)
          </p>
          <Formik
            initialValues={{
              username: "",
              lastname: "",
              email: "",
              // number: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className={style.action}>
                <div className={style.textInputs}>
                  <p className={style.label}>
                Country
                  </p>
                    <select
                      value={formData.country}
                      name="ID"
                      onChange={handleChange}
                      className={style.input}
                      disabled={!isEditing}
                    >
                      <option value="">Select</option>
                      <option value="Nigeria">
                     Nigeria
                      </option>
                      <option value="USA">USA</option>
                    </select>
                </div>


                <div className={style.name}>
                <div className={style.textInputs}>
                  <p className={style.label}>State</p>
                  <div className={style.inputP}>
                    <Field
                      type="text"
                      name="State"
                      component={TextInput}
                      placeholder="Enter Your State"
                      ariaLabel="Enter Your State"
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>City</p>
                  <div className={style.inputP}>
                  <Field
                      type="text"
                      name="City"
                      component={TextInput}
                      placeholder="Enter Your City"
                      ariaLabel="Enter Your City"
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="div"
                    style={{ color: "red" }}
                  />
              
                </div>
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>
                   Address Information
                  </p>
                  <div className={style.inputP}>
                    <Field
                      type="text"
                      name="bvn"
                      component={TextInput}
                      placeholder="Enter Your Street Address"
                      ariaLabel="Enter Your Street Address"
                    />
                  </div>
                  <ErrorMessage
                    name="middlename"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>
                   Postal Code
                  </p>
                  <div className={style.inputP}>
                    <Field
                      type="text"
                      name="postal"
                      component={TextInput}
                      placeholder="Enter Your Postal Code"
                      ariaLabel="Enter Your Postal Code"
                    />
                  </div>
                  <ErrorMessage
                    name="postal"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.name}>
                  <div className={style.btn}>
                    <button
                      type="submit"
                      className={style.investConsult4}
                      aria-label="Register"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <ClipLoader
                          height="20"
                          width="20"
                          color="#fff"
                          ariaLabel="loading"
                        />
                      ) : (
                        <div className={style.arrowForward}>
                          <span className="material-icons">arrow_forward</span>
                          Previous
                        </div>
                      )}
                    </button>
                  </div>

                  <div className={style.btn}>
                    <button
                      type="submit"
                      className={style.investConsult3}
                      aria-label="Register"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <ClipLoader
                          height="20"
                          width="20"
                          color="#fff"
                          ariaLabel="loading"
                        />
                      ) : (
                        <div className={style.arrowForward}>
                          Next
                          <span className="material-icons">arrow_forward</span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
     
    </>
  );
}

export default IndIdentify3;
