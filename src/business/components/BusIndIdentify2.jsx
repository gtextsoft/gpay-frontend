import React, { useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import countryList from "react-select-country-list";
import style from "../styles/identify.module.css";
import TextInput from "../components/TextInput";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useBusKYC } from "../../context/BusKycContext";

function BusIndIdentify2() {
  const {
    updateStepData,
    markStepComplete,
    goToStep,
    goToPreviousStep,
    kycData,
  } = useBusKYC();

  const options = useMemo(() => countryList().getData(), []);
  const countryNames = useMemo(() => options.map((c) => c.label), [options]);

  const validationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string()
      .oneOf(countryNames, "Invalid country selected")
      .required("Country is required"),
    postal: Yup.number()
      .typeError("Must be a number")
      .required("Postal Code is required"),
    passportFile: Yup.mixed()
      .required("Passport/ID scan is required")
      .test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 50 * 1024 * 1024
      )
      .test(
        "fileType",
        "Unsupported file format",
        (value) =>
          value &&
          ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
      ),
  });

  const initialValues = kycData.step2 || {
    address: "",
    city: "",
    state: "",
    country: "",
    postal: "",
    passportFile: null,
  };

  const handleSubmit = (values) => {
    updateStepData("step2", values);
    markStepComplete("BusIndIdentify2");
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
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className={style.action}>
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

              <div className={style.name}>
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
              </div>

              <div className={style.name}>
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
              </div>

              <div className={style.textInputs}>
                <p>Passport/ID Scan</p>
                <div className={style.uplo}>
                  <p className={style.clea}>
                    Upload a clear scan of your passport/ID
                  </p>
                  <div className={style.brows}>
                    <span className="material-symbols-outlined">download</span>
                    <p>Choose a file or drag & drop it here</p>
                    <p>JPEG, PNG, PDF and MP4 format, up to 50mb</p>
                    <input
                      type="file"
                      className={style.browse}
                      name="passportFile"
                      accept=".jpg,.jpeg,.png,.pdf,.mp4"
                      onChange={(event) =>
                        setFieldValue(
                          "passportFile",
                          event.currentTarget.files[0]
                        )
                      }
                    />
                    <ErrorMessage
                      name="passportFile"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
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

export default BusIndIdentify2;
