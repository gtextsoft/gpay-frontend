// import { useState } from "react";
// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { ClipLoader } from "react-spinners";
// import * as Yup from "yup";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import style from "../styles/sendmodal.module.css";
// import TextInput from "../components/TextInput";

// function SendModal({ onClose }) {
//   const [step, setStep] = useState(1);

//   const handleNext = () => {
//     if (step < 3) setStep(step + 1);
//     else onClose();
//   };

//   const validationSchema = Yup.object().shape({
//     sendType: Yup.string()
//       .oneOf(["gpay-user", "other-bank"], "Invalid Recipient Type Selected")
//       .required("Recipient Type is required"),
//     walletId: Yup.string().when("sendType", {
//       is: "gpay-user",
//       then: Yup.string().required("Wallet ID is required"),
//       otherwise: Yup.string().notRequired(),
//     }),
//     bankAcc: Yup.string().when("sendType", {
//       is: "other-bank",
//       then: Yup.string().required("Account number is required"),
//       otherwise: Yup.string().notRequired(),
//     }),
//     sendBank: Yup.string().when("sendType", {
//       is: "other-bank",
//       then: Yup.string().required("Bank is required"),
//       otherwise: Yup.string().notRequired(),
//     }),
//     sendMoney: Yup.number()
//       .required("Amount is required")
//       .typeError("Must be a number"),
//     note: Yup.string(),
//     sendWallet: Yup.string()
//       .oneOf(["dollar", "naira", "euro"], "Invalid Wallet selected")
//       .required("Wallet is required"),
//   });

//   const handleSubmit = (values) => {
//     console.log(values);
//     setStep(2);
//   };

//   return (
//     <div className={style.sendModalBackdrop}>
//       <div className={style.sendModal}>
//         {/* <h2>Send Funds</h2> */}

//         {step === 1 && (
//           <>
//             <h2>Send Money</h2>
//             <p>Please enter the user account detail and amount</p>
//             <Formik
//               initialValues={{
//                 sendType: "",
//                 walletId: "",
//                 sendMoney: "",
//                 note: "",
//                 sendWallet: "",
//                 bankAcc: "",
//                 sendBank: "",
//               }}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ values }) => (
//                 <Form className={style.action}>
//                   <div className={style.textInputs}>
//                     <label className={style.label}>Select Recipient Type</label>
//                     <Field as="select" name="sendType" className={style.input}>
//                       <option value="">Select</option>
//                       <option value="gpay-user">GPay User</option>
//                       <option value="other-bank">Other Banks</option>
//                     </Field>
//                     <ErrorMessage
//                       name="sendType"
//                       component="div"
//                       style={{ color: "red" }}
//                     />
//                   </div>

//                   {/* Conditionally show GPay form */}
//                   {values.sendType === "gpay-user" && (
//                     <>
//                       <div className={style.textInputs}>
//                         <label className={style.label}>
//                           Recipient Wallet ID / GPay Tag
//                         </label>
//                         <div className={style.inputP}>
//                           <Field
//                             type="text"
//                             name="walletId"
//                             placeholder="Enter Wallet ID"
//                             component={TextInput}
//                           />
//                         </div>
//                         <ErrorMessage
//                           name="walletId"
//                           component="div"
//                           style={{ color: "red" }}
//                         />
//                       </div>
//                     </>
//                   )}

//                   {/* Conditionally show Bank form */}
//                   {values.sendType === "other-bank" && (
//                     <>
//                       <div className={style.textInputs}>
//                         <label className={style.label}>Account Number</label>
//                         <div className={style.inputP}>
//                           <Field
//                             type="text"
//                             name="bankAcc"
//                             placeholder="Enter 10-digit account number"
//                             component={TextInput}
//                           />
//                         </div>
//                         <ErrorMessage
//                           name="bankAcc"
//                           component="div"
//                           style={{ color: "red" }}
//                         />
//                       </div>

//                       <div className={style.textInputs}>
//                         <label className={style.label}>Select Bank</label>

