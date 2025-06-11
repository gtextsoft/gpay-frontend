// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import style from "../styles/register.module.css";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";

// function VerifyEmail() {
//   const [verificationCode, setVerificationCode] = useState("");
//   const [loading, setLoading] = useState(false); // To show loading state
//   const navigate = useNavigate();

//   const handleVerification = async () => {
//     setLoading(true);
//     try {
//       const email = localStorage.getItem("userEmail");

//       if (!email || !verificationCode) {
//         throw new Error("Missing email or verification token.");
//       }

//       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//       const response = await axios.post(
//         `${API_BASE_URL}/user/verify-email`,
//         // "http://localhost:4000/user/verify-email",
//         { email, verificationCode } // Use the state value, not localStorage
//       );

//       toast.success("Email verified successfully!", { autoClose: 2000 });

//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       console.error("Verification error:", error.response || error.message);
//       toast.error(
//         error.response?.data?.message ||
//           "Verification failed! Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className={style.register}>
//         <img src="./images/authPic.png" alt="auth" className={style.left} />

//          <div className={style.registerForm}>
//         <div className={style.Para}>
//         <img src="./images/GPay.png" alt="gpay" />

//    <div className={style.textPara}>
//           <p className={style.cardTitle}>Verify Your Email</p>
//           <p className={style.cardPara}>We have sent a verification code to your email address. Not in your inbox? Check your spam!</p>
//         </div>
//         </div>

//         <form action="" className={style.actionV}>
//           <div className={style.inputV}>
//             <input
//               type="text"
//               value={verificationCode}
//               onChange={(e) => setVerificationCode(e.target.value)}
//               required
//               className={style.inputsV}
//             />
//           </div>

//           <button
//             type="button"
//             onClick={handleVerification}
//             className={style.investConsult4}
//             disabled={loading} // Disable the button while loading
//           >
//             {loading ? "Verifying..." : "Submit"}
//           </button>
//         </form>

//         <div className={style.linav1}>
//           <p className={style.vest}>@ 2024 Gvest. All rights reserved. </p>

//           <div className={style.navUl}>
//             <li className={style.navLi}>
//               <NavLink to="/t&c">Terms & Condition</NavLink>
//             </li>
//             <li className={style.navLi}>
//               <NavLink to="/privacy-policy">Privacy Policy</NavLink>
//             </li>
//           </div>
//         </div>
//       </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// }

// export default VerifyEmail;

import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false); // To show loading state
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
    if (!value) return;
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    if (index < 5 && value) inputRefs.current[index + 1]?.focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const newCode = [...verificationCode];
      newCode[index - 1] = "";
      setVerificationCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  // const handleVerification = async () => {
  //   setLoading(true);
  //   try {
  //     const email = localStorage.getItem("userEmail");

  //     if (!email || !verificationCode) {
  //       throw new Error("Missing email or verification token.");
  //     }

  //     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  //     const response = await axios.post(
  //       `${API_BASE_URL}/user/verify-email`,
  //       { email, verificationCode } // Use the state value, not localStorage
  //     );

  //     toast.success("Email verified successfully!", { autoClose: 2000 });

  //     setTimeout(() => {
  //       navigate("/login");
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Verification error:", error.response || error.message);
  //     toast.error(
  //       error.response?.data?.message ||
  //         "Verification failed! Please try again."
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleVerification = async () => {
    setLoading(true);
    try {
      const email = localStorage.getItem("userEmail");
  
      if (!email || !verificationCode) {
        throw new Error("Missing email or verification token.");
      }
  
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      
      const verificationToken = verificationCode.join(""); // Convert array to string
  
      const response = await axios.post(
        `${API_BASE_URL}/user/verify-email`,
        { email, verificationToken } // Correct field name
      );
  
      toast.success("Email verified successfully!", { autoClose: 2000 });
  
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Verification error:", error.response || error.message);
      toast.error(
        error.response?.data?.message ||
        "Verification failed! Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className={style.register}>
        <img src="./images/authPic.png" alt="auth" className={style.left} />

        <div className={style.registerForm}>
          <div className={style.Para}>
            <img src="./images/GPay.png" alt="gpay" />

            <div className={style.textPara}>
              <p className={style.cardTitle}>Verify Your Email</p>
              <p className={style.cardPara}>
                We have sent a verification code to your email address. Not in
                your inbox? Check your spam!
              </p>
            </div>
          </div>

          <form action="" className={style.actionV}>
            <div className={style.inputV}>
              {verificationCode.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleBackspace(e, idx)}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  className={style.inputsV}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleVerification}
              className={style.investConsult4}
              disabled={loading} // Disable the button while loading
            >
              {loading ? "Verifying..." : "Submit"}
            </button>
          </form>

          <div className={style.linav1}>
            <p className={style.vest}>@ 2024 Gvest. All rights reserved. </p>

            <div className={style.navUl}>
              <li className={style.navLi}>
                <NavLink to="/t&c">Terms & Condition</NavLink>
              </li>
              <li className={style.navLi}>
                <NavLink to="/privacy-policy">Privacy Policy</NavLink>
              </li>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default VerifyEmail;
