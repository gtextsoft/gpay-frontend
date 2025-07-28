import { useState, useEffect } from "react";
import style from "../styles/adminotification.module.css";
import SubAccounts from "./AdminSubAccounts";
import SubAccountTransaction from "../../business/components/SubAccountTransaction";

function AdminBusiness({ user = {}, goBack }) {
    
  const [activeTab, setActiveTab] = useState("profile"); // Track active tab
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [role, setRole] = useState(null); // 'individual' | 'business'
  const [userbusinessKycData, setUserbusinessKycData] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    user?.profilePicture || "defaultImagePath.jpg"
  );
  const [updatedUser, setUpdatedUser] = useState(user || {});
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [docUrl, setDocUrl] = useState(""); // for preview
  const [docName, setDocName] = useState(""); // for download naming

  const [usersLoading, setUsersLoading] = useState(true);
  const [businesskycLoading, setbusinessKycLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(user || {});
  const [selectedSubAccount, setSelectedSubAccount] = useState(null);
  const [view, setView] = useState("default"); // "", "default"
  const [subViewMode, setSubViewMode] = useState("detail"); // or "transaction"
  //   const [editMode, setEditMode] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = sessionStorage.getItem("adminAuthToken");
  // const dateOnly = updatedUser.businesskyc?.createdAt?.split("T")[0] || "N/A";

  useEffect(() => {
    if (user && user._id) {
      setSelectedUserId(user._id);
      setRole(user.role); // This should be either "individual" or "business"
      setUserbusinessKycData(user.businesskyc || {});
      setUpdatedUser(user);
    }
  }, [user]);

  useEffect(() => {
    console.log("User data in AdminIndividual:", user);
    // Convert the ISO date string to the correct format (yyyy-MM-dd)
    // if (updatedUser.dateOfBirth) {
    if (updatedUser && updatedUser.dateOfBirth) {
      // const date = new Date(updatedUser.dateOfBirth);
      const date = updatedUser?.dateOfBirth
        ? new Date(updatedUser.dateOfBirth)
        : null;

      // const formatted = date.toISOString().split("T")[0]; // "yyyy-MM-dd"
      const formatted = date ? date.toISOString().split("T")[0] : "";

      setFormattedDate(formatted);
    }
  }, [updatedUser.dateOfBirth]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageSrc(URL.createObjectURL(file)); // Preview image before upload
    }
  };

  console.log("activeTab:", activeTab);
  console.log("view:", view);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this profile?"))
      return;

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await fetch(
        `${API_BASE_URL}/admin/delete-user/${user._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Profile deleted successfully");
        goBack();
      } else {
        alert("Failed to delete profile");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const handleApprove = async () => {
    if (!selectedUserId) {
      alert("No user selected.");
      return;
    }
    if (!window.confirm("Approve this businessKYC submission?")) return;

    try {
      setActionLoading(true);

      const url =
        role === "individual"
          ? `${API_BASE_URL}/api/businesskyc/approve/${selectedUserId}`
          : `${API_BASE_URL}/api/businesskyc/bus/approve/${selectedUserId}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`Approve failed: ${res.status}`);
      alert("businessKYC approved successfully.");
      setRejectReason("");
      setbusinessKycLoading(false);

      // Refetch updated businessKYC data
      const refreshUrl =
        role === "individual"
          ? `${API_BASE_URL}/api/businesskyc/admin/${selectedUserId}`
          : `${API_BASE_URL}/api/businesskyc/bus/admin/${selectedUserId}`;

      const updatedRes = await fetch(refreshUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedData = await updatedRes.json();
      setUserbusinessKycData(updatedData);

      setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));
      setSelectedUserId(null);
      setUserbusinessKycData(null);
      setRole(null);
    } catch (err) {
      alert("Error approving businessKYC: " + err.message);
    } finally {
      setActionLoading(false);
      setbusinessKycLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedUserId) {
      alert("No user selected.");
      return;
    }
    if (!rejectReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }
    if (!window.confirm("Reject this businessKYC submission?")) return;

    try {
      setActionLoading(true);

      const url =
        role === "individual"
          ? `${API_BASE_URL}/api/businesskyc/reject/${selectedUserId}`
          : `${API_BASE_URL}/api/businesskyc/bus/reject/${selectedUserId}`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rejectionReason: rejectReason }),
      });

      if (!res.ok) throw new Error(`Reject failed: ${res.status}`);
      alert("businessKYC rejected successfully.");

      const refreshUrl =
        role === "individual"
          ? `${API_BASE_URL}/api/businesskyc/admin/${selectedUserId}`
          : `${API_BASE_URL}/api/businesskyc/bus/admin/${selectedUserId}`;

      const updatedRes = await fetch(refreshUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedData = await updatedRes.json();
      setUserbusinessKycData(updatedData);
      setRejectReason("");
      setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));
      setSelectedUserId(null);
      setUserbusinessKycData(null);
      setRole(null);
    } catch (err) {
      alert("Error rejecting businessKYC: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBackToDashboard = () => {
    setView("default");
    setSelectedSubAccount(null);
    setSubViewMode("detail");
    setActiveTab("sub-account");
  };

  const handleViewDocument = (url, name) => {
    setDocUrl(url);
    setDocName(name);
    setShowDocModal(true);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(docUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;

      // Ensure correct extension
      const fileExtension = blob.type.split("/")[1]; // e.g., 'png', 'jpeg', 'pdf'
      const finalName = `${docName || "document"}.${fileExtension}`;

      a.download = finalName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Failed to download document.");
      console.error("Download error:", error);
    }
  };

  // const handleDownload = () => {
  //   const link = document.createElement("a");
  //   link.href = docUrl;
  //   link.download = docName || "document.pdf";
  //   link.click();
  // };

  // Handle input changes
  // const handleChange = (e) => {
  //   setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  // };

  // Handle profile picture change

  // Save changes (send to backend)
  // const handleSubmit = async () => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("phoneNumber", updatedUser.phoneNumber);
  //     formData.append("gender", updatedUser.gender);
  //     formData.append("maritalStatus", updatedUser.maritalStatus);
  //     formData.append("dateOfBirth", updatedUser.dateOfBirth);
  //     formData.append("employmentStatus", updatedUser.employmentStatus);
  //     formData.append("city", updatedUser.city);
  //     formData.append("state", updatedUser.state);
  //     formData.append("country", updatedUser.country);
  //     if (selectedFile) {
  //       formData.append("profilePicture", selectedFile);
  //     }

  //     const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  //     const response = await fetch(
  //       `${API_BASE_URL}/user/profile/${user.username}`,
  //       {
  //         method: "PUT",
  //         body: formData, // Send FormData instead of JSON
  //       }
  //     );

  //     console.log("User Data in AdminIndividual:", user);

  //     if (response.ok) {
  //       alert("Profile updated successfully");
  //       setIsEditing(false);
  //     } else {
  //       alert("Failed to update profile");
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  // if (usersLoading) return <p>Loading users...</p>;
  // if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className={style.set}>
      <button className={style.edi} onClick={goBack}>
        ← Back
      </button>

      {/* User Info Section */}

      <div className={style.imageText}>
        <img
          src={imageSrc || "defaultImagePath.jpg"}
          alt="Profile"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
        />
        {isEditing && (
          <input type="file" accept="image/*" onChange={handleFileChange} />
        )}

        <div className={style.texts}>
          <p className={style.text1}>{user?.busName || "N/A"}</p>
          <p className={style.text2}>{user?.email || "N/A"}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={style.profilePasswordq}>
        <button
          onClick={() => setActiveTab("profile")}
          className={activeTab === "profile" ? style.activeTab : ""}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={activeTab === "transactions" ? style.activeTab : ""}
        >
          Transactions
        </button>

        <button
          onClick={() => setActiveTab("documents")}
          className={activeTab === "documents" ? style.activeTab : ""}
        >
          Documents
        </button>
        <button
          onClick={() => setActiveTab("businesskyc")}
          className={activeTab === "businesskyc" ? style.activeTab : ""}
        >
          businessKYC
        </button>
        <button
          onClick={() => setActiveTab("sub-account")}
          className={activeTab === "sub-account" ? style.activeTab : ""}
        >
          Sub-Account
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div>
          {/* <h3>User Profile</h3> */}
          <div className={style.detailBox}>
            <div className={style.two}>
              <p>Business Registration Number:</p>
              <p className={style.one}>{updatedUser.businesskyc?.regNum}</p>
            </div>

            <div className={style.two}>
              <p>Industry:</p>
              <p className={style.one}>{updatedUser.businesskyc?.industry}</p>
            </div>

            <div className={style.two}>
              <p>Company Size:</p>
              <p className={style.one}>
                {updatedUser.businesskyc?.companySize}
              </p>
            </div>

            <div className={style.two}>
              <p>Country of Registration:</p>
              <p className={style.one}>{updatedUser.businesskyc?.countryReg}</p>
            </div>

            <div className={style.two}>
              <p>Year Established:</p>
              <p className={style.one}>
                {updatedUser.businesskyc?.dateEstablished?.split("T")[0] ||
                  "N/A"}
              </p>
            </div>

            <div className={style.two}>
              <p>Business Type:</p>
              <p className={style.one}>
                {updatedUser.businesskyc?.businessType}
              </p>
            </div>

            <div className={style.two}>
              <p>Address Line 1:</p>
              <p className={style.one}>{updatedUser.businesskyc?.address}</p>
            </div>

            <div className={style.two}>
              <p>City:</p>
              <p className={style.one}>{updatedUser.businesskyc?.city}</p>
            </div>

            <div className={style.two}>
              <p>State:</p>
              <p className={style.one}>{updatedUser.businesskyc?.state}</p>
            </div>

            <div className={style.two}>
              <p>Country:</p>
              <p className={style.one}>{updatedUser.businesskyc?.country}</p>
            </div>

            <div className={style.two}>
              <p>Postal Code:</p>
              <p className={style.one}>{updatedUser.businesskyc?.postal}</p>
            </div>

            <div className={style.two}>
              <p>Created At:</p>
              <p className={style.one}>
                {updatedUser.createdAt?.split("T")[0] || "N/A"}
              </p>
            </div>

            <div className={style.two}>
              <p>Business KYC Status:</p>
              <p className={style.one}>{updatedUser.businesskyc?.status}</p>
            </div>
          </div>

          {/* <div className={style.labeInpu}>
            <div className={style.labe}>
              <label className={style.lab}>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={updatedUser.phoneNumber}
                onChange={handleChange}
                className={style.input}
                disabled={!isEditing}
              />
            </div>

            <div className={style.labe}>
              <label className={style.lab}>Gender</label>
              <select
                name="gender"
                value={updatedUser.gender}
                onChange={handleChange}
                className={style.input}
                disabled={!isEditing}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className={style.labeInpu}>
            <div className={style.labe}>
              <label className={style.lab}>Marital Status</label>
              <select
                name="maritalStatus"
                value={updatedUser.maritalStatus}
                onChange={handleChange}
                className={style.input}
                disabled={!isEditing}
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>

            <div className={style.labe}>
              <label className={style.lab}>Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formattedDate}
                onChange={handleChange}
                className={style.input}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className={style.labeInpu}>
            <div className={style.labe}>
              <label className={style.lab}>Employment Status</label>
              <select
                name="employmentStatus"
                value={updatedUser.employmentStatus}
                onChange={handleChange}
                className={style.input}
                disabled={!isEditing}
              >
                <option value="">Select</option>
                <option value="Employed">Employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>

            <div className={style.labe}>
              <label className={style.lab}>City</label>
              <input
                type="text"
                name="city"
                value={updatedUser.city}
                onChange={handleChange}
                className={style.input}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className={style.labeInpu}>
            <div className={style.labe}>
              <label className={style.lab}>State</label>
              <input
                type="text"
                name="state"
                value={updatedUser.state}
                onChange={handleChange}
                className={style.input}
                disabled={!isEditing}
              />
            </div>

            <div className={style.labe}>
              <label className={style.lab}>Country</label>
              <input
                type="text"
                name="country"
                value={updatedUser.country}
                onChange={handleChange}
                className={style.input}
                disabled={!isEditing}
              />
            </div>
          </div> */}

          {/* Edit & Delete Buttons */}
          <div className={style.del}>
            {/* <div className={style.edit}>
              {isEditing ? (
                <button className={style.edits} onClick={handleSubmit}>
                  Save
                </button>
              ) : (
                <button
                  className={style.edits}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              )}
            </div> */}

            <button className={style.edi} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Transaction Tab */}
      {activeTab === "transactions" && (
        <div>
          <h3>Transactions</h3>
          <p>Transaction details will be fetched dynamically.</p>
        </div>
      )}

      {/* Document Tab */}
      {activeTab === "documents" && (
        <div>
          International / Primary Documents
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Upload Date</th>
                  <th>ID Type</th>
                  {/* <th>ID Number</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{updatedUser.createdAt?.split("T")[0] || "N/A"}</td>
                  <td>International Passport</td>
                  {/* <td>{updatedUser.businesskyc?.passportNumber}</td> */}
                  <td>
                    <button
                      className={style.edi}
                      onClick={() =>
                        handleViewDocument(
                          updatedUser.businesskyc?.passportFile,
                          "International-Document"
                        )
                      }
                    >
                      View More
                    </button>
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
          <br /> <br />
          Local / Secondary Documents
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Upload Date</th>
                  <th>ID Type</th>
                  {/* <th>ID Number</th> */}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{updatedUser.createdAt?.split("T")[0] || "N/A"}</td>

                  <td>Valid Means of ID</td>
                  {/* <td>{updatedUser.businesskyc?.idNum}</td> */}
                  <td>
                    <button
                      className={style.edi}
                      onClick={() =>
                        handleViewDocument(
                          updatedUser.businesskyc?.proofOfAddress,
                          "Local-Document"
                        )
                      }
                    >
                      View More
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            Certificate of Incorporation
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Upload Date</th>
                    <th>ID Type</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{updatedUser.createdAt?.split("T")[0] || "N/A"}</td>

                    <td>CAC</td>
                    <td>
                      <button
                        className={style.edi}
                        onClick={() =>
                          handleViewDocument(
                            updatedUser.businesskyc?.certificateIncorporation,
                            "Certificate"
                          )
                        }
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {showDocModal && (
            <div className={style.modalOverlay}>
              <div className={style.modalContents}>
                <div className={style.namTimes}>
                  <h3>{docName}</h3>
                  <button
                    className={style.closeBtn}
                    onClick={() => setShowDocModal(false)}
                  >
                    &times;
                  </button>
                </div>

                {/* PDF or Image Preview */}
                {docUrl?.endsWith(".pdf") ? (
                  <iframe src={docUrl} width="100%" height="500px" />
                ) : (
                  <img src={docUrl} alt="Document Preview" width="100%" />
                )}

                <button className={style.downloadBtn} onClick={handleDownload}>
                  📥 Download
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* businessKYC Tab */}
      {activeTab === "businesskyc" && (
        <div>
          <div className={style.detailBox}>
            <div className={style.two}>
              <p>Purpose of Account:</p>
              <p className={style.one}>{updatedUser.businesskyc?.purposeAcc}</p>
            </div>

            <div className={style.two}>
              <p>Country of International Password Issue:</p>
              <p className={style.one}>
                {updatedUser.businesskyc?.passportCountry}
              </p>
            </div>

            <div className={style.two}>
              <p>Country of Local Issue:</p>
              <p className={style.one}>{updatedUser.businesskyc?.idCountry}</p>
            </div>

            <div className={style.two}>
              <p>BVN:</p>
              <p className={style.one}>{updatedUser.businesskyc?.bvn}</p>
            </div>

            <div className={style.two}>
              <p>Sources of Funds:</p>
              <p className={style.one}>{updatedUser.businesskyc?.source}</p>
            </div>

            <div className={style.two}>
              <p>Expected Monthly Inflow:</p>
              <p className={style.one}>{updatedUser.businesskyc?.inflow}</p>
            </div>
          </div>
          <div className={style.del}>
            <button className={style.edi} onClick={handleApprove}>
              Approved
            </button>

            <button
              className={style.edi}
              onClick={() => setShowRejectModal(true)}
            >
              Reject
            </button>
          </div>

          {/* Rejection Modal */}
          {showRejectModal && (
            <div className={style.modalBackdrop}>
              <div className={style.modalContent}>
                <h3>Rejection Note</h3>

                <label>Reason for Decline</label>
                <input
                  type="text"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="e.g. The document is blurry. Please upload a clearer version."
                />

                <div className={style.modalActions}>
                  <button
                    className={style.edi}
                    onClick={() => {
                      handleReject(); // only fires if reason is valid
                      setShowRejectModal(false);
                    }}
                  >
                    Confirm Reject
                  </button>
                  <button
                    className={style.cancel}
                    onClick={() => setShowRejectModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}   

      {/* {activeTab === "sub-account" && (
            <div>
              <SubAccounts
                userId={selectedUserId} // pass from context or props
                onSelectSubAccount={(account) => {
                  setSelectedSubAccount(account);
                  setSubViewMode("detail");
                  setView("default");
                }}
              />
            </div>
          )}

      {view === "default" && selectedSubAccount && (
        <div className={style.detailContainer}>
          <button onClick={handleBackToDashboard} className={style.plusE}>
            ← Back to Table
          </button>

          <div className={style.busSub}>
            <div>
              <p>
                <strong>{selectedSubAccount.subName}</strong>
              </p>
              <p>{selectedSubAccount.subEmail}</p>
            </div>
          </div>

          <div className={style.tabButtons}>
            <button
              className={style.btn5}
              onClick={() => setSubViewMode("detail")}
            >
              Details
            </button>

            <button
              className={style.btn2}
              onClick={() => setSubViewMode("transaction")}
            >
              Transactions
            </button>
          </div>

       //Detail
          {subViewMode === "detail" && (
            <div className={style.detailBox}>
              <div className={style.two}>
                <p>Account Email:</p>
                <p className={style.one}>{selectedSubAccount.subEmail}</p>
              </div>
              <div className={style.two}>
                <p>Account Password:</p>
                <p className={style.one}>{selectedSubAccount.subPass}</p>
              </div>
              <div className={style.two}>
                <p>Business Name:</p>
                <p className={style.one}>{selectedSubAccount.subName}</p>
              </div>
              <div className={style.two}>
                <p>Business Type:</p>
                <p className={style.one}>{selectedSubAccount.businessType}</p>
              </div>
              <div className={style.two}>
                <p>Industry:</p>
                <p className={style.one}>{selectedSubAccount.industry}</p>
              </div>
              <div className={style.two}>
                <p>Status:</p>
                <p className={style.one}>{selectedSubAccount.busKycStatus}</p>
              </div>
              <div className={style.two}>
                <p>Created:</p>
                <p className={style.one}>
                  {new Date(selectedSubAccount.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}

       //Transactions
          {subViewMode === "transaction" && (
            <div>
              <div className={style.busSubT}>
                <p>
                  <strong>{selectedSubAccount.subName}</strong>
                </p>
                <p>{selectedSubAccount.subEmail}</p>
              </div>

              <div className={style.transactionBox}>
                <SubAccountTransaction
                  subId={selectedSubAccount.subaccountId}
                />
              </div>
            </div>
          )}
        </div>
      )} */}

{activeTab === "sub-account" && (
  <>
    {view === "default" && !selectedSubAccount && (
      <div>
        <SubAccounts
          userId={selectedUserId}
          username={user.busName}
          onSelectSubAccount={(account) => {
            setSelectedSubAccount(account);
            setSubViewMode("detail");
            setView("detail");
          }}
        />
      </div>
    )}

    {view === "detail" && selectedSubAccount && (
      <div className={style.detailContainer}>
        <button onClick={handleBackToDashboard} className={style.plusE}>
          ← Back to Table
        </button>

        <div className={style.busSub}>
          <div>
            <p>
              <strong>{selectedSubAccount.subName}</strong>
            </p>
            <p>{selectedSubAccount.subEmail}</p>
          </div>
        </div>

        <div className={style.tabButtons}>
          <button
            className={style.btn5}
            onClick={() => setSubViewMode("detail")}
          >
            Details
          </button>

          <button
            className={style.btn2}
            onClick={() => setSubViewMode("transaction")}
          >
            Transactions
          </button>
        </div>

        {subViewMode === "detail" && (
          <div className={style.detailBox}>
            <div className={style.two}>
              <p>Account Email:</p>
              <p className={style.one}>{selectedSubAccount.subEmail}</p>
            </div>
            <div className={style.two}>
              <p>Account Password:</p>
              <p className={style.one}>{selectedSubAccount.subPass}</p>
            </div>
            <div className={style.two}>
              <p>Business Name:</p>
              <p className={style.one}>{selectedSubAccount.subName}</p>
            </div>
            <div className={style.two}>
              <p>Business Type:</p>
              <p className={style.one}>{selectedSubAccount.businessType}</p>
            </div>
            <div className={style.two}>
              <p>Industry:</p>
              <p className={style.one}>{selectedSubAccount.industry}</p>
            </div>
            <div className={style.two}>
              <p>Status:</p>
              <p className={style.one}>{selectedSubAccount.busKycStatus}</p>
            </div>
            <div className={style.two}>
              <p>Created:</p>
              <p className={style.one}>
                {new Date(selectedSubAccount.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {subViewMode === "transaction" && (
          <div>
            <div className={style.busSubT}>
              <p>
                <strong>{selectedSubAccount.subName}</strong>
              </p>
              <p>{selectedSubAccount.subEmail}</p>
            </div>

            <div className={style.transactionBox}>
              <SubAccountTransaction
                subId={selectedSubAccount.subaccountId}
              />
            </div>
          </div>
        )}
      </div>
    )}
  </>
)}

    </div>
  );
}

export default AdminBusiness;
