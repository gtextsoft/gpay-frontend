import {NavLink, useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { useHeader } from "../../context/HeaderContext";
import style from '../styles/sidebar.module.css'

function AdminSideBar() {
  const { setHeaderTitle } = useHeader();
  const navigate = useNavigate();
  const handleLinkClick = (title) => {
    setHeaderTitle(title);
  };

  const handleLogout = () => {
    // Clear the user session from sessionStorage
    sessionStorage.removeItem("adminUsername");
    sessionStorage.removeItem("adminAuthToken");

    // Optionally, show a toast or alert
    toast.success("You have successfully logged out.");

    // Redirect to login page
    navigate("/login");
  };

  return <div className={style.bar}>
    
  <img src="/images/GPay.png" alt="gpay" className={style.logos}/>
   
    <nav className={style.sideHeader}>
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />

                <ul className={style.navUl1}>
                    <li className={style.navLi} ><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/admin/dashboard' onClick={() => handleLinkClick("Dashboard")}><span class="material-symbols-outlined">grid_view</span><span>Dashboard</span></NavLink></li>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/admin/individuals' onClick={() => handleLinkClick("Individuals")}><span class="material-symbols-outlined">account_balance_wallet</span> <span>Individuals</span></NavLink></li>
                    <li className={style.navLi}><NavLink   className={({ isActive }) => (isActive ? style.active : "")} to='/admin/businesses' onClick={() => handleLinkClick("Businesses")}><span class="material-symbols-outlined">monitoring</span> <span>Businesses</span></NavLink></li>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/admin/transactions' onClick={() => handleLinkClick("Transactions")}><span class="material-symbols-outlined">business_center</span> <span>Transactions</span></NavLink></li>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/admin/notification' onClick={() => handleLinkClick("Notification")}><span class="material-symbols-outlined">notifications</span> <span>Notification</span></NavLink></li>
                   </ul>

                    <ul className={style.navUl2}>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/admin/settings' onClick={() => handleLinkClick("Setting")}><span class="material-symbols-outlined">settings</span> <span>Settings</span></NavLink></li>
                    <li className={style.navLi}><NavLink  className={({ isActive }) => (isActive ? style.active : "")} to='/admin/login'  onClick={handleLogout}><span class="material-symbols-outlined">logout</span> <span>Logout</span></NavLink></li>
                </ul>
            </nav>
 </div>;
}

export default AdminSideBar;
