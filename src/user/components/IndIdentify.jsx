import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners"; 
import style from "../styles/identify.module.css";
import TextInput from "../components/TextInput";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useKYC } from "../../context/KycContext";

function IndIdentify() {
  const { updateStepData, markStepComplete, goToStep, kycData } = useKYC();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("First name is required"),
      // .min(5, "First name must be at least 5 characters"),
    lastname: Yup.string()
      .required("Last name is required"),
      // .min(5, "Last name must be at least 5 characters"),
    number: Yup.number()
      .typeError("Must be a number")
      .required("Number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .required("Date of birth is required"),
  });

  const initialValues = kycData.step1 || {
    username: "",
    lastname: "",
    number: "",
    email: "",
    dateOfBirth: "",
  };

  const handleSubmit = (values) => {
    updateStepData("step1", values);
    markStepComplete("IndIdentify");
    goToStep(2); // Proceed to IndIdentify2
  };


  return (
    <>
      <div className={style.outline}>
        <img src="/images/GPay.png" alt="gpay" />
        <img src="/images/progress1.png" alt="progress" />

        <p className={style.cardTitle}>Personal Information</p>
        <Formik
         initialValues={initialValues}
         validationSchema={validationSchema}
         onSubmit={handleSubmit}
         enableReinitialize
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

              <div className={style.name}>
                <div className={style.textInputs}>
                  <p className={style.label}>Mobile Number</p>
                  <div className={style.inputP}>
                    <Field
                      type="number"
                      name="number"
                      component={TextInput}
                      placeholder="Enter your phone number?"
                      ariaLabel="Enter your phone number?"
                    />
                  </div>
                  <ErrorMessage
                    name="number"
                    component="div"
                    style={{ color: "red" }}
                  />
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
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>Date of Birth</p>
                <div className={style.inputP}>
                  <Field
                    type="date"
                    name="dateOfBirth"
                    placeholder="01/01/2025"
                    component={TextInput} 
                    ariaLabel="Enter Your Date of Birth"
                    className={style.input}
                  />
                </div>
                <ErrorMessage
                  name="dateOfBirth"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.btn}>
                <button
                  type="submit"
                  className={style.investConsult3}
                  aria-label="Next"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ClipLoader
                      height="20"
                      width="20"
                      color="#fff"
                      aria-label="loading"
                    />
                  ) : (
                    <div className={style.arrowForward}>
                      Next
                      <span className="material-icons">arrow_forward</span>
                    </div>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default IndIdentify;
