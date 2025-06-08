import { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/transactions.module.css";
import jsPDF from "jspdf";

import { NavLink } from "react-router-dom";

const TransactionHistory = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [username, setUsername] = useState(
    localStorage.getItem("userUsername") || ""
  );

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(
          `${API_BASE_URL}/user/transactions/${username}`
        );
        setTransactions(response.data);
      } catch (err) {
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  const handleViewDetail = (txn) => {
    setSelectedTransaction(txn);
  };

  const handleCloseDetail = () => {
    setSelectedTransaction(null);
  };

  const handleDownload = () => {
    if (!selectedTransaction) return;

    const {
      transactionId,
      investmentName,
      investmentDuration,
      type,
      amount,
      method,
      createdAt,
      description,
      status,
    } = selectedTransaction;

    const doc = new jsPDF();
    let y = 20; // Initial Y position

    // Set title
    doc.setFontSize(18);
    doc.text("Transaction Details", 20, y);
    y += 10; // Move down

    // Set transaction details
    doc.setFontSize(12);
    doc.text(`Transaction ID: ${transactionId}`, 20, y);
    y += 10;
    doc.text(`Description: ${description}`, 20, y);
    y += 10;
    doc.text(
      `Transaction Date: ${new Date(createdAt).toLocaleString()}`,
      20,
      y
    );
    y += 10;
    doc.text(`Payment Method: ${method}`, 20, y);
    y += 10;
    doc.text(`Amount: ${amount}`, 20, y);
    y += 10;
    doc.text(`Transaction Type: ${type}`, 20, y);
    y += 10;
    doc.text(`Investment Name: ${investmentName}`, 20, y);
    y += 10;
    doc.text(`Investment Duration: ${investmentDuration}`, 20, y);
    y += 10;
    doc.text(`Status: ${status}`, 20, y);

    // Save the file
    doc.save(`Transaction_${transactionId}.pdf`);
  };

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-container">
        <div className={style.dash}>
                  <p className={style.list}>Transaction History </p>

                  <div className={style.dasl}>
                  <button className={style.view}>
                  <NavLink to="/user/transactions" className={style.link}>
                    View More
                  </NavLink>
                </button>
                  </div>
                </div>

      {/* Transaction Details Popup */}
      {selectedTransaction && (
        <div className={style.detailContainer}>
          <div className={style.detailBox}>
            <h3>Transaction Detail</h3>

            <hr />
            <h3>Transaction Overview</h3>
            <p>
              <strong>Transaction ID:</strong>{" "}
              {selectedTransaction.transactionId}
            </p>

            <p>
              <strong>Description:</strong> {selectedTransaction.description}
            </p>
            <p>
              <strong>Transaction Date:</strong> {selectedTransaction.createdAt}
            </p>

            <hr />
            <h3>Payment Details</h3>
            <p>
              <strong>Payment Method:</strong> {selectedTransaction.method}
            </p>

            <p>
              <strong>Amount:</strong> {selectedTransaction.amount}
            </p>
            <p>
              <strong>Transaction Type:</strong> {selectedTransaction.type}
            </p>

            <hr />
            <h3>Investment Details</h3>
            <p>
              <strong>Investment Name:</strong>{" "}
              {selectedTransaction.investmentName}
            </p>
            <p>
              <strong>Investment Duration:</strong>{" "}
              {selectedTransaction.investmentDuration}
            </p>

            <hr />
            <h3>Transaction Status</h3>
            <p>
              <strong>Status:</strong> ✔ {selectedTransaction.status}
            </p>
            <div className={style.detailButtons}>
              <button onClick={handleDownload} className={style.downloadBtn}>
                Download Details
              </button>
              <button onClick={handleCloseDetail} className={style.closeBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Table - Blur when details are open */}
      <div className={selectedTransaction ? style.blur : ""}>
      <div className={style.tableWrapper}>
        <table>
          <thead className={style.head}>
            <tr>
              <th className={style.headr}>Date</th>
              <th className={style.headr}>Description</th>
              <th className={style.headr}>Amount</th>
              <th className={style.headr}>Payment Method</th>
              <th className={style.headr}>Transaction Type</th>
              <th className={style.headr}>Status</th>
             
            </tr>
          </thead>

          <tbody>
            {transactions.slice(0, 2).map((txn) => (
              <tr key={txn.transactionId}>
                <td>{new Date(txn.createdAt).toLocaleString()} </td>
                <td>{txn.description}</td>
                <td>
                  {txn.currency} {txn.amount / 100}{" "}
                </td>
                <td>{txn.method}</td>
                <td>{txn.type}</td>
                <td>{txn.status}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
