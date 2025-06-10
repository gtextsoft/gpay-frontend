import React, { useMemo } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import style from "../styles/identify.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "../components/TextInput";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useBusKYC } from "../../context/BusKycContext";
import countryList from "react-select-country-list";

function IndIdentify3() {
  const {
    updateStepData,
    markStepComplete,
    goToStep,
    goToPreviousStep,
    kycData,
  } = useBusKYC();

  const options = useMemo(() => countryList().getData(), []);
  const countryNames = useMemo(() => options.map((c) => c.label), [options]);

  const validationSchema = Yup.object().shape({
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

  const initialValues = kycData.step3 || {
    purposeAcc: "",
    source: "",
    inflow: "",
  };

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
