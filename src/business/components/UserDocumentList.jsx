import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import UserSideBar from "./UserSideBar";
import UserHeader from "./UserHeader";
import style from "../styles/addinvest.module.css";

function UserDocumentList() {
  const [userDocuments, setUserDocuments] = useState([]);
  const [adminDocuments, setAdminDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleView, setToggleView] = useState("user"); // Default: User-uploaded docs
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("userAuthToken");
  const username = localStorage.getItem("userUsername"); // Assuming username is stored in localStorage

  // Fetch user's documents
  useEffect(() => {
    const fetchUserDocuments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/document/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserDocuments(response.data.userDocuments || []);
        setAdminDocuments(response.data.adminDocuments || []);
      } catch (error) {
        toast.error("Error fetching documents");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDocuments();
  }, [API_BASE_URL, token]);

  return (
    <div className={style.componentContent}>
      <ToastContainer />
      <UserSideBar />
      <div className={style.headerContent}>
        <UserHeader />
        <div className={style.outline}>
          {loading ? (
            <p>Loading documents...</p>
          ) : (
            <>
              {/* <h3>My Documents</h3> */}

              <div className={style.toggleSection}>
                <button
                  className={toggleView === "user" ? style.active : ""}
                  onClick={() => setToggleView("user")}
                >
                  My Documents
                </button>
                <button
                  className={toggleView === "admin" ? style.active : ""}
                  onClick={() => setToggleView("admin")}
                >
                  Company Documents
                </button>
              </div>

              {/* Display user or admin documents based on toggle */}
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Uploaded By</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {(toggleView === "user" ? userDocuments : adminDocuments).map((doc) => (
                    <tr key={doc._id}>
                      <td>{doc.title}</td>
                      <td>{doc.description}</td>
                      <td>{doc.uploadedBy}</td>
                      <td>
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDocumentList;
