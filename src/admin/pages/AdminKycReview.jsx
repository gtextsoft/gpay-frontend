import { useEffect, useState } from "react";

function AdminKycReview() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [userKycData, setUserKycData] = useState(null);
  const [role, setRole] = useState(null); // 'individual' | 'business'
  const [usersLoading, setUsersLoading] = useState(true);
  const [kycLoading, setKycLoading] = useState(false);
  const [error, setError] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("adminAuthToken");

  // Fetch all users for both individual and business
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsersLoading(true);
        const [indRes, busRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/kyc/review`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/api/kyc/bus/review`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const [indData, busData] = await Promise.all([
          indRes.json(),
          busRes.json(),
        ]);

        const merged = [
          ...indData.map((u) => ({ ...u, role: "individual" })),
          ...busData.map((u) => ({ ...u, role: "business" })),
        ];

        setUsers(merged);
      } catch (err) {
        setError(err.message);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch KYC details when a user is selected
  useEffect(() => {
    if (!selectedUserId || !role) return;

    const fetchKycData = async () => {
      setKycLoading(true);
      try {
        const url =
          role === "individual"
            ? `${API_BASE_URL}/api/kyc/admin/${selectedUserId}`
            : `${API_BASE_URL}/api/kyc/bus/admin/${selectedUserId}`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        const data = await res.json();
        setUserKycData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setKycLoading(false);
      }
    };

    fetchKycData();
  }, [selectedUserId, role]);

  const handleApprove = async () => {
    if (!window.confirm("Approve this KYC submission?")) return;

    try {
      setActionLoading(true);

      const url =
        role === "individual"
          ? `${API_BASE_URL}/api/kyc/approve/${selectedUserId}`
          : `${API_BASE_URL}/api/kyc/bus/approve/${selectedUserId}`;

      const res = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error(`Approve failed: ${res.status}`);
      alert("KYC approved successfully.");
      setRejectReason("");
      setKycLoading(false);

      // Refetch updated KYC data
      const refreshUrl =
        role === "individual"
          ? `${API_BASE_URL}/api/kyc/admin/${selectedUserId}`
          : `${API_BASE_URL}/api/kyc/bus/admin/${selectedUserId}`;

      const updatedRes = await fetch(refreshUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedData = await updatedRes.json();
      setUserKycData(updatedData);

      setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));
      setSelectedUserId(null);
      setUserKycData(null);
      setRole(null);
    } catch (err) {
      alert("Error approving KYC: " + err.message);
    } finally {
      setActionLoading(false);
      setKycLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }
    if (!window.confirm("Reject this KYC submission?")) return;

    try {
      setActionLoading(true);

      const url =
        role === "individual"
          ? `${API_BASE_URL}/api/kyc/reject/${selectedUserId}`
          : `${API_BASE_URL}/api/kyc/bus/reject/${selectedUserId}`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rejectionReason: rejectReason }),
      });

      if (!res.ok) throw new Error(`Reject failed: ${res.status}`);
      alert("KYC rejected successfully.");

      const refreshUrl =
        role === "individual"
          ? `${API_BASE_URL}/api/kyc/admin/${selectedUserId}`
          : `${API_BASE_URL}/api/kyc/bus/admin/${selectedUserId}`;

      const updatedRes = await fetch(refreshUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedData = await updatedRes.json();
      setUserKycData(updatedData);
      setRejectReason("");
      setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));
      setSelectedUserId(null);
      setUserKycData(null);
      setRole(null);
    } catch (err) {
      alert("Error rejecting KYC: " + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  if (usersLoading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
      <h2>Pending KYC Approvals</h2>

      {users.map((user) => (
        <div key={user._id} className="border-b pb-2 mb-2">
        
          <p>
            {user.role === "business"
              ? user.businesskyc?.busName
              : user.kyc?.username}
          </p>

          <p>Email: {user.email}</p>
          <p>
            Status:{" "}
            {user.role === "business"
              ? user.businesskyc?.status
              : user.kyc?.status}
          </p>

          <button
            className="text-blue-600 underline"
            onClick={() => {
              setSelectedUserId(user._id);
              setRole(user.role);
            }}
          >
            Review
          </button>
        </div>
      ))}

      {selectedUserId && (
        <>
          <h2 className="text-xl font-bold mb-4">
            KYC Review for User {selectedUserId}
          </h2>

          {kycLoading ? (
            <p>Loading KYC data...</p>
          ) : !userKycData ? (
            <p>No KYC data found.</p>
          ) : (
            <>
              <pre className="bg-gray-100 p-4 rounded mb-4 overflow-auto max-h-[400px]">
                {JSON.stringify(userKycData, null, 2)}
              </pre>

              <textarea
                placeholder="Enter rejection reason here"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                rows={3}
                disabled={actionLoading}
              />

              <div className="flex space-x-4">
                <button
                  onClick={handleApprove}
                  disabled={actionLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  {actionLoading ? "Processing..." : "Approve"}
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  {actionLoading ? "Processing..." : "Reject"}
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default AdminKycReview;
