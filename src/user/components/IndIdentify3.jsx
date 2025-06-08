import React, { useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import style from "../styles/identify.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useKYC } from "../../context/KycContext";
import countryList from "react-select-country-list";

function IndIdentify3() {
  const {
    updateStepData,
    markStepComplete,
    goToStep,
    goToPreviousStep,
    kycData,
  } = useKYC();

  const options = useMemo(() => countryList().getData(), []);
  const countryNames = useMemo(() => options.map((c) => c.label), [options]);

  const validationSchema = Yup.object().shape({
    country: Yup.string()
      .oneOf(countryNames, "Invalid country selected")
      .required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    postal: Yup.number()
      .typeError("Must be a number")
      .required("Postal Code is required"),
  });

  const initialValues= kycData.step3 || {
    country: "",
    state: "",
    city: "",
    address: "",
    postal: "",
  }

  const handleSubmit = (values) => {
    updateStepData("step3", values);
    markStepComplete("IndIdentify3");
    goToStep(4); // Proceed to IndIdentify4
  };

  return (
    <>
      <div className={style.outline}>
        <img src="/images/GPay.png" alt="gpay" />
        <img src="/images/progress3.png" alt="progress" />

        <p className={style.cardTitle}>
          Identification (For USD or Regulated Wallets)
        </p>
        <Formik
       
       initialValues={initialValues}
       validationSchema={validationSchema}
       onSubmit={handleSubmit}
       enableReinitialize
        >
          {({ isSubmitting, values }) => (
            <Form className={style.action}>
              <div className={style.textInputs}>
                <p className={style.label}>Country</p>

                <Field as="select" name="country" className={style.input}>
                  <option value="">Select</option>
                  {options.map((country) => (
                    <option key={country.value} value={country.label}>
                      {country.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="country"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.name}>
                <div className={style.textInputs}>
                  <p className={style.label}>State</p>
                  <div className={style.inputP}>
                    <Field
                      type="text"
                      name="state"
                      component={TextInput}
                      placeholder="Enter Your State"
                      ariaLabel="Enter Your State"
                    />
                  </div>
                  <ErrorMessage
                    name="state"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>City</p>
                  <div className={style.inputP}>
                    <Field
                      type="text"
                      name="city"
                      component={TextInput}
                      placeholder="Enter Your City"
                      ariaLabel="Enter Your City"
                    />
                  </div>
                  <ErrorMessage
                    name="city"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>Address Information</p>
                <div className={style.inputP}>
                  <Field
                    type="text"
                    name="address"
                    component={TextInput}
                    placeholder="Enter Your Street Address"
                    ariaLabel="Enter Your Street Address"
                  />
                </div>
                <ErrorMessage
                  name="address"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>Postal Code</p>
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
                    type="button"
                    className={style.investConsult4}
                    aria-label="Previous"
                    onClick={() => {
                      updateStepData("step3", values);
                      goToPreviousStep(2);
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default IndIdentify3;
