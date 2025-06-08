import style from "../styles/identify.module.css";
import { NavLink } from "react-router-dom";

function IndIdentify7() {
  return (
    <div>
      {/* <div className={style.componentContent}> */}
      <div className={style.outline}>
        <img src="/images/GPay.png" alt="gpay" />

        <div className={style.welcome}>
          <p className={style.cardTitle}>Hello Andrew!</p>

          <p>Your KYC is Under Review</p>
          <p className={style.secure}>
            Thanks for submitting your verification details. We're reviewing
            your information and will notify you once your account is fully
            activated.
          </p>

          <p>This usually takes 24-48hours.</p>
        </div>

        <div className={style.here}>
          <p className={style.cardTitle}>What you can still do:</p>

          <div className={style.do}>
            <p>✅ View your profile</p>
            <p>✅ Edit or update submitted documents</p>
            <p>✅ Contact support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndIdentify7;
