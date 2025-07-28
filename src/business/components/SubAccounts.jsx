// import { useEffect, useState } from "react";
// import axios from "axios";
// import style from "../styles/transactions.module.css";
// import jsPDF from "jspdf";
// import SubAccountTransactions from "./SubAccountTransactions";
// import SubAccountTransaction from "./SubAccountTransaction";

// const SubAccounts = ({ userId }) => {
//   const [subaccounts, setSubaccounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedSubAccounts, setSelectedSubAccounts] = useState(null);
//   const [username, setUsername] = useState(
//     sessionStorage.getItem("businessUsername") || ""
//   );

//   useEffect(() => {
//     const fetchSubAccounts = async () => {
//       try {
//         const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//         const response = await axios.get(
//           `${API_BASE_URL}/api/subaccounts/bus/${username}`
//         );
//         setSubaccounts(response.data);
//       } catch (err) {
//         setError("Failed to load subaccounts.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubAccounts();
//   }, [userId]);

//   const handleViewDetail = (txn) => {
//     setSelectedSubAccounts(txn);
//   };

//   const handleCloseDetail = () => {
//     setSelectedSubAccounts(null);
//   };

//   const handleMore= () => {
//     setSelectedSubAccounts(null);
//   };

//   //   if (loading) return <p>Loading subaccounts...</p>;
//   //   if (error) return <p>{error}</p>;

//   return (
//     <div className="table-container">
//       {/* <h2 className={style.history}>Subaccount Overview</h2> */}
//       {/* subaccount Details Popup */}
//       {selectedSubAccounts && (
//         <div className={style.detailContainer}>
//           <div className={style.detailBox}>
//             <h3>Subaccount Detail</h3>

//             <hr />

//             <p>
//               <strong>Subaccount ID:</strong> {selectedSubAccounts.subaccountId}
//             </p>

//             <p>
//               <strong>Business Type:</strong> {selectedSubAccounts.businessType}
//             </p>
//             <p>
//               <strong>Industry:</strong> {selectedSubAccounts.industry}
//             </p>
//             <p>
//               <strong>Date of Business Formation:</strong> {selectedSubAccounts.createdAt}
//             </p>

//             <hr />
//             <h3>Subaccount Status</h3>
//             <p>
//               <strong>Status:</strong> {selectedSubAccounts.busKycStatus}
//             </p>

//             <div className={style.detailButtons}>
//               <button onClick={handleMore} className={style.closeBtn}>
//                 View More
//               </button>
//             </div>

//             <div className={style.detailButtons}>
//               <button onClick={handleCloseDetail} className={style.closeBtn}>
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Table - Blur when details are open */}
//       <div className={selectedSubAccounts ? style.blur : ""}>
//         <div className={style.over}>
//           <div className={style.ovrt}>
//             <p className={style.left}>Subaccounts Overview</p>
//             <div className={style.overt}>
//               <p>Default</p>
//               <span className="material-icons">keyboard_arrow_down</span>
//             </div>
//           </div>

//           <p>View More</p>
//         </div>

//         <table>
//           <thead className={style.head}>
//             <tr>
//               <th className={style.headr}>Subaccount Name</th>
//               <th className={style.headr}>Business Type</th>
//               <th className={style.headr}>KYC Status</th>
//               <th className={style.headr}>Industry</th>
//               <th className={style.headr}>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {subaccounts.map((txn) => (
//               <tr key={txn.subaccountId}>
//                 <td>{txn.subName}</td>
//                 <td>{txn.businessType}</td>
//                 <td>{txn.busKycStatus}</td>
//                 {/* <td>{txn.kycStatus}</td> */}
//                 <td>{txn.industry}</td>
//                 <td>
//                   <button
//                     className={style.buton}
//                     onClick={() => handleViewDetail(txn)}
//                     >
//                     View More
//                   </button>{" "}
//                 </td>
//                     {/* <td>{new Date(txn.crevatedAt).toLocaleString()} </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

