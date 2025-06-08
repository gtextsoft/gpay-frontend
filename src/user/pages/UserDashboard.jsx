import { useState, useEffect } from "react";
import { useKYC } from "../../context/KycContext";
import style from "../styles/userdashboard.module.css";

import SideBar from "../components/UserSideBar";
// import UserHeader from "../components/UserHeader";

import Welcome from "../components/Welcome";
import IndIdentify from "../components/IndIdentify";
import IndIdentify2 from "../components/IndIdentify2";
import IndIdentify3 from "../components/IndIdentify3";
import IndIdentify4 from "../components/IndIdentify4";
import IndIdentify5 from "../components/IndIdentify5";
import IndIdentify6 from "../components/IndIdentify6";
import IndIdentify7 from "../components/IndIdentify7";

import TotalInvestment from "../components/TotalInvestment";
import TotalInvestedAmount from "../components/TotalInvestedAmount";
import TotalMonthlyInterest from "../components/TotalMonthlyInterest";
import Overview from "../components/Overview";
import WalletDash from "../components/WalletDash";
import Invest from "../components/Invest";
import PaymentList from "../components/PaymentList";

import SendModal from "../components/SendModal";
import ReceiveModal from "../components/ReceiveModal";
import SwapModal from "../components/SwapModal";

function UserDashboard() {
  const { kycStatus, currentStep, kycRejectionReason, startKyc, isKycLoading } =
    useKYC();

  const [showRefillForm, setShowRefillForm] = useState(false); // ✅ NEW
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);

  if (isKycLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading your dashboard...</p>
      </div>
    );
  }

  const handleRefillClick = () => {
    startKyc(); // Reset KYC state
    setShowRefillForm(true); // ✅ Show form steps
  };

  const renderKycComponent = () => {
    if (kycStatus === "not_started") return <Welcome />;
    if (kycStatus === "in_review") return <IndIdentify7 />;

    switch (currentStep) {
      case 1:
        return <IndIdentify />;
      case 2:
        return <IndIdentify2 />;
      case 3:
        return <IndIdentify3 />;
      case 4:
        return <IndIdentify4 />;
      case 5:
        return <IndIdentify5 />;
      case 6:
        return <IndIdentify6 />;
      case 7:
        return <IndIdentify7 />;
      default:
        return <Welcome />;
    }
  };

  const renderDashboard = () => (
    <>
      <p className={style.dollar}>
        Dollar Account
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </p>
      <div className={style.investTotal}>
        <TotalInvestment />
        <TotalInvestedAmount />
        <TotalMonthlyInterest />
      </div>
      <div className={style.overWallet}>
        <Overview />
        <WalletDash
          onSendClick={() => setShowSendModal(true)}
          onReceiveClick={() => setShowReceiveModal(true)}
          onSwapClick={() => setShowSwapModal(true)}
        />
      </div>
      <div className={style.invest}>
        <Invest
          Unlimited=" Unlimited Cashback"
          Instant="Instant 20% back on your investment"
          Now=" Invest Now"
          Outline="outline1"
        />
        <Invest
          Unlimited="Donate Today"
          Instant="Change a Life Give Hope, Get Impact Instantly"
          Now=" Donate Now"
          Outline="outline2"
        />
      </div>
      <PaymentList />
    </>
  );

  return (
    <div className={style.componentContent}>
      <SideBar />
      <div className={style.headerContent}>
        <div
          className={`${style.outline} ${showSendModal ? style.blur : ""} ${
            showReceiveModal ? style.blur : ""
          } ${
            showSwapModal ? style.blur : ""
          } `} 
        >
          {kycStatus === "rejected" && !showRefillForm && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Your KYC was rejected.</strong>
              <p>Reason: {kycRejectionReason || "No reason provided."}</p>
              <button
                onClick={handleRefillClick}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded"
              >
                Refill Form
              </button>
            </div>
          )}

          {kycStatus === "approved"
            ? renderDashboard()
            : (kycStatus !== "rejected" || showRefillForm) &&
              renderKycComponent()}
        </div>
        {showSendModal && <SendModal onClose={() => setShowSendModal(false)} />}
        {showReceiveModal && (
          <ReceiveModal onClose={() => setShowReceiveModal(false)} />
        )}
        {showSwapModal && <SwapModal onClose={() => setShowSwapModal(false)} />}
      </div>
    </div>
  );
}

export default UserDashboard;
