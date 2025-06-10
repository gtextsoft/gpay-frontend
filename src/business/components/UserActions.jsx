// components/UserActions.jsx
import { HandCoins, Repeat, Send } from "lucide-react";
import style from "../styles/wallet2.module.css";

function UserActions({ onSendClick, onReceiveClick, onSwapClick }) {
  return (
    <div className={style.transact}>
      <div className={style.icon1} onClick={onSendClick}>
        <Send />
        <p>Send</p>
      </div>

      <div className={style.icon2} onClick={onReceiveClick}>
        <span className="material-icons">call_received</span>
        <p>Receive</p>
      </div>

      <div className={style.icon3}>
        <span className="material-icons">receipt</span>
        <p>Invoice</p>
      </div>

      <div className={style.icon4} onClick={onSwapClick}>
        <Repeat />
        <p>Swap</p>
      </div>

      <div className={style.icon5}>
        <HandCoins />
        <p>Denote</p>
      </div>
    </div>
  );
}

export default UserActions;