//                         <Field
//                           as="select"
//                           name="sendBank"
//                           className={style.input}
//                         >
//                           <option value="">Select Bank</option>
//                           <option value="gtbank">GTBank</option>
//                           <option value="access">Access Bank</option>
//                           <option value="uba">UBA</option>
//                           {/* Add more banks here */}
//                         </Field>

//                         <ErrorMessage
//                           name="sendBank"
//                           component="div"
//                           style={{ color: "red" }}
//                         />
//                       </div>

//                       <p>Account Name: James Okoro</p>
//                     </>
//                   )}

//                   {/* Common fields */}
//                   <div className={style.textInputs}>
//                     <label className={style.label}>Amount</label>
//                     <div className={style.inputP}>
//                       <Field
//                         type="number"
//                         name="sendMoney"
//                         placeholder="₦0.00"
//                         component={TextInput}
//                       />
//                     </div>
//                     <ErrorMessage
//                       name="sendMoney"
//                       component="div"
//                       style={{ color: "red" }}
//                     />
//                   </div>

//                   <div className={style.textInputs}>
//                     <label className={style.label}>Note (optional)</label>
//                     <div className={style.inputP}>
//                       <Field
//                         type="text"
//                         name="note"
//                         placeholder="Add a note"
//                         component={TextInput}
//                       />
//                     </div>
//                     <ErrorMessage
//                       name="note"
//                       component="div"
//                       style={{ color: "red" }}
//                     />
//                   </div>

//                   <div className={style.textInputs}>
//                     <label className={style.label}>Select Wallet</label>
//                     <Field
//                       as="select"
//                       name="sendWallet"
//                       className={style.input}
//                     >
//                       <option value="">Select Wallet</option>
//                       <option value="dollar">Dollar</option>
//                       <option value="naira">Naira</option>
//                       <option value="euro">Euro</option>
//                     </Field>
//                     <ErrorMessage
//                       name="sendWallet"
//                       component="div"
//                       style={{ color: "red" }}
//                     />
//                   </div>

//                   <p>Remaining Balance: $2000</p>
//                   <p>Transfer Fee: ₦0 (for internal)</p>
//                   <p>Total to Pay: ₦0</p>

//                   <button
//                     className={style.nextBtn}
//                     type="submit"
//                   >
//                     Next
//                   </button>

//                   <button
//                     className={style.closeBtn}
//                     type="button"
//                     onClick={onClose}
//                   >
//                     Cancel
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           </>
//         )}

//         {step === 2 && (
//           <div className={style.step2}>
//             <div>
//               <h2 className={style.start}>Review the detail of the transfer</h2>
//               <p className={style.slease}>
//                 Please enter the user account detail and account
//               </p>
//             </div>
//             <h2 className={style.start}>Recipient</h2>
//             <div className={style.reci}>
//               <p>Recipient:</p>
//               <p>James Okoro (GTBank)</p>
//             </div>
//             <div className={style.reci}>
//               <p>Account No:</p>
//               <p>1023010100101</p>
//             </div>
//             <h2 className={style.start}>Transfer Details</h2>
//             <div className={style.reci}>
//               <p>Transfer Type:</p>
//               <p>GPay User</p>
//             </div>
//             <div className={style.reci}>
//               <p>From:</p>
//               <p>Dollar Wallet</p>
//             </div>
//             <div className={style.reci}>
//               <p>Note:</p>
//               <p>For Rent</p>
//             </div>
//             <div className={style.reci}>
//               <p>Date:</p>
//               <p>May 6, 2025 - 2:31PM</p>
//             </div>
//             <div className={style.reci}>
//               <p>Amount:</p>
//               <p>$25,000.00</p>
//             </div>
//             <div className={style.reci}>
//               <p>Fee:</p>
//               <p>$10.00</p>
//             </div>
//             <hr />
//             <div className={style.reci}>
//               <p>Total:</p>
//               <p>$25,010.00</p>
//             </div>
//             <button
//               className={style.nextBtn}
//               onClick={handleNext}
//               type="submit"
//             >
//               Confirm and Send
//             </button>
//             <button className={style.closeBtn} type="button" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         )}

//         {step === 3 && (
//           <div>
//             <img src="/images/Illustration.png" alt="gpay" />
//             <p>Success! Transaction completed.</p>
//             <button className={style.nextBtn} onClick={onClose}>
//               Finish
//             </button>
//           </div>
//         )}

