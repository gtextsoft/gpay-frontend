import SideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import style from "../styles/userdashboard.module.css";
// import AddTransaction from "../components/AddTransaction";
import TransactionHistory from "../components/TransactionHistory";
import TotalSent from "../components/Total Sent";
import TotalReceived from "../components/TotalReceived";
import TotalTransfers from "../components/TotalTransfers";
import TotalCurrencySwaps from "../components/TotalCurrencySwaps";
function UserTransactions() {
  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outl
          }>
            <div  className={style.walovers}>
              <p>Transaction Overview</p>
              <div className={style.allwal}>
              <p>All Wallet</p>
              <span className="material-icons">keyboard_arrow_down</span>
              </div>
            </div>

            <div className={style.totals}>
              <TotalSent/>
              <TotalReceived/>
              <TotalTransfers/>
              <TotalCurrencySwaps/>
            </div>

            <TransactionHistory />
            {/* <AddTransaction /> */}
            {/* <Transactions /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserTransactions;
