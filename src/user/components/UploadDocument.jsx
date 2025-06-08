import style from "../styles/addinvest.module.css";
import { useState } from "react";
import axios from "axios";

const UserUploadDocument = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState(""); // The user's username
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !title || !description || !username) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("username", username);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${API_BASE_URL}/user/document`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error uploading document.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.postDocumentContainer}>
      <h2>User Upload Document</h2>
      <form action="" className={style.documentForm}>
      <input type="text" placeholder="Your Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
      {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default UserUploadDocument;