//         <ToastContainer />
//       </div>
//     </div>
//   );
// }

// export default SendModal;


import { useState } from "react";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/sendmodal.module.css";
import TextInput from "../components/TextInput";

function SendModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onClose();
  };

//   const validationSchema = Yup.object().shape({
//     sendType: Yup.string()
//       .oneOf(["gpay-user", "other-bank"], "Invalid Recipient Type Selected")
//       .required("Recipient Type is required"),
//     walletId: Yup.string().when("sendType", {
//       is: "gpay-user",
//       then: Yup.string().required("Wallet ID is required"),
//       otherwise: Yup.string().notRequired(),
//     }),
//     bankAcc: Yup.string().when("sendType", {
//       is: "other-bank",
//       then: Yup.string().required("Account number is required"),
//       otherwise: Yup.string().notRequired(),
//     }),
//     sendBank: Yup.string().when("sendType", {
//       is: "other-bank",
//       then: Yup.string().required("Bank is required"),
//       otherwise: Yup.string().notRequired(),
//     }),
//     sendMoney: Yup.number()
//       .required("Amount is required")
//       .typeError("Must be a number"),
//     note: Yup.string(),
//     sendWallet: Yup.string()
//       .oneOf(["dollar", "naira", "euro"], "Invalid Wallet selected")
//       .required("Wallet is required"),
//   });

