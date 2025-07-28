import { useState } from "react";
import axios from "axios";

import style from "../styles/transactions.module.css";

const EditSubAccountForm = ({ subaccount, onCancel, onSuccess }) => {

    const [editData, setEditData] = useState({
      subName: subaccount.subName || "",
      subPass: subaccount.subPass || "",
    });
  
    const handleSubmit = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        await axios.put(
          `${API_BASE_URL}/api/subaccounts/update/${subaccount.subaccountId}`,
          editData
        );
        alert("Updated successfully");
        onSuccess();
      } catch (err) {
        alert("Update failed");
      }
    };
  
    return (
      <div className={style.editBox}>
        <h3>Edit Subaccount Info</h3>

        <div className={style.labInp}>
        <div className={style.lanp}>
        <label>Subaccount Name</label>
        <input
        className={style.inp}
          type="text"
          value={editData.subName}
          onChange={(e) =>
            setEditData({ ...editData, subName: e.target.value })
          }
        />
 </div>
<div className={style.lanp}>
        <label>Password</label>
        <input
          className={style.inp}
          type="text"
          value={editData.subPass}
          onChange={(e) =>
            setEditData({ ...editData, subPass: e.target.value })
          }
        />
        </div>
        </div>

        <button   className={style.buton} onClick={handleSubmit}>Submit</button>
        <button className={style.buton} onClick={onCancel}>Cancel</button>
      </div>
    );
  };
  

  export default EditSubAccountForm