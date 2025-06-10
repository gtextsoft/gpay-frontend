import { useNavigate } from "react-router-dom";
import SideBar from "../components/UserSideBar";
import UserHeader from "../components/BusinessHeader";
import style from "../styles/usernotification.module.css";

import Password from "../components/Password";

function BusinessPassword() {
  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outline}>
            <Password />
          </div>
        </div>
      </div>
    </>
  );
}

export default BusinessPassword;
