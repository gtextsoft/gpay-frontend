import { Routes, Route } from "react-router-dom";
import { UserProvider } from "../context/UserContext.jsx";

import Register from "../pages/Register";
import Login from "../pages/Login";
import BusinessRegister from "../pages/BusinessRegister";

// User Import
import NotFound from "../pages/NotFound";
import Welcome from "../pages/Welcome";
import EmailSuccess from "../pages/EmailSuccess";
import PasswordSuccess from "../pages/PasswordSuccess";
import ForgotPassword from "../pages/ForgotPassword";
import UpdatePassword from "../pages/ResetPassword.jsx";
import EmailVerify from "../pages/EmailVerify";
import VerifyEmail from "../pages/VerifyEmail";
import TermsCondition from "../pages/TermsCondition.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx"

import UserDashboard from "../user/pages/UserDashboard";
import UserWallet from "../user/pages/UserWallet";
import UserFund from "../user/pages/UserFund.jsx";
import UserSavings from "../user/pages/UserSavings";
import UserTransactions from "../user/pages/UserTransactions";
import UserInvoice from "../user/pages/UserInvoice";
import UserDocuments from "../user/pages/UserDocuments";
import UserNotification from "../user/pages/UserNotification";
import UserTerms from "../user/pages/UserTerms";
import UserSetting from "../user/pages/UserSettings";
import UserPassword from "../user/pages/UserPassword";


import BusinessDashboard from "../business/pages/BusinessDashboard";
import BusinessWallet from "../business/pages/UserWallet";
import BusinessFund from "../business/pages/UserFund.jsx";
import BusinessSavings from "../business/pages/UserSavings";
import BusinessTransactions from "../business/pages/UserTransactions";
import BusinessInvoice from "../business/pages/UserInvoice";
import BusinessDocuments from "../business/pages/UserDocuments";
import BusinessNotification from "../business/pages/UserNotification";
import BusinessTerms from "../business/pages/UserTerms";
import BusinessSetting from "../business/pages/UserSettings";
import BusinessPassword from "../business/pages/UserPassword";
import IndIdentify from "../user/components/IndIdentify.jsx";


import AdminRegister from "../admin/pages/AdminRegister.jsx";
import AdminLogin from "../admin/pages/AdminLogin.jsx";
import AdminKycReview from "../admin/pages/AdminKycReview.jsx";


function Pages() {
  return (
    <div>
      <UserProvider>
        <Routes>
          {/* User Pages*/}
          <Route path="/" element={<Welcome />} />
          <Route path="/individual-register" element={<Register />} />
          <Route path="/business-register" element={<BusinessRegister />} />
          <Route path="/login" element={<Login />} />
       
          <Route path="/email-verify" element={<EmailVerify />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/email-success" element={<EmailSuccess />} />
          <Route path="/password-success" element={<PasswordSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<UpdatePassword />} />
          <Route path="/terms-condition" element={<TermsCondition/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/*" element={<NotFound />} />

          <Route path="/user/dashboard-individual" element={<UserDashboard />} />
          <Route path="/user/wallet" element={<UserWallet />} />
          <Route path="/user/fund-transfer" element={<UserFund />} />
          <Route path="/user/savings" element={<UserSavings />} />
          <Route path="/user/transactions" element={<UserTransactions />} />
          <Route path="/user/invoice" element={<UserInvoice />} />
          <Route path="/user/document" element={<UserDocuments />} />
          <Route path="/user/notification" element={<UserNotification />} />
          <Route path="/user/term" element={<UserTerms />} />
          <Route path="/user/setting" element={<UserSetting />} />
          <Route path="/user/password" element={<UserPassword />} />

          <Route path="/user/business-dashboard" element={<BusinessDashboard />} />
          <Route path="/user/business-wallet" element={<BusinessWallet />} />
          <Route path="/user/business-fund-transfer" element={<BusinessFund />} />
          <Route path="/user/business-savings" element={<BusinessSavings />} />
          <Route path="/user/business-transactions" element={<BusinessTransactions />} />
          <Route path="/user/business-invoice" element={<BusinessInvoice />} />
          <Route path="/user/business-document" element={<BusinessDocuments />} />
          <Route path="/user/business-notification" element={<BusinessNotification />} />
          <Route path="/user/business-term" element={<BusinessTerms />} />
          <Route path="/user/business-setting" element={<BusinessSetting />} />
          <Route path="/user/business-password" element={<BusinessPassword />} />
          
          <Route path="/dashboard/identify" element={<IndIdentify />} />

          {/* Admin Identify */}
          <Route path="/admin/kyc" element={<AdminKycReview />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

        </Routes>
      </UserProvider>
    </div>
  );
}

export default Pages;
