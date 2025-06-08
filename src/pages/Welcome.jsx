import React, { useContext, useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "../styles/Welcome.module.css";

function Welcome() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div className={style.register}>
        <img src="./images/authPic.png" alt="auth" className={style.left} />
      

        <div className={style.right}>
          <div className={style.up}>
            <img src="./images/GPay.png" alt="gpay" />

            <div className={style.text}>
              <p className={style.textHeader}>Welcome to Gpay</p>
              <p className={style.textHeader2}>
                Let’s set up the right experience for you. Choose the type of
                account you want to create.
              </p>
            </div>

            <div className={style.account}>
              <div className={style.link}>
                <span class="material-symbols-outlined">person</span>{" "}
                <a href="/individual-register" className={style.linkInd}>
                  Create Individual Account
                </a>{" "}
              </div>

              <div className={style.linkBus}>
                <span class="material-symbols-outlined">domain</span>{" "}
                <a href="/business-register" className={style.linkBusi}>
                  Create Business Account{" "}
                </a>
              </div>
            </div>

            <span className={style.hri}>
              <hr />
              <p>OR</p>
              <hr />
            </span>

            <p className={style.logi}>
              Have an account?{" "}
              <a href="/login" className={style.in}>
                Log In
              </a>
            </p>
          </div>

          <div className={style.copy}>
            <p className={style.pay}>@ 2024 Gpay. All rights reserved. </p>

            <a href="/terms-condition" className={style.term}>
              Terms & Condition
            </a>

            <a href="/privacy-policy" className={style.term}>
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Welcome;
