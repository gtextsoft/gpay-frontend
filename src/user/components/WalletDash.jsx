import style from "../styles/userdashboard.module.css";
import Wallet2 from "../components/Wallet2";
import UserActions from "../components/UserActions";
function WalletDash({ onSendClick, onReceiveClick, onSwapClick  }) {
  return (
    <>
      <div className={style.out}>

      <div className={style.scrollContainer}>
        <div className={style.wallet}>
          <Wallet2
            label="Naira Wallet"
            amount="#5000000"
            colorClass="wallets2"
          />
          <Wallet2
            label="Dollar Wallet"
            amount="$5000000"
            colorClass="wallets3"
          />
          <Wallet2
            label="Euro Wallet"
            amount="E5000000"
            colorClass="wallets4"
          />
        </div>

        </div>
        <UserActions onSendClick={onSendClick} onReceiveClick={onReceiveClick} onSwapClick={onSwapClick}/>
        
      </div>
    </>
  );
}

export default WalletDash;
