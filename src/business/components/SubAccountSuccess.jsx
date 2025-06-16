import React from "react";
import "react-toastify/dist/ReactToastify.css";
import style from "../styles/identify.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useBusKYC } from "../../context/BusKycContext";

function SubAccountSuccess() {


 
  return (
    <>
      <div className={style.outline}>
        <img src="/images/GPay.png" alt="gpay" />
        <img src="/images/Illustration.png" alt="gpay" />

        <p>Your business sub account, [Aba llc] has been created and is now under review for verification.
            You can now manage wallets, create sub accounts and begin setting up your financial tools.
        </p>
        <p>We'll notify you when your account is ready to go</p>

        <div className={style.btn}>
          <button
            type="button"
            className={style.investConsult3}
            aria-label="Next"
     
          >
            <div className={style.arrowForward}>
              Okay
              <span className="material-icons">arrow_forward</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default SubAccountSuccess;
