import SideBar from "../components/UserSideBar";
// import Transactions from "../components/Transactions";
import UserHeader from "../components/UserHeader";
import style from "../styles/userdashboard.module.css";
import Wallet from "../components/Wallet";
import UserActions from "../components/UserActions";
import Overview from "../components/Overview";
import Barchart from "../components/Barchart";
function UserWallet() {
  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outline}>
            {/* <div className={style.document}>
              <button className={style.myDocument}>Withdraw</button>
              <button className={style.companyDocument}>Deposit</button>
            </div> */}

            <div className={style.wallet}>
              <Wallet
                label="Naira Wallet"
                amount="#5000000"
                colorClass="wallets2"
              />
              <Wallet
                label="Dollar Wallet"
                amount="$5000000"
                colorClass="wallets3"
              />
              <Wallet
                label="Euro Wallet"
                amount="E5000000"
                colorClass="wallets4"
              />
            </div>
            <UserActions />

            {/* <button className={style.initiate}>Initiate Withdrawal</button> */}
            <div className={style.walover}>
              <p>Wallet Overview</p>

              <div className={style.allwal}>
                <p>All Wallet</p>
                <span className="material-icons">keyboard_arrow_down</span>
              </div>
            </div>

            <div className={style.bar}>
              <Overview />
              <Barchart />
            </div>

            {/* <p>Withdrawal History</p> */}
            {/* <Transactions /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserWallet;
