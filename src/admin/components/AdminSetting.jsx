import style from "../../user/styles/usernotification.module.css";
import { useNavigate } from "react-router-dom";

function Setting() {
    const navigate = useNavigate();
    
    const handlePasswordClick = () => {
        navigate("/admin/settings"); // Navigate to the '/compound' page
      };

    const handleProfileClick = () => {
        navigate("/admin/password");  // Navigate to the '/compound' page
      };
  return (
    <div>
      <div className={style.set}>
        <div className={style.profilePassword}>
          <button className={style.profile} onClick={handlePasswordClick}>Profile</button>
          <button className={style.password} onClick={handleProfileClick}>Password</button>
        </div>

        <div className={style.imageText}>
          <img src="/images/gVestLogo.png" alt="profile" className={style.prof} />

          <div className={style.texts}>
            <p className={style.text1}>Wade Wrren</p>
            <p className={style.text2}>wadeweren@gmail.com</p>
          </div>
        </div>

        <div className={style.edit}>
          <button className={style.edits}>Edit</button>
          <p>edit</p>
        </div>

        <div className={style.labeInpu}>
          <div className={style.labe}>
            <label className={style.lab} htmlFor="">Phone Number</label>
            <input
              type="number"
              name=""
              id=""
              placeholder="+111-12121212121"
              className={style.input}
            />
          </div>

          <div className={style.labe}>
            <label className={style.lab} htmlFor="">Gender</label>
            <select name="" id="" className={style.input}>
              <option value="">Male</option>
              <option value="">Female</option>
            </select>
          </div>
        </div>

        <div className={style.labeInpu}>
        <div className={style.labe}>
          <label className={style.lab} htmlFor="">Marital status</label>
          <select name="" id="" className={style.input}>
            <option value="">Single</option>
            <option value="">Married</option>
          </select>
        </div>

        <div className={style.labe}>
          <label className={style.lab} htmlFor="">Date of Birth</label>
          <input
            type="date"
            name=""
            id=""
            placeholder="01/01/2025"
            className={style.input}
          />
        </div>
        </div>

        <div className={style.labeInpu}>
        <div className={style.labe}>
          <label className={style.lab} htmlFor="">Emploment Status</label>
          <select name="" id="" className={style.input}>
            <option value="">Employed</option>
            <option value="">Female</option>
          </select>
        </div>

        <div className={style.labe}>
          <label className={style.lab} htmlFor="">City</label>
          <select name="" id="" className={style.input}>
          <option value="">Lekki</option>
          <option value="">Female</option>
        </select>
        </div>
        </div>

        <div className={style.labeInpu}>
      <div className={style.labe}>
        <label className={style.lab} htmlFor="">Status</label>
        <select name="" id="" className={style.input}>
          <option value="">Lagos</option>
          <option value="">Female</option>
        </select>
      </div>

      <div className={style.labe}>
        <label className={style.lab} htmlFor="">Country</label>
        <select name="" id="" className={style.input}>
          <option value="">Nigeria</option>
          <option value="">Congo</option>
        </select>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Setting;
