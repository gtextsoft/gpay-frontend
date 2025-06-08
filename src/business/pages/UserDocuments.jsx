import SideBar from "../components/UserSideBar";
import { useState } from "react";
// import Transactions from "../components/Transactions";
import UserHeader from "../components/UserHeader";
import style from "../styles/userdashboard.module.css";
import { useNavigate } from "react-router-dom";
import UserDocumentList from "../components/UserDocumentList";
import UploadDocument from "../components/UploadDocument";
function Documents() {
  const navigate = useNavigate();
  const company = () => {
    navigate("/user/company"); // Navigate to the '/compound' page
  };

  const mine = () => {
    navigate("/user/mine"); // Navigate to the '/compound' page
  };

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
                <h3>My Documents</h3>

                {/* Open Investment Plan Section */}
                <button
                  className={style.newInvest}
                  onClick={() => setIsModalOpen(true)}
                >
                  Add New Document
                </button>
              </div>
            </div>
            <UserDocumentList />
          </div>
        </div>
      </div>

      {/* Investment Plan Section (Appears Only When Modal is Open) */}
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

            {/* Scrollable Form */}
            <div className={style.scrollableForm}>
              <UploadDocument />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Documents;
