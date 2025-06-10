import React from "react";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/identify.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useBusKYC } from "../../context/BusKycContext";

function BusIndIdentify5() {
    const {
      markStepComplete,
      goToStep,
    } = useBusKYC();

    // markStepComplete("BusIndIdentify5");

    const handleSubmit = (values) => {
      markStepComplete("BusIndIdentify5");
      goToStep(6); 
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

export default BusIndIdentify5;
