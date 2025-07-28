import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import style from "../styles/admindashboard.module.css";
import SideBar from "../components/AdminSideBar";
import UserHeader from "../components/AdminHeader";
import AdminBusiness from "../components/AdminBusiness";

function AdminBusinesses() {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  
    useEffect(() => {
        const fetchBusinesses = async () => {
          try {
            const token = sessionStorage.getItem("adminAuthToken");
            if (!token) {
              console.error("No token found. User might not be logged in.");
              return;
            }
    
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.get(
              `${API_BASE_URL}/admin/all-business-users`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
    
            console.log("Businesses:", response.data);
            setBusinesses(response.data.userData);
            setLoading(false);
          } catch (err) {
            console.error("Error fetching Businesses:", err);
            setError("Failed to fetch Businesses.");
            toast.error("Failed to fetch Business data.");
            setLoading(false);
          }
        };
    
        fetchBusinesses();
      }, []);
  return (
    <div className={style.componentContent}>
      <SideBar />
      <div className={style.headerContent}>
        <UserHeader />
        <div className={style.outline}>
        <>
           {/* businesses */}
            {selectedUser ? (
              <AdminBusiness
                user={selectedUser}
                goBack={() => setSelectedUser(null)}
              />
            ) : (
              <div className={style.users}>
                <div className={style.invtFilt}>
                  <p>Businesses List</p>

                  <div className={style.drum}>
                    <p>Filter:</p>
                    <select>
                      <option value="drum">drum</option>
                      <option value="drum">drum</option>
                      <option value="drum">drum</option>
                    </select>
                  </div>
                </div>

                <div className={style.das}>
                  {loading ? (
                    <p>Loading businesses...</p>
                  ) : error ? (
                    <p>{error}</p>
                  ) : (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>KYC Status</th>
                            <th>Created At</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {businesses.map((business, index) => (
                            <tr key={index}>
                              <td>{business.busName}</td>
                              <td>{business.email}</td>
                              <td>{business.phoneNumber}</td>
                              <td>{business.businesskyc?.status || "Not Started"}</td>
                              <td>{business.createdAt?.split("T")[0] || "N/A"}</td>

                              <td>
                                <button
                                  className={style.edi}
                                  onClick={() => setSelectedUser(business)}
                                >
                                  View Details
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default AdminBusinesses;
