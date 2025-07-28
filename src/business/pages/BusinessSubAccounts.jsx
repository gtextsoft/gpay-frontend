import { useState } from "react";
import SideBar from "../components/UserSideBar";
import UserHeader from "../components/BusinessHeader";
import style from "../styles/userdashboard.module.css";
import SubAccountForm from "../components/SubAccountForm";
import SubAccountSuccess from "../components/SubAccountSuccess";
import EditSubAccountForm from "../components/EditSubAccountForm";
import TotalUSDWallet from "../components/TotalUSDWallet";
import TotalEURWallet from "../components/TotalEURWallet";
import TotalNGNWallet from "../components/TotalNGNWallet";
import { Edit, Plus } from "lucide-react";
import SubAccounts from "../components/SubAccounts";
import SubAccountTransactions from "../components/SubAccountTransactions";
import SubAccountTransaction from "../components/SubAccountTransaction";

function BusinessSubAccounts() {
  const [view, setView] = useState("default"); // 'default' | 'form' | 'success'
  const [selectedSubAccount, setSelectedSubAccount] = useState(null);
  const [subViewMode, setSubViewMode] = useState("detail"); // "detail" | "transaction"
  const [editMode, setEditMode] = useState(false);

  const handleCreateClick = () => {
    setView("form");
  };

  const handleFormSuccess = () => {
    setView("success");
  };

  const handleBackToDashboard = () => {
    setView("default");
    setSelectedSubAccount(null);
    setSubViewMode("detail");
    setEditMode(false);
  };

  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outline}>
            {view === "form" && (
              <SubAccountForm
                onSuccess={handleFormSuccess}
                onCancel={handleBackToDashboard}
              />
            )}

            {view === "success" && (
              <SubAccountSuccess onDone={handleBackToDashboard} />
            )}

            {/* Opening page */}
            {view === "default" && !selectedSubAccount && (
              <>
                <p className={style.age}>Manage Sub-Account</p>
                <p>
                  Create and manage wallets for team members, departments, or
                  specific projects.
                </p>

                <div className={style.investTotal}>
                  <TotalNGNWallet />
                  <TotalUSDWallet />
                  <TotalEURWallet />
                </div>

                <div className={style.plu}>
                  <button className={style.plus} onClick={handleCreateClick}>
                    Create New Business <Plus />
                  </button>
                </div>

                <SubAccounts
                  onSelectSubAccount={(account) => {
                    setSelectedSubAccount(account);
                    setSubViewMode("detail");
                    setView("default");
                  }}
                />
             
                <SubAccountTransactions />
              </>
            )}

            {/* Show Details/Transactions Fullscreen */}
            {view === "default" && selectedSubAccount && (
              // {selectedSubAccount && (
              <div className={style.detailContainer}>
                <button
                  onClick={handleBackToDashboard}
                  // className={style.closeBtn}
                  className={style.plusE}
                >
                  ← Back to Table
                </button>

                {/* {(subViewMode === "detail" || subViewMode === "transaction") && !editMode && ( */}
                {subViewMode === "detail" && !editMode && (
                  <div className={style.detailBo}>
                    {/* <h3>Subaccount Detail</h3> */}

                    <div className={style.busSub}>
                      <div>
                        <p>
                          <strong> {selectedSubAccount.subName}</strong>
                        </p>
                        <p>{selectedSubAccount.subEmail}</p>
                      </div>

                      <button
                        className={style.plusE}
                        onClick={() => setEditMode(true)}
                      >
                        Edit <Edit />
                      </button>
                    </div>

                    <div className={style.tabButtons}>
                      <button
                        className={style.btn}
                        onClick={() => setSubViewMode("detail")}
                      >
                        Details
                      </button>
                      <button
                        className={style.btn2}
                        onClick={() => setSubViewMode("transaction")}
                      >
                        Transactions
                      </button>
                    </div>
                  </div>
                )}

                {subViewMode === "transaction" && (
                  <div>
                    <div className={style.busSubT}>
                      <p>
                        <strong> {selectedSubAccount.subName}</strong>
                      </p>
                      <p>{selectedSubAccount.subEmail}</p>
                    </div>

                    <div className={style.tabButtons}>
                      <button
                        className={style.btn}
                        onClick={() => setSubViewMode("detail")}
                      >
                        Details
                      </button>
                      <button
                        className={style.btn2}
                        onClick={() => setSubViewMode("transaction")}
                      >
                        Transactions
                      </button>
                    </div>

                    <div className={style.transactionBox}>
                      <SubAccountTransaction
                        subId={selectedSubAccount.subaccountId}
                      />
                    </div>
                  </div>
                )}

                {subViewMode === "detail" && !editMode && (
                  <div className={style.detailBox}>
                    <div className={style.two}>
                      <p>Account Email:</p>
                      <p className={style.one}>
                        {" "}
                        {selectedSubAccount.subEmail}
                      </p>
                    </div>
                    <div className={style.two}>
                      <p>Account Password:</p>{" "}
                      <p className={style.one}> {selectedSubAccount.subPass}</p>
                    </div>
                    <div className={style.two}>
                      <p>Business Name:</p>{" "}
                      <p className={style.one}> {selectedSubAccount.subName}</p>
                    </div>
                    <div className={style.two}>
                      <p>Business Type:</p>{" "}
                      <p className={style.one}>
                        {" "}
                        {selectedSubAccount.businessType}
                      </p>
                    </div>
                    <div className={style.two}>
                      <p>Industry:</p>
                      <p className={style.one}>
                        {" "}
                        {selectedSubAccount.industry}
                      </p>
                    </div>
                    <div className={style.two}>
                      <p>Status:</p>
                      <p className={style.one}>
                        {" "}
                        {selectedSubAccount.busKycStatus}
                      </p>
                    </div>
                    <div className={style.two}>
                      <p>Created:</p>{" "}
                      <p className={style.one}>
                        {" "}
                        {new Date(
                          selectedSubAccount.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}

                {subViewMode === "detail" && editMode && (
                  <EditSubAccountForm
                    subaccount={selectedSubAccount}
                    onCancel={() => setEditMode(false)}
                    onSuccess={() => {
                      setEditMode(false);
                      handleBackToDashboard(); // Optionally refetch data
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessSubAccounts;
