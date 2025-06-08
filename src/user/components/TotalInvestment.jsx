import style from "../styles/total.module.css";

function Total({
  totalInvestments = 2000,
}) {
  return (
    <div className={style.monthInterest}>
      <div className={style.monthTotal}>
        <p className={style.balance}>Total Balance </p> 
        <p className={style.amnt}>${totalInvestments.toLocaleString()}</p>
      </div>

      <div className={style.compare}>
        <p className={style.green}>+4%</p>
        <p className={style.balance}>Compare to last month</p>
      </div>

      {/* <p>50%</p> */}
      {/* <p>📈</p> */}
    </div>
  );
}

export default Total;
