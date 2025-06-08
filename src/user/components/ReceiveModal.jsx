import { useState } from "react";
import QRCode from "react-qr-code";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/sendmodal.module.css";
import TextInput from "../components/TextInput";

function ReceiveModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [sendMethod, setSendMethod] = useState("");
  const walletAddress = "0xABC1234567890abcdef1234567890abcdef";

  const validationSchema = Yup.object().shape({
    sendMethod: Yup.string()
      .oneOf(["gpay-user", "other-bank"], "Invalid Recipient Type Selected")
      .required("Recipient Type is required"),
    sendWallet: Yup.string()
      .oneOf(["dollar", "naira", "euro"], "Invalid Wallet selected")
      .required("Wallet is required"),
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (values) => {
    setSendMethod(values.sendMethod); // Save selected method
    setStep(2); // Proceed to step 2
  };

  return (
    <div className={style.sendModalBackdrop}>
      <div className={style.sendModal}>
        {step === 1 && (
          <>
            <h2>Receive Funds</h2>
            <p>Please enter the user account detail and amount</p>

            <Formik
              initialValues={{
                sendMethod: "",
                sendWallet: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {() => (
                <Form className={style.action}>
                  <div className={style.textInputs}>
                    <label className={style.label}>Select Method</label>
                    <Field
                      as="select"
                      name="sendMethod"
                      className={style.input}
                    >
                      <option value="">Select</option>
                      <option value="gpay-user">GPay User</option>
                      <option value="other-bank">Other Banks</option>
                    </Field>
                    <ErrorMessage
                      name="sendMethod"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className={style.textInputs}>
                    <label className={style.label}>Select Wallet</label>
                    <Field
                      as="select"
                      name="sendWallet"
                      className={style.input}
                    >
                      <option value="">Select Wallet</option>
                      <option value="dollar">Dollar</option>
                      <option value="naira">Naira</option>
                      <option value="euro">Euro</option>
                    </Field>
                    <ErrorMessage
                      name="sendWallet"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <button className={style.nextBtn} type="submit">
                    Next
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
          </>
        )}

        {step === 2 && (
          <>
            <h2>Wallet Address</h2>
            <br />
            <div className={style.walletAddress}>{walletAddress}</div>

            <button
              onClick={handleCopy}
              className={style.copyBtn}
              style={{ marginBottom: "16px" }}
            >
              {copied ? "Copied!" : "Copy Address"}
            </button>

            {sendMethod === "gpay-user" && (
              <>
                <p>Or</p>
                <p>Generate QR Code</p>
                <button className={style.nextBtn} onClick={() => setStep(3)}>
                  Generate QR Code
                </button>
              </>
            )}

            <button className={style.closeBtn} type="button" onClick={onClose}>
              Close
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p>GPay Wallet ID</p>
            <div className={style.walletAddress}>{walletAddress}</div>

            <button
              onClick={handleCopy}
              className={style.copyBtn}
              style={{ marginBottom: "16px" }}
            >
              {copied ? "Copied!" : "Copy Address"}
            </button>

            <QRCode value={walletAddress} size={128} />

            <button onClick={onClose} className={style.closeBtn}>
              Close
            </button>
          </>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default ReceiveModal;
