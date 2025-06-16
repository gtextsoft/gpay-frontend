import { useFormikContext } from "formik";
import { useUser } from "../../context/UserContext";
import React, { useMemo } from "react";

import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import style from "../styles/identify.module.css";
import TextInput from "../components/TextInput";
import "react-toastify/dist/ReactToastify.css";
import industries from "../../data/industries";
import axios from "axios";

import countryList from "react-select-country-list";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
// import { useBusKYC } from "../../context/BusKycContext";

function SubAccountForm() {
  const { userId } = useUser();

  if (!userId) return <p>Loading user info...</p>;

  const options = useMemo(() => countryList().getData(), []);
  const countryNames = useMemo(() => options.map((c) => c.label), [options]);

  const industryOptions = industries.map((ind) => ({
    label: ind,
    value: ind,
  }));


  function AutoSetIdLevel() {
    const { values, setFieldValue } = useFormikContext();

    useEffect(() => {
      if (
        values.idCountry === "United States of America" ||
        values.idCountry === "United States" ||
        values.idCountry === "US"
      ) {
        setFieldValue("idLevel", "primary");
      } else if (values.idCountry === "Nigeria") {
        setFieldValue("idLevel", "secondary");
      } else {
        setFieldValue("idLevel", "");
      }
    }, [values.idCountry, setFieldValue]);

    return null;
  }

  const validationSchema = Yup.object().shape({
    subId: Yup.string().required("Business ID is required"),
    subName: Yup.string().required("Business name is required"),

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
    idType: Yup.string()
      .oneOf(["nin", "votersCard", "driver"], "Invalid ID type selected")
      .required("ID type is required"),
    idNum: Yup.number()
      .typeError("Must be a number")
      .required("ID Number is required"),
    idCountry: Yup.string()
      .oneOf(countryNames, "Invalid country selected")
      .required("ID Country is required"),

    idLevel: Yup.string()
      .oneOf(["primary", "secondary"], "Invalid ID Level selected")
      .required("ID Level is required"),

    proofOfAddress: Yup.mixed()
      .required("Valid Means of Identification is required")
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
          ["image/jpeg", "image/png", "application/pdf", "video/mp4"].includes(
            value.type
          )
      ),
    subPhone: Yup.number().required("Business ID is required"),

    subEmail: Yup.string()
      .email("Invalid email")
      .required("Business Email is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string()
      .oneOf(countryNames, "Invalid country selected")
      .required("Country is required"),
    postal: Yup.number()
      .typeError("Must be a number")
      .required("Postal Code is required"),
      subPass: Yup.string().required("Business Password is required"),

  });

  const initialValues = {
    subId: userId,
    subName: "",
    businessType: "",
    industry: "",
    idType: "",
    idNum: "",
    idCountry: "",
    idLevel: "",
    proofOfAddress: "",
    subPhone: "",
    subEmail: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal: "",
    subPass: "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("SUBMIT CALLED", values);
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const token = sessionStorage.getItem("businessAuthToken");
     console.log(token) 
     
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key !== "proofOfAddress") {
          formData.append(key, value);
        }
      });
      formData.append("proofOfAddress", values.proofOfAddress);
    //   mData.append("proofOfAddress", values.proofOfAddress);

      await axios.post(`${API_BASE_URL}/api/kyc/bus/sub/submit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={style.outline}>
        <img src="/images/GPay.png" alt="gpay" />
        <img src="/images/progress1.png" alt="progress" />

        <p className={style.cardTitle}>Create a New Business Profile</p>
        <p className={style.cardTitle}>
          Provide your legal business details to set up a compliment subaccount.
          This information is required for KYC verification and wallet
          activation.
        </p>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {/* {({ isSubmitting, setFieldValue, values }) => { */}

          {(formikProps) => {
            const { isSubmitting, values, setFieldValue } = formikProps;
            const isIdLevelDisabled = ![
              "United States of America",
              "United States",
              "US",
              "Nigeria",
            ].includes(values.idCountry);

            return (
              <Form className={style.action}>
                <AutoSetIdLevel />
                <div className={style.textInputs}>
                  <p className={style.label}>Owner ID</p>
                  <Field
                    type="text"
                    name="subId"
                    readOnly
                    className={style.input}
                    //   component={TextInput}
                    placeholder="Owner ID"
                    ariaLabel="Owner ID"
                  />
                  <ErrorMessage
                    name="subId"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>

                <div className={style.name}>
                  <div className={style.textInputs}>
                    <p className={style.label}>Business Name</p>
                    <div className={style.inputP}>
                      <Field
                        type="text"
                        name="subName"
                        component={TextInput}
                        placeholder="Enter Your Business Name"
                        ariaLabel="Enter Your Business Name"
                      />
                    </div>
                    <ErrorMessage
                      name="subName"
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

                <div className={style.name}>
                  <div className={style.textInputs}>
                    <p className={style.label}>Select ID type</p>

                    <Field
                      as="select"
                      name="idType"
                      className={style.input}
                      placeholder="NIN"
                    >
                      <option value="">Select</option>
                      <option value="nin">NIN</option>
                      <option value="votersCard">Voters Card</option>
                      <option value="driver">Driver's License</option>
                    </Field>
                    <ErrorMessage
                      name="idType"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className={style.textInputs}>
                    <p className={style.label}>
                      Enter the selected ID Type Number
                    </p>
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
                </div>

                <div className={style.name}>
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
                    <p className={style.label}>ID Level</p>

                    <Field
                      as="select"
                      name="idLevel"
                      className={style.input}
                      disabled={isIdLevelDisabled}
                    >
                      <option value="">Select</option>
                      <option value="primary">US</option>
                      <option value="secondary">Other Country</option>
                    </Field>
                    <ErrorMessage
                      name="idLevel"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>

                <div className={style.textInputs}>
                  <p>Valid Means of ID (Business Rep)</p>
                  <div className={style.uplo}>
                    <p className={style.clea}>
                      Upload a clear scan of your Valid Means of ID e.g
                      Passport, National ID, etc.
                    </p>
                    <div className={style.brows}>
                      <span className="material-symbols-outlined">
                        download
                      </span>
                      <p>Choose a file or drag & drop it here</p>
                      <p>JPEG, PNG, PDF and MP4 format, up to 50mb</p>

                      <input
                        type="file"
                        className={style.browse}
                        name="proofOfAddress"
                        accept=".jpg,.jpeg,.png,.pdf,.mp4"
                        onChange={(event) =>
                          setFieldValue(
                            "proofOfAddress",
                            event.currentTarget.files[0]
                          )
                        }
                      />
                      <ErrorMessage
                        name="proofOfAddress"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                </div>

                <div className={style.name}>
                  <div className={style.textInputs}>
                    <p className={style.label}>Business Phone</p>
                    <div className={style.inputP}>
                      <Field
                        type="number"
                        name="subPhone"
                        component={TextInput}
                        placeholder="Business Phone"
                        ariaLabel="Business Phone"
                      />
                    </div>
                    <ErrorMessage
                      name="subPhone"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className={style.textInputs}>
                    <p className={style.label}>Business Email</p>
                    <div className={style.inputP}>
                      <Field
                        type="email"
                        name="subEmail"
                        placeholder="Email"
                        component={TextInput}
                        ariaLabel="Enter Your Email"
                      />
                    </div>
                    <ErrorMessage
                      name="subEmail"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>

                <div className={style.name}>
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
                    <p className={style.label}>Password</p>
                    <div className={style.inputP}>
                      <Field
                        type="text"
                        name="subPass"
                        component={TextInput}
                        placeholder="Create Your Business Password"
                        ariaLabel="Create Your Business Password"
                      />
                    </div>
                    <ErrorMessage
                      name="subPass"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                <div className={style.btn}>
                  <button
                    type="submit"
                    className={style.investConsult3}
                    aria-label="Submit"
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
                        Submit
                        <span className="material-icons">arrow_forward</span>
                      </div>
                    )}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}

export default SubAccountForm;
