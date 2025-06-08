import {NavLink, useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { useHeader } from "../../context/HeaderContext";
import style from '../styles/sidebar.module.css'

function UserSideBar() {
  const { setHeaderTitle } = useHeader();
  const navigate = useNavigate();
  const handleLinkClick = (title) => {
    setHeaderTitle(title);
  };

  const handleLogout = () => {
    // Clear the user session from localStorage
    localStorage.removeItem("userUsername");
    localStorage.removeItem("userAuthToken");

    // Optionally, show a toast or alert
    toast.success("You have successfully logged out.");

    // Redirect to login page
    navigate("/login");
  };

  return <div className={style.bar}>
    
    {/* <img src='/images/gVestLogo.png' alt="img" className={style.logos}/> */}
    <img src="/images/GPay.png" alt="gpay" className={style.logos}/>
   
    <nav className={style.sideHeader}>
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

                <ul className={style.navUl1}>
                    <li className={style.navLi} ><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/user/dashboard-individual' onClick={() => handleLinkClick("Dashboard")}><span class="material-symbols-outlined">grid_view</span><span>Dashboard</span></NavLink></li>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/user/wallet' onClick={() => handleLinkClick("Wallet")}><span class="material-symbols-outlined">account_balance_wallet</span> <span>Wallet</span></NavLink></li>
                    <li className={style.navLi}><NavLink   className={({ isActive }) => (isActive ? style.active : "")} to='/user/fund-transfer' onClick={() => handleLinkClick("Fund Transfer")}><span class="material-symbols-outlined">apartment</span> <span>Fund Transfer</span></NavLink></li>
                    <li className={style.navLi}><NavLink   className={({ isActive }) => (isActive ? style.active : "")} to='/user/savings' onClick={() => handleLinkClick("Savings")}><span class="material-symbols-outlined">monitoring</span> <span>Savings</span></NavLink></li>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/user/transactions' onClick={() => handleLinkClick("Transaction")}><span class="material-symbols-outlined">business_center</span> <span>Transactions</span></NavLink></li>
                    <li className={style.navLi}><NavLink   className={({ isActive }) => (isActive ? style.active : "")} to='/user/invoice' onClick={() => handleLinkClick("Invoice")}><span class="material-symbols-outlined">monitoring</span> <span>Invoice</span></NavLink></li>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/user/document' onClick={() => handleLinkClick("Document")}><span class="material-symbols-outlined">sticky_note_2</span> <span>Documents</span></NavLink></li>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/user/notification' onClick={() => handleLinkClick("Notification")}><span class="material-symbols-outlined">notifications</span> <span>Notification</span></NavLink></li>
                    {/* <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/user/news'><span class="material-symbols-outlined">rss_feed</span> <span>News</span></NavLink></li> */}
                    </ul>

                    <ul className={style.navUl2}>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/user/term' onClick={() => handleLinkClick("Term")}><span class="material-symbols-outlined">sticky_note_2</span> <span>Terms & Conditions</span></NavLink></li>
                    <li className={style.navLi}><a href="https://wa.me/2348142590965" target="_blank" rel="noopener noreferrer" className={style.navLink} onClick={() => handleLinkClick("Help")}><span className="material-symbols-outlined">help</span><span>Help</span></a></li>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/user/setting' onClick={() => handleLinkClick("Setting")}><span class="material-symbols-outlined">settings</span> <span>Settings</span></NavLink></li>
                    {/* <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/user/help' onClick={() => handleLinkClick("Help")}><span class="material-symbols-outlined">help</span> <span>Help</span></NavLink></li> */}
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/login'  onClick={handleLogout}><span class="material-symbols-outlined">logout</span> <span>Logout</span></NavLink></li>
                </ul>
            </nav>
 </div>;
}

export default UserSideBar;
