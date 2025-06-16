import style from "../styles/total.module.css";

function TotalEURWallet({
  totalEURWallet = "850,000",
}) {
  return (
    <div className={style.monthInterest}>
      <div className={style.monthTotal}>
        <p className={style.balance}>EUR Wallet </p> 
        <p className={style.amnt}>${totalEURWallet.toLocaleString()}</p>
      </div>

      <div className={style.compare}>
        <p className={style.balance}>Total Account:</p>
        <p className={style.gree}>4</p>
      </div>

    </div>
  );
}

export default TotalEURWallet;
