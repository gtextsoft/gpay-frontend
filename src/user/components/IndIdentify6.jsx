import React from "react";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/identify.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useKYC } from "../../context/KycContext";

function IndIdentify6() {
    const {
      updateStepData,
      markStepComplete,
      goToStep,
      goToPreviousStep,
      kycData,
    } = useKYC();

    // markStepComplete("IndIdentify5");

    const handleSubmit = (values) => {
      // updateStepData("step4", values);
      markStepComplete("IndIdentify6");
      goToStep(7); // Proceed to IndIdentify3
    };
  
  return (
    <>
      <div className={style.outline}>
        <img src="/images/GPay.png" alt="gpay" />
        <img src="/images/Illustration.png" alt="gpay" />

        <p>Thanks, Andrew! We're verifying your identity.</p>
        <p>We'll notify you when your account is ready to go</p>

        <div className={style.btn}>
          <button
            type="button"
            className={style.investConsult3}
            aria-label="Next"
            // onClick={() => goToStep(7)} 
            onClick= {handleSubmit} 
          >
            <div className={style.arrowForward}>
              Next
              <span className="material-icons">arrow_forward</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default IndIdentify6;
