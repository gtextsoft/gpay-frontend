import style from "../styles/identify.module.css";
import { useBusKYC } from "../../context/BusKycContext";

function BusWelcome() {
  const { startKyc } = useBusKYC();

  const handleStart = () => {
    startKyc(); // ✅ Set status to 'in_progress'
  };

  return (
    <div className={style.componentContent}>
      <div className={style.outline}>
        <img src="/images/GPay.png" alt="gpay" />

        <div className={style.welcome}>
          <p className={style.cardTitle}>Welcome to GtextPay!</p>
          <p>
            Let's get your account fully verified so you can start sending,
            receiving, and managing your money with ease.
          </p>
          <p>To unlock all features, we'll need to confirm a few details.</p>
        </div>

        <div className={style.here}>
          <p className={style.cardTitle}>Here's what you'll do:</p>
          <div className={style.do}>
            <p>✅ Provide basic personal details</p>
            <p>✅ Upload a valid ID (e.g. passport)</p>
            <p>✅ Confirm your address</p>
            <p>✅ Share a few financial details</p>
          </div>
        </div>

        <p className={style.secure}>
          This helps keep your account secure and ensures compliance with
          regulations — especially for USD or international wallets.
        </p>

        <button onClick={handleStart} className={style.investConsult2}>
          Start Verification{" "}
          <span className="material-icons">arrow_forward</span>
        </button>

        <p>Need help? Our team is here for you anytime.</p>
      </div>
    </div>
  );
}

export default BusWelcome;
