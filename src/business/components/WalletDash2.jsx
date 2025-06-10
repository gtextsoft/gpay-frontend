import style from "../styles/userdashboard.module.css";
import Wallet from "../components/Wallet";
import UserActions from "../components/UserActions";
function WalletDash2({ onSendClick, onReceiveClick, onSwapClick }) {
  return (
    <>
      {/* <div className={style.out}> */}
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
          <Wallet label="Euro Wallet" amount="E5000000" colorClass="wallets4" />
        </div>

        <UserActions
          onSendClick={onSendClick}
          onReceiveClick={onReceiveClick}
          onSwapClick={onSwapClick}
        />
      {/* </div> */}
    </>
  );
}

export default WalletDash2;
