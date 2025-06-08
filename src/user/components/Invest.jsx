import style from "../styles/invest.module.css";
import { NavLink } from "react-router-dom";

function Invest({Unlimited, Instant, Now, Outline}) {
  return (
    // <div className={style.outline}>
    //   <div className={style.content}>
    //     <p className={style.unlimited}>Unlimited Cashbank</p>
    //     <p>Instant 20% back on your investment</p>
    //   </div>

    //   <div className={style.innow}>
    //     <a href="" className={style.inw}>
    //       Invest Now
    //     </a>
    //     <span className="material-icons">arrow_forward</span>
    //   </div>
    // </div>

    <div className={style[Outline]}>
    <div className={style.content}>
      <p className={style.unlimited}>{Unlimited}</p>
      <p className={style.instant}>{Instant}</p>
    </div>

    <div className={style.innow}>
      <a href="" className={style.inw}>
       { Now }
      </a>
      <span className="material-icons">arrow_forward</span>
    </div>
  </div>
  );
}

export default Invest;
