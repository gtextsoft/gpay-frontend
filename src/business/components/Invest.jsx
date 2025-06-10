import style from "../styles/invest.module.css";
import { NavLink } from "react-router-dom";

function Invest({Unlimited, Instant, Link, Now, Outline}) {
  return (
 
    <div className={style[Outline]}>
    <div className={style.content}>
      <p className={style.unlimited}>{Unlimited}</p>
      <p className={style.instant}>{Instant}</p>
    </div>

 
      <a href={Link} className={style.innow}>
       { Now }
      <span className="material-icons">arrow_forward</span>
      </a>
  </div>
  );
}

export default Invest;
