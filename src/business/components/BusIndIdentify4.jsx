import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import style from "../styles/identify.module.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useBusKYC } from "../../context/BusKycContext";

function BusIndIdentify4() {
  const {
    updateStepData,
    markStepComplete,
    goToStep,
    goToPreviousStep,
    kycData,
  } = useBusKYC();

  const validationSchema = Yup.object().shape({
    certificateIncorporation: Yup.mixed()
      .required("Certificate of Incorporation scan is required")
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
  });

  const initialValues = kycData.step4 || {
    certificateIncorporation: null,
    proofOfAddress: null,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("userAuthToken");

      updateStepData("step4", values);

      const formData = new FormData();

      Object.entries(kycData).forEach(([step, data]) => {
        Object.entries(data).forEach(([key, value]) => {
          // Skip file fields since they'll be appended separately
          if (key === "certificateIncorporation" || key === "proofOfAddress")
            return;
          if (value !== null && value !== undefined) {
            formData.append(key, value);
          }
        });
      });
      formData.append(
        "certificateIncorporation",
        values.certificateIncorporation
      );
      formData.append("proofOfAddress", values.proofOfAddress);

      await axios.post(`${API_BASE_URL}/api/kyc/bus/submit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      markStepComplete("BusIndIdentify4");

      goToStep(5);
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
        <img src="/images/progress4.png" alt="progress" />

        <p className={style.cardTitle}>Tell us a bit more about yourself</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className={style.action}>
              {/* Passport Upload */}
              <div className={style.textInputs}>
                <p>Certificate of Incorporation</p>
                <div className={style.uplo}>
                  <p className={style.clea}>
                    Upload a clear scan of your Certificate of Incorporation
                  </p>
                  <div className={style.brows}>
                    <span className="material-symbols-outlined">download</span>
                    <p>Choose a file or drag & drop it here</p>
                    <p>JPEG, PNG, PDF and MP4 format, up to 50mb</p>
                    <input
                      type="file"
                      className={style.browse}
                      name="certificateIncorporation"
                      accept=".jpg,.jpeg,.png,.pdf,.mp4"
                      onChange={(event) =>
                        setFieldValue(
                          "certificateIncorporation",
                          event.currentTarget.files[0]
                        )
                      }
                    />
                    <ErrorMessage
                      name="certificateIncorporation"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>
                </div>
              </div>

              {/* Proof of Address Upload */}
              <div className={style.textInputs}>
                <p>Valid Means of ID (Business Rep)</p>
                <div className={style.uplo}>
                  <p className={style.clea}>
                    Upload a clear scan of your Valid Means of ID e.g Passport,
                    National ID, etc.
                  </p>
                  <div className={style.brows}>
                    <span className="material-symbols-outlined">download</span>
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/* </div> */}
    </>
  );
}

export default BusIndIdentify4;
