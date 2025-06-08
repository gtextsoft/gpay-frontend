import style from "../styles/total.module.css";

function TotalReceived({
  TotalReceived = 20,
}) {
  return (
    <div className={style.monthInterest}>
      <div className={style.monthTotal}>
        <p className={style.balance}>Total Received </p> 
        <p className={style.amnt}>${TotalReceived.toLocaleString()}</p>
      </div>

      <div className={style.compare}>
        <p className={style.green}>+1%</p>
        <p className={style.balance}>Compare to last month</p>
      </div>
    </div>
  );
}

export default TotalReceived;
