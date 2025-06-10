import SideBar from "../components/UserSideBar";
import UserHeader from "../components/BusinessHeader";
import style from "../styles/userdashboard.module.css";

function UserSavings() {
  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outline}>
        </div>
        </div>
      </div>
    </>
  );
}

export default UserSavings;
