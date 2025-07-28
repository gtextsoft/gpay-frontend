import { useNavigate } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import AdminHeader from "../components/AdminHeader";
import style from "../../user/styles/usernotification.module.css";

import Password from "../components/AdminPassword";

function UserPassword() {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.componentContent}>
        <AdminSideBar />

        <div className={style.headerContent}>
          <AdminHeader />

          <div className={style.outline}>
          <Password/>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPassword;
