import { useNavigate } from "react-router-dom";
import SideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import style from "../styles/usernotification.module.css";

import Password from "../components/Password";

function UserPassword() {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outline}>
          <Password/>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPassword;
