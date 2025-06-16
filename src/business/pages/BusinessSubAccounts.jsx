import SideBar from "../components/UserSideBar";
import UserHeader from "../components/BusinessHeader";
import style from "../styles/userdashboard.module.css";
import SubAccountForm from "../components/SubAccountForm";
import SubAccountSuccess from "../components/SubAccountSuccess";
import TotalUSDWallet from "../components/TotalUSDWallet";
import TotalEURWallet from "../components/TotalEURWallet";
import TotalNGNWallet from "../components/TotalNGNWallet";
import { Plus } from "lucide-react";
import SubAccounts from "../components/SubAccounts";
import SubAccountTransactions from "../components/SubAccountTransactions";

function UserFund() {
  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outline}>
            <SubAccountForm/>
            <SubAccountSuccess/>

          <p className={style.age}>Manage Sub-Account</p>
            <p >Create and manage wallets for team members, departments, or specific projects.</p>

            <div className={style.investTotal}>
        <TotalNGNWallet />
        <TotalUSDWallet />
        <TotalEURWallet />
      </div>

      <div className={style.plu}>
      <button className={style.plus}> Create New Business <Plus/> </button> 
      
      </div>

      <SubAccounts/>
      <SubAccountTransactions/>
        </div>
        </div>
      </div>
    </>
  );
}

export default UserFund;
