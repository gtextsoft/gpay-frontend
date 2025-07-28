import style from "../styles/total.module.css";

function Total({ totalInvestmentAmount = 1000 }) {
  return (
    // <div className={style.monthInterest}>
    //   <div className={style.monthTotal}>
    //     <p>
    //       Total Investment Amount: ${totalInvestmentAmount.toLocaleString()}
    //     </p>
    //     <p>📈</p> 
    //   </div>
    // </div>

      <div className={style.monthInterest}>
          <div className={style.monthTotal}>
            <p className={style.balance}>Monthly Income </p> 
            <p className={style.amnt}>${totalInvestmentAmount.toLocaleString()}</p>
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
