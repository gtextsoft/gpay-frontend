import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import style from "../styles/identify.module.css";
import { useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useKYC } from "../../context/KycContext";

function IndIdentify3() {
  const {
    updateStepData,
    markStepComplete,
    goToStep,
    goToPreviousStep,
    kycData,
  } = useKYC();

  const validationSchema = Yup.object().shape({
    occupation: Yup.string().required("Occupation is required"),
    employmentStatus: Yup.string()
      .oneOf(
        ["employed", "selfEmployed", "unEmployed", "student"],
        "Invalid Employment status selected"
      )
      .required("Employment status is required"),
    purposeAcc: Yup.string()
      .oneOf(
        ["personal", "business", "freelancing"],
        "Invalid Purpose of Account selected"
      )
      .required("Purpose of Account is required"),
    source: Yup.string()
      .oneOf(
        ["salary", "business-revenue", "gift", "investment"],
        "Invalid source selected"
      )
      .required("Source is required"),
    inflow: Yup.number()
      .required("Expected Monthly Inflow is required")
      .typeError("Must be a number"),
  });

  const initialValues = kycData.step4 || {
    occupation: "",
    employmentStatus: "",
    purposeAcc: "",
    source: "",
    inflow: "",
  };

  const handleSubmit = (values) => {
    updateStepData("step4", values);
    markStepComplete("IndIdentify4");
    goToStep(5); // Proceed to IndIdentify3
  };

  return (
    <>
      <div className={style.outline}>
        <img src="/images/GPay.png" alt="gpay" />
        <img src="/images/progress4.png" alt="progress" />

        <p className={style.cardTitle}>Tell us a bit more about yourself</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values }) => (
            <Form className={style.action}>
              <div className={style.textInputs}>
                <p className={style.label}>Occupation</p>
                <div className={style.inputP}>
                  <Field
                    type="text"
                    name="occupation"
                    component={TextInput}
                    placeholder="Enter Your Occupation"
                    ariaLabel="Enter Your Occupation"
                  />
                </div>
                <ErrorMessage
                  name="occupation"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>Employment Status</p>

                <Field
                  as="select"
                  name="employmentStatus"
                  className={style.input}
                >
                  <option value="">Select</option>
                  <option value="employed">Employed</option>
                  <option value="selfEmployed">Self Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                </Field>
                <ErrorMessage
                  name="employmentStatus"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>Purpose of Account</p>

                <Field as="select" name="purposeAcc" className={style.input}>
                  <option value="">Select</option>
                  <option value="personal">Personal Use</option>
                  <option value="business">Business</option>
                  <option value="freelancing">Freelancing</option>
                </Field>
                <ErrorMessage
                  name="purposeAcc"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>Source of Funds</p>

                <Field as="select" name="source" className={style.input}>
                  <option value="">Select</option>
                  <option value="salary">Salary</option>
                  <option value="investment">Investment</option>
                  <option value="gift">Gift</option>
                  <option value="business-revenue">Business Revenue</option>
                </Field>
                <ErrorMessage
                  name="source"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>Expected Monthly Inflow (USD)</p>
                <div className={style.inputP}>
                  <Field
                    type="number"
                    name="inflow"
                    component={TextInput}
                    placeholder="Salary, Business Revenue, Gift etc"
                    ariaLabel="Salary, Business Revenue, Gift etc"
                  />
                </div>
                <ErrorMessage
                  name="inflow"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.name}>
                <div className={style.btn}>
                  <button
                    type="button"
                    className={style.investConsult4}
                    aria-label="Previous"
                    onClick={() => {
                      updateStepData("step4", values);
                      goToPreviousStep(3);
                    }}
                  >
                    <div className={style.arrowForward}>
                      <span className="material-icons">arrow_back</span>
                      Previous
                    </div>
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
      {/* </div> */}
    </>
  );
}

export default IndIdentify3;

{
  /* <div className={style.textInputs}>
                <p className={style.label}>Employment Status</p>
                
                <select
                  value={formData.employmentStatus}
                  name="employmentStatus"
                  onChange={handleChange}
                  className={style.input}
                  disabled={!isEditing}
                >
                  <option value="">Select</option>
                  <option value="employed">Employed</option>
                  <option value="selfEmployed">Self-employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                </select>
            
              </div> */
}

{
  /* <div className={style.textInputs}>
                <p className={style.label}>Purpose of Account</p>
            
                <select
                  value={formData.country}
                  name="purposeAcc"
                  onChange={handleChange}
                  className={style.input}
                  disabled={!isEditing}
                >
                  <option value="">Select</option>
                  <option value="personalUse">Personal use</option>
                  <option value="business">Business</option>
                  <option value="freelancing">Freelancing</option>
                </select>
             
              </div> */
}

{
  /* <div className={style.textInputs}>
                <p className={style.label}>Source of Funds</p>
        
                <select
                  value={formData.country}
                  name="source"
                  onChange={handleChange}
                  className={style.input}
                  disabled={!isEditing}
                >
                  <option value="">Select</option>
                  <option value="salary">Salary</option>
                  <option value="investment">Investment</option>
                  <option value="gift">Gift</option>
                  <option value="business-revenue">Business Revenue</option>
                </select>
              </div> */
}