// {/* When view more on the subaccount modal component is clicked */}
//       <div>
//       <div>
//         <div>
//           <p>SubAccount Name</p>
//           <p>SubAccount Email</p>
//         </div>

//         <button>Edit</button>
//         {/* edit only name, password  create backend update controller */}
//       </div>

//       <div>
//         <button>Detail</button>
//         <button>transaction</button>
//       </div>

//       {/* Detail */}
//       <div>
//         <p>Account Email: </p>
//         <p>Account Password:</p>
//         <p>Business Name:</p>
//         <p>Business Type:</p>
//         <p>Industry:</p>
//         <p>Status:</p>
//         <p>Date of Business Formation: </p>
//       </div>

//       {/* Edit */}
//       <div>
//       <div>
//         <div>
//           <p>Edit Sub-account Information</p>
//           <p>Please update the sub-account details</p>
//         </div>

//         <p>x</p>
//       </div>

//       <label htmlFor="">Business Name</label>
//       <input type="text" />

//       <label htmlFor="">Password</label>
//       <input type="text" />

//       <button>Submit</button>
//       </div>

//       {/* That sub account Transaction */}
//       <SubAccountTransaction/>
//       </div>

//     </div>
//   );
// };

// export default SubAccounts;

import { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/transactions.module.css";
import jsPDF from "jspdf";

const SubAccounts = ({ userId, onSelectSubAccount }) => {
  const [subaccounts, setSubaccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSubAccounts, setSelectedSubAccounts] = useState(null);
  const [username, setUsername] = useState(
    sessionStorage.getItem("businessUsername") || ""
  );

  useEffect(() => {
    const fetchSubAccounts = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(
          `${API_BASE_URL}/api/subaccounts/bus/${username}`
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
      {/* Preview */}
      {selectedSubAccounts && (
        <div className={style.detailContainer}>
          <div className={style.detailBox}>
            <h3>Subaccount Detail</h3>

            <hr />

            <p>
              <strong>Subaccount ID:</strong> {selectedSubAccounts.subaccountId}
            </p>

            <p>
              <strong>Business Type:</strong> {selectedSubAccounts.businessType}
            </p>
            <p>
              <strong>Industry:</strong> {selectedSubAccounts.industry}
            </p>
            <p>
              <strong>Date of Business Formation:</strong>{" "}
              {selectedSubAccounts.createdAt}
            </p>

            <hr />
            <h3>Subaccount Status</h3>
            <p>
              <strong>Status:</strong> {selectedSubAccounts.busKycStatus}
            </p>

            <div className={style.detailButtons}>
              <button
                className={style.buton}
                onClick={() => {onSelectSubAccount(selectedSubAccounts);
                  handleCloseDetail();
                }
                }
              >
                View More
              </button>
              {/* onclick of this button show me inner detail , deatil and transaction */}
            </div>

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
            <div className={style.overt}>
              <p>Default</p>
              <span className="material-icons">keyboard_arrow_down</span>
            </div>
          </div>
        </div>

        <table>
          <thead className={style.head}>
            <tr>
              <th className={style.headr}>Subaccount Name</th>
              <th className={style.headr}>Business Type</th>
              <th className={style.headr}>KYC Status</th>
              <th className={style.headr}>Industry</th>
              <th className={style.headr}>Action</th>
            </tr>
          </thead>

          <tbody>
            {subaccounts.map((txn) => (
              <tr key={txn.subaccountId}>
                <td>{txn.subName}</td>
                <td>{txn.businessType}</td>
                <td>{txn.busKycStatus}</td>
                {/* <td>{txn.kycStatus}</td> */}
                <td>{txn.industry}</td>
                <td>
                  <button
                    className={style.buton}
                    onClick={() => handleViewDetail(txn)}
                  >
                    View More
                  </button>{" "}
                </td>
                {/* <td>{new Date(txn.crevatedAt).toLocaleString()} </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubAccounts;
