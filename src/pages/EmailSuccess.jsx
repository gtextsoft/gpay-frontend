import React from "react";
import style from "../styles/register.module.css";
import { NavLink } from "react-router-dom";

function EmailSuccess() {
  return (
    <>
      <div className={style.register}>
        <img src="./images/authPic.png" alt="auth" className={style.left} />

        <div className={style.registerForm}>
          <div className={style.Para}>
            <img src="./images/GPay.png" alt="gpay" />
            <img src="./images/Illustration.png" alt="gpay" />

            <div className={style.textPara}>
              <p className={style.cardTitle}>
                Your email has been successfully verified.
              </p>
              <p className={style.cardPara}>
                You're one stop closer to activating your account
              </p>
            </div>
          </div>

          <button className={style.investConsult3}>
            <NavLink to="/login">Back To Login</NavLink>{" "}
          </button>

          <div className={style.linav1}>
            <p className={style.vest}>@ 2024 Gvest. Alrights reserved. </p>

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
    </>
  );
}

export default EmailSuccess;
