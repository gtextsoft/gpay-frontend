import style from "../styles/total.module.css";

function Total({ totalMonthlyInterest = 500 }) {
  return (
    // <div className={style.monthInterest}>
    //   <div className={style.monthTotal}>
    //     <p>Total Interest: ${totalMonthlyInterest.toLocaleString()}</p>
    //     <p>📈</p> {/* Placeholder for icon */}
    //   </div>
    // </div>

<div className={style.monthInterest}>
<div className={style.monthTotal}>
  <p className={style.balance}>Monthly Expense</p> 
  <p className={style.amnt}>${totalMonthlyInterest.toLocaleString()}</p>
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
