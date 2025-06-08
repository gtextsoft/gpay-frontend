import style from "../styles/wallet2.module.css";

function Wallet2({ label, amount, colorClass }) {
  return (
    <>
        <div className={style[colorClass]}>
          <p className={style.naira}>{label}</p>

          <div className={style.chipNum}>
            <img src="/images/chip.png" alt="chip" className={style.pho} />
            <p className={style.number}>5355 0348 5945 5045</p>
          </div>

          <p className={style.amount}>{amount}</p>
        </div>
    </>
  );
}

export default Wallet2;
