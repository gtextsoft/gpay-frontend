import React, { useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import style from "../styles/identify.module.css";
import TextInput from "../components/TextInput";
import "react-toastify/dist/ReactToastify.css";
import industries from "../../data/industries";

import countryList from "react-select-country-list";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useBusKYC } from "../../context/BusKycContext";

function BusIndIdentify() {
  const { updateStepData, markStepComplete, goToStep, kycData } = useBusKYC();

  const options = useMemo(() => countryList().getData(), []);
  const countryNames = useMemo(() => options.map((c) => c.label), [options]);

  const industryOptions = industries.map((ind) => ({
    label: ind,
    value: ind,
  }));

  const validationSchema = Yup.object().shape({
    busName: Yup.string().required("Business name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Business Email is required"),
    regNum: Yup.number()
      .typeError("Must be a number")
      .required("Registration Number is required"),
    businessType: Yup.string()
      .oneOf(
        [
          "soleProp",
          "singleLLC",
          "llc",
          "genPart",
          "publicTrade",
          "unlist",
          "association",
          "nonProf",
          "govtOrg",
          "revTrust",
          "irevTrust",
          "estate",
          "limitedPartnership",
          "limLiabity",
        ],
        "Invalid Business Type selected"
      )
      .required("Business Type is required"),
    industry: Yup.string()
      .oneOf(industries, "Invalid Industry selected")
      .required("Industry is required"),
    companySize: Yup.string()
      .oneOf(
        ["1-10", "11-50", "51-100", "101-200", "201-500", "500"],
        "Invalid company size selected"
      )
      .required("Company size is required"),
    countryReg: Yup.string()
      .oneOf(countryNames, "Invalid country selected")
      .required("Passport Country is required"),
    dateEstablished: Yup.date()
      .max(new Date(), "Date established cannot be in the future")
      .required("Date established is required"),
  });

  const initialValues = kycData.step1 || {
    busName: "",
    email: "",
    regNum: "",
    businessType: "",
    industry: "",
    companySize: "",
    countryReg: "",
    dateEstablished: "",
  };

  const handleSubmit = (values) => {
    updateStepData("step1", values);
    markStepComplete("BusIndIdentify");
    goToStep(2); // Proceed to BusIndIdentify2
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
              <div className={style.textInputs}>
                <p className={style.label}>Business Name</p>
                <div className={style.inputP}>
                  <Field
                    type="text"
                    name="busName"
                    component={TextInput}
                    placeholder="Enter Your Business Name"
                    ariaLabel="Enter Your Business Name"
                  />
                </div>
                <ErrorMessage
                  name="busName"
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

              <div className={style.name}>
                <div className={style.textInputs}>
                  <p className={style.label}>Business Registration Number</p>
                  <div className={style.inputP}>
                    <Field
                      type="number"
                      name="regNum"
                      component={TextInput}
                      placeholder="Enter Your Business Registration Number"
                      ariaLabel="Enter Your Business Registration Number"
                    />
                  </div>
                  <ErrorMessage
                    name="regNum"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>Business Type</p>

                  <Field
                    as="select"
                    name="businessType"
                    className={style.input}
                  >
                    <option value="">Select</option>
                    <option value="soleProp">Sole Proprietor</option>
                    <option value="singleLLC">Single Member LLC</option>
                    <option value="llc">Limited Liability Company</option>
                    <option value="genPart">General Partnership</option>
                    <option value="publicTrade">
                      Public Traded Corporation
                    </option>
                    <option value="unlist">Unlisted Corporation</option>
                    <option value="association">Association</option>
                    <option value="nonProf">Non-Profit</option>
                    <option value="govtOrg">Government Organization</option>
                    <option value="revTrust">Revocable Trust</option>
                    <option value="irevTrust">Irrevocable Trust</option>
                    <option value="estate">Estate</option>
                    <option value="limitedPartnership">
                      Limited Partnership
                    </option>
                    <option value="limLiabity">
                      Limited Liability Partnership
                    </option>
                  </Field>
                  <ErrorMessage
                    name="businessType"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div className={style.name}>
                <div className={style.textInputs}>
                  <p className={style.label}>Industry</p>
                  <Field as="select" name="industry" className={style.input}>
                    <option value="">Select your industry</option>
                    {industryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="industry"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>Company Size</p>
                  <Field as="select" name="companySize" className={style.input}>
                    <option value="">Select</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="101-200">101-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500">500+ employees</option>
                  </Field>
                  <ErrorMessage
                    name="companySize"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
              </div>

              <div className={style.name}>
                <div className={style.textInputs}>
                  <p className={style.label}>Country of Registration</p>

                  <Field as="select" name="countryReg" className={style.input}>
                    <option value="">Select</option>
                    {options.map((country) => (
                      <option key={country.value} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="countryReg"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.textInputs}>
                  <p className={style.label}>Year Established</p>
                  <div className={style.inputP}>
                    <Field
                      type="date"
                      name="dateEstablished"
                      placeholder="01/01/2025"
                      component={TextInput}
                      ariaLabel="YYYY"
                      className={style.input}
                    />
                  </div>
                  <ErrorMessage
                    name="dateEstablished"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
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

export default BusIndIdentify;
