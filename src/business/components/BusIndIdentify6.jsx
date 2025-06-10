

import { useEffect } from "react";
import { useBusKYC } from "../../context/BusKycContext";
import style from "../styles/identify.module.css";
import { NavLink } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function BusIndIdentify6() {
  const { username } = useUser();
  const { markStepComplete, kycSteps } = useBusKYC();

  useEffect(() => {
    // Mark BusIndIdentify7 as complete ONLY if not already done
    if (!kycSteps["BusIndIdentify6"]) {
      markStepComplete("BusIndIdentify6");
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

export default BusIndIdentify6;
