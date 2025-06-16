import style from "../styles/total.module.css";

function TotalNGNWallet({
  totalNGNWallet = "850,000",
}) {
  return (
    <div className={style.monthInterest}>
      <div className={style.monthTotal}>
        <p className={style.balance}>NGN Wallet </p> 
        <p className={style.amnt}>${totalNGNWallet.toLocaleString()}</p>
      </div>

      <div className={style.compare}>
        <p className={style.balance}>Total Account:</p>
        <p className={style.gree}>4</p>
      </div>

    </div>
  );
}

export default TotalNGNWallet;
