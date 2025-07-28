import { useState, useEffect } from "react";
import { useKYC } from "../../context/KycContext";
import style from "../styles/admindashboard.module.css";
import SideBar from "../components/AdminSideBar";
import UserHeader from "../components/AdminHeader";
import Setting from "../components/AdminSetting";


function AdminSettings() {
  return (
    <div className={style.componentContent}>
      <SideBar />
      <div className={style.headerContent}>
        <UserHeader />
        <div className={style.outline}>
        <Setting/>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
