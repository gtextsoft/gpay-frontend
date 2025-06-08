// import style from "../styles/wallet.module.css";
// import { HandCoins, Repeat, Send } from "lucide-react";

// function Wallet({ label, amount, colorClass }) {
//   return (
//     <>

//     <div className={style.wall}>
//     <div className={style.theWallet}>
//     <div className={style[colorClass]}>
//       <p className={style.naira}>{label}</p>

//       <div className={style.chipNum}>
//         <img src="/images/chip.png" alt="chip" className={style.pho} />
//         <p className={style.number}>5355 0348 5945 5045</p>
//       </div>

//       <p className={style.amount}>{amount}</p>
//     </div>
//     </div>

//    {/* <div className={style.theWallet}>
//       <div className={style.wallets2}>
//         <p className={style.naira}>Naira Wallet</p>

//         <div className={style.chipNum}>
//           <img src="/images/chip.png" alt="chip" className={style.pho} />
//           <p className={style.number}>5355 0348 5945 5045</p>
//         </div>

//         <p className={style.amount}>#5000000</p>
//       </div>

//       <div className={style.wallets3}>
//         <p className={style.naira}>Dollar Wallet</p>

//         <div className={style.chipNum}>
//           <img src="/images/chip.png" alt="chip" className={style.pho} />
//           <p className={style.number}>5355 0348 5945 5045</p>
//         </div>

//         <p className={style.amount}>$5000000</p>
//       </div>

//       <div className={style.wallets4}>
//         <p className={style.naira}>Euro Wallet</p>

//         <div className={style.chipNum}>
//           <img src="/images/chip.png" alt="chip" className={style.pho} />
//           <p className={style.number}>5355 0348 5945 5045</p>
//         </div>

//         <p className={style.amount}>E5000000</p>
//       </div>
//     </div>  */}

//       <div className={style.transact}>
//         <div className={style.icon1}>
//           <Send />
//           <p>Send</p>
//         </div>

//         <div className={style.icon2}>
//           <span className="material-icons">call_received</span>
//           <p>Recieve</p>
//         </div>

//         <div className={style.icon3}>
//           <span className="material-icons">receipt</span>
//           <p>Invoice</p>
//         </div>

//         <div className={style.icon4}>
//           <Repeat />
//           <p>Swap</p>
//         </div>

//         <div className={style.icon5}>
//           <HandCoins />
//           <p>Denote</p>
//         </div>
//       </div>
//       </div>
//     </>
//   );
// }

// export default Wallet;

import style from "../styles/wallet.module.css";

function Wallet({ label, amount, colorClass }) {
  return (
    <>
      <div className={style.theWallet}>
        <div className={style[colorClass]}>
          <p className={style.naira}>{label}</p>

          <div className={style.chipNum}>
            <img src="/images/chip.png" cdcalt="chip" className={style.pho} />
            <p className={style.number}>5355 0348 5945 5045</p>
          </div>

          <p className={style.amount}>{amount}</p>
        </div>
      </div>
    </>
  );
}

export default Wallet;
