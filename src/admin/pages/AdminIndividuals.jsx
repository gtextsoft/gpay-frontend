import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import style from "../styles/admindashboard.module.css";
import SideBar from "../components/AdminSideBar";
import UserHeader from "../components/AdminHeader";
import AdminIndividual from "../components/AdminIndividual"; // Import AdminIndividual component

function AdminIndividuals() {
    const [individuals, setIndividuals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  
    useEffect(() => {
        const fetchIndividuals = async () => {
          try {
            const token = sessionStorage.getItem("adminAuthToken");
            if (!token) {
              console.error("No token found. User might not be logged in.");
              return;
            }
    
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
            const response = await axios.get(
              `${API_BASE_URL}/admin/all-individual-users`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
    
            console.log("Individuals:", response.data);
            setIndividuals(response.data.userData);
            setLoading(false);
          } catch (err) {
            console.error("Error fetching individuals:", err);
            setError("Failed to fetch individuals.");
            toast.error("Failed to fetch individual data.");
            setLoading(false);
          }
        };
    
        fetchIndividuals();
      }, []);
  return (
    <>   
    <ToastContainer />
    <div className={style.componentContent}>
      <SideBar />
      <div className={style.headerContent}>
        <UserHeader />
        <div className={style.outline}>
          <>
            individuals
            {selectedUser ? (
              <AdminIndividual
                user={selectedUser}
                goBack={() => setSelectedUser(null)}
              />
            ) : (
              <div className={style.users}>
                <div className={style.invtFilt}>
                  <p>Individuals List</p>

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
                    <p>Loading individuals...</p>
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
                          {individuals.map((individual, index) => (
                            <tr key={index}>
                              <td>{individual.username}</td>
                              <td>{individual.email}</td>
                              <td>{individual.phoneNumber}</td>
                              <td>{individual.kyc?.status || "Not Started"}</td>
                              {/* <td>{individual.createdAt}</td> */}
                              <td>{individual.createdAt?.split("T")[0] || "N/A"}</td>

                              <td>
                                <button
                                  className={style.edi}
                                  onClick={() => setSelectedUser(individual)}
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
    </>
  );
}

export default AdminIndividuals;
