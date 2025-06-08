import SideBar from "../components/UserSideBar";
import PaymentList from "../components/PaymentList";
import Upcoming from "../components/Upcoming";
import TotalInvestment from "../components/TotalInvestment";
import TotalInvestedAmount from "../components/TotalInvestedAmount";
import TotalMonthlyInterest from "../components/TotalMonthlyInterest";

import Welcome from "../components/Welcome";
import IndIdentify from "../components/IndIdentify";
import IndIdentify2 from "../components/IndIdentify2";
import IndIdentify3 from "../components/IndIdentify3";
import IndIdentify4 from "../components/IndIdentify4";
import IndIdentify5 from "../components/IndIdentify5";
import IndIdentify6 from "../components/IndIdentify6";
import IndIdentify7 from "../components/IndIdentify7";
import UserHeader from "../components/UserHeader";
import style from "../styles/userdashboard.module.css";
import Overview from "../components/Overview";
import WalletDash from "../components/WalletDash";
import Invest from "../components/Invest";

function UserDashboard() {
  // const [investments] = useState({
  //   propertyInvestments: [],
  //   investmentSchemes: [],
  // });

  // useEffect(() => {
  //   const fetchInvestments = async () => {
  //     try {
  //       const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  //       const token = localStorage.getItem("userAuthToken");
  //       const username = localStorage.getItem("userUsername");

  //       if (!username) {
  //         throw new Error("User name not found in localStorage");
  //       }

  //       const response = await axios.get(
  //         `${API_BASE_URL}/user/user-investments/${username}`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       console.log("Fetched Investments:", response.data);
  //       setInvestments(response.data);
  //     } catch (error) {
  //       console.error("Error fetching investments", error);
  //     }
  //   };

  //   fetchInvestments();
  // }, []);

  // ✅ Calculate totals

  // const totalInvestmentAmount =
  //   investments.propertyInvestments.reduce(
  //     (sum, inv) => sum + (inv.amountPaid ?? 0),
  //     0
  //   ) +
  //   investments.investmentSchemes.reduce(
  //     (sum, inv) => sum + (inv.amountPaid ?? 0),
  //     0
  //   );

  // const totalMonthlyInterest = investments.investmentSchemes.reduce(
  //   (sum, inv) => sum + (inv.roi ?? 0),
  //   0
  // );

  // const totalInvestments =
  //   investments.propertyInvestments.length +
  //   investments.investmentSchemes.length;

  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outline}>
            <p className={style.dollar}>
              Dollar Account
              <span class="material-symbols-outlined">keyboard_arrow_down</span>
            </p>
            <div className={style.investTotal}>
              <TotalInvestment />
              <TotalInvestedAmount />
              <TotalMonthlyInterest />
            </div>

            <div className={style.overWallet}>
              <Overview />
              <WalletDash />
            </div>

            <div className={style.invest}>
              <Invest
                Unlimited=" Unlimited Cashbank"
                Instant="Instant 20% back on your investment"
                Now=" Invest Now"
                Outline="outline1"
              />
              <Invest
                Unlimited="Donate Today"
                Instant=" Change a Life Give Hope, Get Impact Instantly"
                Now=" Donate Now"
                Outline="outline2"
              />
            </div>

            {/* <div className={style.overcome}>
              <Upcoming />
            </div> */}

            <PaymentList />

            <Welcome />
            <IndIdentify />
            <IndIdentify2 />
            <IndIdentify3 />
            <IndIdentify4 />
            <IndIdentify5 />
            <IndIdentify6 />
            <IndIdentify7 />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
