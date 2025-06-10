import { useState } from "react";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/sendmodal.module.css";
import TextInput from "../components/TextInput";
function SwapModal({ onClose }) {
  const [step, setStep] = useState(1);

  const validationSchema = Yup.object().shape({
    swapFromWallet: Yup.string()
      .oneOf(["dollar", "naira", "euro"], "Invalid Wallet selected")
      .required("Wallet is required"),
    swapToWallet: Yup.string()
      .oneOf(["dollar", "naira", "euro"], "Invalid Wallet selected")
      .required("Wallet is required"),
    swapMoney: Yup.number()
      .required("Amount is required")
      .typeError("Must be a number"),
  });

  const handleFormSubmit = () => {
    setStep(2); // Proceed to step 2
  };

  return (
    <div className={style.sendModalBackdrop}>
      <div className={style.sendModal}>
        {step === 1 && (
          <div>
            <h2>Swap Currency</h2>
            <p>Convert funds between your GtextPay wallets Instantly.</p>

            <Formik
              initialValues={{
                swapFromWallet: "",
                swapToWallet: "",
                swapMoney: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {() => (
                <Form className={style.action}>
                  <div className={style.textInputs}>
                    <label className={style.label}>Select "From" Wallet</label>
                    <Field
                      as="select"
                      name="swapFromWallet"
                      className={style.input}
                    >
                      <option value="">Select Wallet</option>
                      <option value="dollar">Dollar</option>
                      <option value="naira">Naira</option>
                      <option value="euro">Euro</option>
                    </Field>
                    <ErrorMessage
                      name="swapFromWallet"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className={style.textInputs}>
                    <label className={style.label}>Select "To" Wallet</label>
                    <Field
                      as="select"
                      name="swapToWallet"
                      className={style.input}
                    >
                      <option value="">Select Wallet</option>
                      <option value="dollar">Dollar</option>
                      <option value="naira">Naira</option>
                      <option value="euro">Euro</option>
                    </Field>
                    <ErrorMessage
                      name="swapToWallet"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className={style.textInputs}>
                    <label className={style.label}>Enter Amount to Swap</label>
                    <div className={style.inputP}>
                      <Field
                        type="number"
                        name="swapMoney"
                        placeholder="₦0.00"
                        component={TextInput}
                      />
                    </div>
                    <ErrorMessage
                      name="swapMoney"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <p>Exchange Rate: #1 = $0.00065</p>
                  <p>Fee: #150</p>
                  <p>You will receive: $6.35</p>
                  <button className={style.nextBtn} type="submit">
                    Swap Now
                  </button>
                  <button
                    className={style.closeBtn}
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
        {step === 2 && (
          <div>
            <img src="/images/Illustration.png" alt="gpay" />
            <p>Swap Successful</p>
            <p>
              You've converted #10,000 to $6.35. Funds are now in your Dollar
              wallet
            </p>
            <button className={style.nextBtn} onClick={onClose}>
              Finish
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default SwapModal;
