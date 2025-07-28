import { useState, useEffect } from "react";
import { useKYC } from "../../context/KycContext";
import style from "../styles/admindashboard.module.css";

import SideBar from "../components/AdminSideBar";
import UserHeader from "../components/AdminHeader";

import TotalInvestment from "../components/AdminTotalInvestment";
import TotalInvestedAmount from "../components/AdminTotalInvestedAmount";
import TotalMonthlyInterest from "../components/AdminTotalMonthlyInterest";
import Overview from "../components/AdminOverview";
import PaymentList from "../components/AdminPaymentList";
import Upcoming from "../components/Upcoming";

function AdminDashboard() {
  return (
    <div className={style.componentContent}>
      <SideBar />
      <div className={style.headerContent}>
        <UserHeader />
        <div className={style.outline}>
          <>
            <div className={style.investTotal}>
              <TotalInvestment />
              <TotalInvestedAmount />
              <TotalMonthlyInterest />
            </div>

            <div className={style.overWallet}>
              <Overview />
              <Upcoming />
            </div>
            <PaymentList />
          </>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
