import { useState, useEffect } from "react";
import { useKYC } from "../../context/KycContext";
import style from "../styles/admindashboard.module.css";
import SideBar from "../components/AdminSideBar";
import UserHeader from "../components/AdminHeader";
import AdminNotificationForm from "../components/AdminNotificationForm";
import AdminAllUserNotificationForm from "../components/AdminAllUserNotificationForm";
import Notifications from "../components/AdminNotificationHistory";

function AdminNotification() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the modal visibility

  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outline}>
            <div className={`${isModalOpen ? style.blurBackground : ""}`}>
              <div className={style.allInvest}>
                <p>List of All Notification</p>

                {/* Open Investment Plan Section */}
                <button
                  className={style.newInvest}
                  onClick={() => setIsModalOpen(true)}
                >
                  Upload A Notification
                </button>
              </div>
            </div>

            <Notifications />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={style.modalOverlay}>
          <div className={style.modalContentl}>
            {/* Close Button */}
            <button
              className={style.closeButtonl}
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <div className={style.scrollableForm}>
              <h3>Post for one user</h3>
              <AdminNotificationForm />
              <br />

              <h3>Post for all users</h3>
              <AdminAllUserNotificationForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminNotification;
