// import SideBar from "../components/UserSideBar";
// // import Transactions from "../components/Transactions";
// import UserHeader from "../components/UserHeader";
// import style from "../styles/userdashboard.module.css";
// import Wallet from "../components/Wallet";
// import UserActions from "../components/UserActions";
// import Overview from "../components/Overview";
// import Barchart from "../components/Barchart";
// function UserWallet({ onSendClick, onReceiveClick, onSwapClick  }) {
//   return (
//     <>
//       <div className={style.componentContent}>
//         <SideBar />

//         <div className={style.headerContent}>
//           <UserHeader />

//           <div className={style.outline}>
          

//             <div className={style.wallet}>
//               <Wallet
//                 label="Naira Wallet"
//                 amount="#5000000"
//                 colorClass="wallets2"
//               />
//               <Wallet
//                 label="Dollar Wallet"
//                 amount="$5000000"
//                 colorClass="wallets3"
//               />
//               <Wallet
//                 label="Euro Wallet"
//                 amount="E5000000"
//                 colorClass="wallets4"
//               />
//             </div>
//             <UserActions onSendClick={onSendClick} onReceiveClick={onReceiveClick} onSwapClick={onSwapClick}/>

//             {/* <button className={style.initiate}>Initiate Withdrawal</button> */}
//             <div className={style.walover}>
//               <p>Wallet Overview</p>

//               <div className={style.allwal}>
//                 <p>All Wallet</p>
//                 <span className="material-icons">keyboard_arrow_down</span>
//               </div>
//             </div>

//             <div className={style.bar}>
//               <Overview />
//               <Barchart />
//             </div>

//             {/* <p>Withdrawal History</p> */}
//             {/* <Transactions /> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserWallet;

import SideBar from "../components/UserSideBar";
// import Transactions from "../components/Transactions";
import UserHeader from "../components/UserHeader";
import style from "../styles/userdashboard.module.css";
import SendModal from "../components/SendModal";
import ReceiveModal from "../components/ReceiveModal";
import SwapModal from "../components/SwapModal";
import Overview from "../components/Overview";
import Barchart from "../components/Barchart";
import WalletDash2 from "../components/WalletDash2";
import { useState } from "react";

function UserWallet() {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);

  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div
            className={`${style.outline} ${showSendModal ? style.blur : ""} ${
              showReceiveModal ? style.blur : ""
            } ${showSwapModal ? style.blur : ""} `}
          >
            <WalletDash2
              onSendClick={() => setShowSendModal(true)}
              onReceiveClick={() => setShowReceiveModal(true)}
              onSwapClick={() => setShowSwapModal(true)}
            />

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
          {showSendModal && (
            <SendModal onClose={() => setShowSendModal(false)} />
          )}
          {showReceiveModal && (
            <ReceiveModal onClose={() => setShowReceiveModal(false)} />
          )}
          {showSwapModal && (
            <SwapModal onClose={() => setShowSwapModal(false)} />
          )}
        </div>
      </div>
    </>
  );
}

export default UserWallet;
