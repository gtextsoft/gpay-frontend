// import { useEffect } from "react";
// import { useKYC } from "../../context/KycContext";
// import style from "../styles/identify.module.css";
// import { NavLink } from "react-router-dom";
// import { useUser } from "../../context/UserContext";

// function IndIdentify7() {
//   const { username } = useUser();
//   const { markStepComplete, kycSteps } = useKYC();

//   useEffect(() => {
//     if (!kycSteps["IndIdentify7"]) {
//       markStepComplete("IndIdentify7");
//     }
//   }, [kycSteps, markStepComplete]);

//   // const handleSubmit = (values) => {
//   //   // updateStepData("step4", values);
//   //   markStepComplete("IndIdentify7");
  
//   return (
//     <div>
//       {/* <div className={style.componentContent}> */}
//       <div className={style.outline}>
//         <img src="/images/GPay.png" alt="gpay" />

//         <div className={style.welcome}>
//           {/* <p className={style.cardTitle}>Hello Andrew!</p> */}

//           {/* <p className={style.cardTitle}>Hello {user?.username || "User"}!</p> */}
//           <p className={style.cardTitle}>Hello {username || "User"}!</p>

//           <p>Your KYC is Under Review</p>
//           <p className={style.secure}>
//             Thanks for submitting your verification details. We're reviewing
//             your information and will notify you once your account is fully
//             activated.
//           </p>

//           <p>This usually takes 24-48hours.</p>
//         </div>

//         <div className={style.here}>
//           <p className={style.cardTitle}>What you can still do:</p>

//           {/* <div className={style.do}>
//             <p>✅ View your profile</p>
//             <p>✅ Edit or update submitted documents</p>
//             <p>✅ Contact support</p>
//           </div> */}

//           <div className={style.do}>
//             <NavLink to="/dashboard/profile">✅ View your profile</NavLink>
//             <NavLink to="/dashboard/identify/edit">
//               ✅ Edit or update documents
//             </NavLink>
//             <NavLink to="/support">✅ Contact support</NavLink>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default IndIdentify7;

import { useEffect } from "react";
import { useKYC } from "../../context/KycContext";
import style from "../styles/identify.module.css";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function IndIdentify7() {
  const { username } = useUser();
  const { markStepComplete, kycSteps } = useKYC();

  useEffect(() => {
    // Mark IndIdentify7 as complete ONLY if not already done
    if (!kycSteps["IndIdentify7"]) {
      markStepComplete("IndIdentify7");
    }
  }, [kycSteps]);

  return (
    <div className={style.outline}>
      <img src="/images/GPay.png" alt="gpay" />
      <div className={style.welcome}>
        <p className={style.cardTitle}>Hello {username || "User"}!</p>
        <p>Your KYC is Under Review</p>
        <p className={style.secure}>
          Thanks for submitting your verification details. We're reviewing your
          information and will notify you once your account is fully activated.
        </p>
        <p>This usually takes 24-48 hours.</p>
      </div>
      <div className={style.here}>
        <p className={style.cardTitle}>What you can still do:</p>
        <div className={style.do}>
          <NavLink to="/dashboard/profile">✅ View your profile</NavLink>
          <NavLink to="/dashboard/identify/edit">✅ Edit or update documents</NavLink>
          <NavLink to="/support">✅ Contact support</NavLink>
        </div>
      </div>
    </div>
  );
}

export default IndIdentify7;
