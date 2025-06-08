import { useNavigate } from "react-router-dom";
import SideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import style from "../styles/usernotification.module.css";
import Notification from "../components/Notification";

function UserNotification() {
  const navigate = useNavigate();

  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outline}>
            <h3>My Notification</h3>
            <Notification />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserNotification;