const validationSchema = Yup.object().shape({
    sendType: Yup.string()
      .oneOf(["gpay-user", "other-bank"], "Invalid Recipient Type Selected")
      .required("Recipient Type is required"),
  
    walletId: Yup.string().when("sendType", (sendType, schema) =>
      sendType === "gpay-user" ? schema.required("Wallet ID is required") : schema
    ),
  
    bankAcc: Yup.string().when("sendType", (sendType, schema) =>
      sendType === "other-bank" ? schema.required("Account number is required") : schema
    ),
  
    sendBank: Yup.string().when("sendType", (sendType, schema) =>
      sendType === "other-bank" ? schema.required("Bank is required") : schema
    ),
  
    sendMoney: Yup.number()
      .required("Amount is required")
      .typeError("Must be a number"),
  
    note: Yup.string(),
  
    sendWallet: Yup.string()
      .oneOf(["dollar", "naira", "euro"], "Invalid Wallet selected")
      .required("Wallet is required"),
  });
  
  const handleSubmit = (values, { setSubmitting }) => {
    setFormData(values);
    setSubmitting(false);
    setStep(2);
  };

  const computeFee = (amount, type) => {
    if (!amount) return 0;
    if (type === "gpay-user") return 0;
    return 10; // Flat fee for external transfers
  };

  const fee = computeFee(formData.sendMoney, formData.sendType);
  const total = Number(formData.sendMoney || 0) + fee;
  const formattedDate = new Date().toLocaleString();

  return (
    <div className={style.sendModalBackdrop}>
      <div className={style.sendModal}>
        {step === 1 && (
          <>
            <h2>Send Money</h2>
            <p>Please enter the user account detail and amount</p>
            <Formik
              initialValues={{
                sendType: "",
                walletId: "",
                sendMoney: "",
                note: "",
                sendWallet: "",
                bankAcc: "",
                sendBank: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, isSubmitting, isValid }) => (
                <Form className={style.action}>
                  <div className={style.textInputs}>
                    <label className={style.label}>Select Recipient Type</label>
                    <Field as="select" name="sendType" className={style.input}>
                      <option value="">Select</option>
                      <option value="gpay-user">GPay User</option>
                      <option value="other-bank">Other Banks</option>
                    </Field>
                    <ErrorMessage
                      name="sendType"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  {values.sendType === "gpay-user" && (
                    <div className={style.textInputs}>
                      <label className={style.label}>
                        Recipient Wallet ID / GPay Tag
                      </label>
                      <div className={style.inputP}>
                        <Field
                          type="text"
                          name="walletId"
                          placeholder="Enter Wallet ID"
                          component={TextInput}
                        />
                      </div>
                      <ErrorMessage
                        name="walletId"
                        component="div"
                        style={{ color: "red" }}
                      />
                    </div>
                  )} 

                  {values.sendType === "other-bank" && (
                    <>
                      <div className={style.textInputs}>
                        <label className={style.label}>Account Number</label>
                        <div className={style.inputP}>
                          <Field
                            type="text"
                            name="bankAcc"
                            placeholder="Enter 10-digit account number"
                            component={TextInput}
                          />
                        </div>
                        <ErrorMessage
                          name="bankAcc"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      <div className={style.textInputs}>
                        <label className={style.label}>Select Bank</label>
                        <Field
                          as="select"
                          name="sendBank"
                          className={style.input}
                        >
                          <option value="">Select Bank</option>
                          <option value="gtbank">GTBank</option>
                          <option value="access">Access Bank</option>
                          <option value="uba">UBA</option>
                        </Field>
                        <ErrorMessage
                          name="sendBank"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>

                      {values.bankAcc.length === 10 && values.sendBank && (
                        <p>Account Name: James Okoro</p> // Simulated name
                      )}
                    </>
                  )}

                  <div className={style.textInputs}>
                    <label className={style.label}>Amount</label>
                    <div className={style.inputP}>
                      <Field
                        type="number"
                        name="sendMoney"
                        placeholder="₦0.00"
                        component={TextInput}
                      />
                    </div>
                    <ErrorMessage
                      name="sendMoney"
                      component="div"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className={style.textInputs}>
                    <label className={style.label}>Note (optional)</label>
                    <div className={style.inputP}>
                      <Field
                        type="text"
                        name="note"
                        placeholder="Add a note"
                        component={TextInput}
                      />
                    </div>
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

                  <p>Remaining Balance: $2000</p>
                  <p>Transfer Fee: ₦{computeFee(values.sendMoney, values.sendType)}</p>
                  <p>Total to Pay: ₦{Number(values.sendMoney || 0) + computeFee(values.sendMoney, values.sendType)}</p>

                  <button
                    className={style.nextBtn}
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    {isSubmitting ? <ClipLoader size={20} color="#fff" /> : "Next"}
                  </button>

                  <button
                    className={style.closeBtn}
                    type="button"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </Form>
              )}
            </Formik>
          </>
        )}

        {step === 2 && (
          <div className={style.step2}>
            <h2 className={style.start}>Review the detail of the transfer</h2>
            <p className={style.slease}>Please confirm the transaction</p>

            <h2 className={style.start}>Recipient</h2>
            <div className={style.reci}>
              <p>Recipient:</p>
              <p>
                {formData.sendType === "gpay-user"
                  ? formData.walletId
                  : `${formData.bankAcc} (${formData.sendBank})`}
              </p>
            </div>

            <h2 className={style.start}>Transfer Details</h2>
            <div className={style.reci}>
              <p>Transfer Type:</p>
              <p>{formData.sendType === "gpay-user" ? "GPay User" : "Bank Transfer"}</p>
            </div>
            <div className={style.reci}>
              <p>From:</p>
              <p>{formData.sendWallet} Wallet</p>
            </div>
            {formData.note && (
              <div className={style.reci}>
                <p>Note:</p>
                <p>{formData.note}</p>
              </div>
            )}
            <div className={style.reci}>
              <p>Date:</p>
              <p>{formattedDate}</p>
            </div>
            <div className={style.reci}>
              <p>Amount:</p>
              <p>${formData.sendMoney}</p>
            </div>
            <div className={style.reci}>
              <p>Fee:</p>
              <p>${fee}</p>
            </div>
            <hr />
            <div className={style.reci}>
              <p>Total:</p>
              <p>${total}</p>
            </div>
            <button className={style.nextBtn} onClick={handleNext}>
              Confirm and Send
            </button>
            <button className={style.closeBtn} onClick={onClose}>
              Cancel
            </button>
          </div>
        )}

        {step === 3 && (
          <div className={style.step2}>
            <img src="/images/Illustration.png" alt="gpay" />
            <p>Success! Transaction completed.</p>
            <button className={style.nextBtn} onClick={onClose}>
              Finish
            </button>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default SendModal;
