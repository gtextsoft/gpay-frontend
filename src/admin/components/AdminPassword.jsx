import style from "../../user/styles/usernotification.module.css";
import { useNavigate } from "react-router-dom";

function Password() {
  const navigate = useNavigate();

  const handlePasswordClick = () => {
    navigate("/admin/settings"); // Navigate to the '/compound' page
  };

  const handleProfileClick = () => {
    navigate("/admin/password"); // Navigate to the '/compound' page
  };

  return (
    <div>
      <div className={style.set}>
        <div className={style.profilePassword}>
          <button className={style.password} onClick={handlePasswordClick}>
            Profile
          </button>
          <button className={style.profile} onClick={handleProfileClick}>
            Password
          </button>
        </div>

        <div className={style.pass}>
          <div className={style.labet}>
            <label className={style.lab} htmlFor="">
              Old Password
            </label>

            {/* <div className={style.inpu}> */}
              <input
                type="text"
                name=""
                id=""
                placeholder="my old password"
                className={style.input}
              />
            {/* </div> */}
          </div>

          <div className={style.labet}>
            <label className={style.lab} htmlFor="">
              New Password
            </label>

            {/* <div className={style.inpu}> */}
              <input
                type="text"
                name=""
                id=""
                placeholder="my new password"
                className={style.input}
              />
            {/* </div> */}
          </div>

          <div className={style.labet}>
            <label className={style.lab} htmlFor="">
              Confirm Password
            </label>

            {/* <div className={style.inpu}> */}
              <input
                type="text"
                name=""
                id=""
                placeholder="my new password"
                className={style.input}
              />
            {/* </div> */}
          </div>

          <div className={style.sav}>
            <button className={style.savt}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Password;
