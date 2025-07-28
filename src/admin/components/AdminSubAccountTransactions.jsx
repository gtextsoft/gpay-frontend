import { useEffect, useState } from "react";
import axios from "axios";
import style from "../styles/transactions.module.css";
import jsPDF from "jspdf";

const SubAccountTransactions = ({ userId }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [username, setUsername] = useState(
    sessionStorage.getItem("individualUsername") || ""
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
      type,
      sourceName,
      amount,
      status,
      description,
      wallet,
      bank,
      fee,
      currency,
      account,
      createdAt,
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
    doc.text(`Payment wallet: ${wallet}`, 20, y);
    y += 10;
    doc.text(`Amount: ${amount}`, 20, y);
    y += 10;
    doc.text(`Transaction Type: ${type}`, 20, y);
    y += 10;
    doc.text(`Transaction Type: ${sourceName}`, 20, y);
    y += 10;
    doc.text(`Transaction Type: ${bank}`, 20, y);
    y += 10;
    doc.text(`Transaction Type: ${fee}`, 20, y);
    y += 10;
    doc.text(`Transaction Type: ${currency}`, 20, y);
    y += 10;
    doc.text(`Transaction Type: ${account}`, 20, y);
    y += 10;

    doc.text(`Status: ${status}`, 20, y);

    // Save the file
    doc.save(`Transaction_${transactionId}.pdf`);
  };

  //   if (loading) return <p>Loading transactions...</p>;
  //   if (error) return <p>{error}</p>;

  return (
    <div className="table-container">
      {/* <h2 className={style.history}>Transaction History</h2> */}
      {/* Transaction Details Popup */}
      {selectedTransaction && (
        <div className={style.detailContainer}>
          <div className={style.detailBox}>
            <h3>Transaction Overview</h3>
            <p>
              <strong>Transaction ID:</strong>{" "}
              {selectedTransaction.transactionId}
            </p>

            <p>
              <strong>Bank:</strong> {selectedTransaction.bank}{" "}
            </p>
            <p>
              <strong>From:</strong> {selectedTransaction.wallet}
            </p>
            <p>
              <strong>Note:</strong> {selectedTransaction.description}
            </p>
            <p>
              <strong>Date:</strong> {selectedTransaction.createdAt}
            </p>
            <p>
              <strong>Amount:</strong> {selectedTransaction.amount}
            </p>
            <p>
              <strong>Fee:</strong> {selectedTransaction.fee}
            </p>

            <hr />
            <p>
              <strong>Total:</strong> {selectedTransaction.total}
            </p>
            <hr />

            <h3>Sender</h3>
            <p>
              <strong>Sender:</strong> {selectedTransaction.sourceName}
            </p>

            <p>
              <strong>Account No:</strong> {selectedTransaction.account}
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
        <div className={style.over}>
          <p className={style.left}>Recent Transactions</p>

          <p>View More</p>
        </div>

        <table>
          <thead className={style.head}>
            <tr>
              <th className={style.headr}>Transaction ID</th>
              <th className={style.headr}>Type</th>
              <th className={style.headr}>Source</th>
              <th className={style.headr}>Account</th>
              <th className={style.headr}>Status</th>
              <th className={style.headr}>Date</th>
              <th className={style.headr}>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.transactionId}>
                <td>{txn.type}</td>
                <td>{txn.sourceName}</td>
                <td>
                  {txn.currency} {txn.amount / 100}{" "}
                </td>
                <td>{txn.status}</td>
                <td>{new Date(txn.createdAt).toLocaleString()} </td>
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

export default SubAccountTransactions;
