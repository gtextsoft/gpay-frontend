import React, { useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import countryList from "react-select-country-list";
import style from "../styles/identify.module.css";
import TextInput from "../components/TextInput";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useKYC } from "../../context/KycContext";

function IndIdentify2() {
  const {
    updateStepData,
    markStepComplete,
    goToStep,
    goToPreviousStep,
    kycData,
  } = useKYC();

  const options = useMemo(() => countryList().getData(), []);
  const countryNames = useMemo(() => options.map((c) => c.label), [options]);

  const validationSchema = Yup.object({
    passportNumber: Yup.string()
      .required("Passport Number is required"),
    passportCountry: Yup.string()
      .oneOf(countryNames, "Invalid country selected")
      .required("Passport Country is required"),
    id: Yup.string()
      .oneOf(["nin", "votersCard", "driver"], "Invalid ID type selected")
      .required("ID type is required"),
    idNum: Yup.number()
      .typeError("Must be a number")
      .required("ID Number is required"),
    idCountry: Yup.string()
      .oneOf(countryNames, "Invalid country selected")
      .required("ID Country is required"),
    bvn: Yup.string()
      .matches(/^\d{11}$/, "BVN must be exactly 11 digits")
      .required("BVN is required"),
  });

  const initialValues = kycData.step2 || {
    passportNumber: "",
    passportCountry: "",
    id: "",
    idNum: "",
    idCountry: "",
    bvn: "",
  };

  const handleSubmit = (values) => {
    updateStepData("step2", values);
    markStepComplete("IndIdentify2");
    goToStep(3);
  };

  return (
    <>
      <div className={style.outline}>
        <img src="/images/GPay.png" alt="gpay" />
        <img src="/images/progress2.png" alt="progress" />

        <p className={style.cardTitle}>
          Identification (Dynamic Based on Currency)
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
                <p className={style.label}>International Passport Number</p>
                <div className={style.inputP}>
                  <Field
                    type="text"
                    name="passportNumber"
                    component={TextInput}
                    placeholder="A00012345"
                    ariaLabel="Enter Your Passport Number"
                  />
                </div>
                <ErrorMessage
                  name="passportNumber"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>Country of Issue</p>
                <Field
                  as="select"
                  name="passportCountry"
                  placeholder="Enter country that issued your passport"
                  className={style.input}
                >
                  <option value="">Select</option>
                  {options.map((country) => (
                    <option key={country.value} value={country.label}>
                      {country.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="passportCountry"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>
                  Select other ID type (Optional / NGN Local Use Only)
                </p>

                <Field
                  as="select"
                  name="id"
                  className={style.input}
                  placeholder="NIN"
                >
                  <option value="">Select</option>
                  <option value="nin">NIN</option>
                  <option value="votersCard">Voters Card</option>
                  <option value="driver">Driver's License</option>
                </Field>
                <ErrorMessage
                  name="id"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>Enter the selected ID Type Number</p>
                <div className={style.inputP}>
                  <Field
                    type="number"
                    name="idNum"
                    component={TextInput}
                    placeholder="Enter your selected ID Type Number"
                    ariaLabel="Enter your selected ID Type Number"
                  />
                </div>
                <ErrorMessage
                  name="idNum"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>ID Country of Issue</p>
                <Field
                  as="select"
                  name="idCountry"
                  placeholder="Enter country that issued your selected ID Type"
                  className={style.input}
                >
                  <option value="">Select</option>
                  {options.map((country) => (
                    <option key={country.value} value={country.label}>
                      {country.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="idCountry"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.textInputs}>
                <p className={style.label}>BVN</p>
                <div className={style.inputP}>
                  <Field
                    type="number"
                    name="bvn"
                    component={TextInput}
                    placeholder="BVN (Bank Verification Number)"
                    ariaLabel="BVN (Bank Verification Number)"
                  />
                </div>
                <ErrorMessage
                  name="bvn"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>

              <div className={style.name}>
                <div className={style.btn}>
                  <button
                    type="button"
                    className={style.investConsult4}
                    aria-label="Register"
                    onClick={() => {
                      updateStepData("step2", values);
                      goToPreviousStep(1);
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default IndIdentify2;
