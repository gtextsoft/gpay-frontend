import { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/transactions.module.css";
import jsPDF from "jspdf";

const SubAccounts = ({ userId }) => {
  const [subaccounts, setSubaccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSubAccounts, setSelectedSubAccounts] = useState(null);
  const [username, setUsername] = useState(
    sessionStorage.getItem("individualUsername") || ""
  );

  useEffect(() => {
    const fetchSubAccounts = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(
          `${API_BASE_URL}/user/subaccounts/${username}`
        );
        setSubaccounts(response.data);
      } catch (err) {
        setError("Failed to load subaccounts.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubAccounts();
  }, [userId]);

  const handleViewDetail = (txn) => {
    setSelectedSubAccounts(txn);
  };

  const handleCloseDetail = () => {
    setSelectedSubAccounts(null);
  };

  //   if (loading) return <p>Loading subaccounts...</p>;
  //   if (error) return <p>{error}</p>;

  return (
    <div className="table-container">
      {/* <h2 className={style.history}>Subaccount Overview</h2> */}
      {/* subaccount Details Popup */}
      {selectedSubAccounts && (
        <div className={style.detailContainer}>
          <div className={style.detailBox}>
            <h3>Subaccount Detail</h3>

            <hr />
            <h3>Subaccount Overview</h3>
            <p>
              <strong>Subaccount ID:</strong> {selectedSubAccounts.subaccountId}
            </p>

            <p>
              <strong>Description:</strong> {selectedSubAccounts.description}
            </p>
            <p>
              <strong>Subaccount Date:</strong> {selectedSubAccounts.createdAt}
            </p>

            <hr />
            <h3>Payment Details</h3>
            <p>
              <strong>Payment Method:</strong> {selectedSubAccounts.method}
            </p>

            <p>
              <strong>Amount:</strong> {selectedSubAccounts.amount}
            </p>
            <p>
              <strong>subaccount Type:</strong> {selectedSubAccounts.type}
            </p>

            <hr />

            <hr />
            <h3>Subaccount Status</h3>
            <p>
              <strong>Status:</strong> ✔ {selectedSubAccounts.status}
            </p>
            <div className={style.detailButtons}>
              <button onClick={handleCloseDetail} className={style.closeBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Table - Blur when details are open */}
      <div className={selectedSubAccounts ? style.blur : ""}>

        <div className={style.over}>
          <div className={style.ovrt}>
        <p className={style.left}>Subaccounts Overview</p>
        <div  className={style.overt}>

            <p>Default</p>
            <span className="material-icons">keyboard_arrow_down</span>
          </div>
        </div>

          <p>View More</p>
        </div>

        <table>
          <thead className={style.head}>
            <tr>
              <th className={style.headr}>Subaccount Name</th>
              <th className={style.headr}>Business Type</th>
              <th className={style.headr}>KYC Status</th>
              <th className={style.headr}>Industry</th>
              {/* <th className={style.headr}>subaccount Type</th> */}
              <th className={style.headr}>Action</th>
              {/* <th className={style.headr}></th> */}
            </tr>
          </thead>

          <tbody>
            {subaccounts.map((txn) => (
              <tr key={txn.subaccountId}>
                <td>{new Date(txn.createdAt).toLocaleString()} </td>
                <td>{txn.subName}</td>

                <td>{txn.businessType}</td>
                <td>{txn.kycStatus}</td>
                <td>{txn.industry}</td>
                <td>
                  <button
                    className={style.buton}
                    onClick={() => handleViewDetail(txn)}
                  >
                    View More
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubAccounts;
