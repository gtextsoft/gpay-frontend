import Pages from "./components/Pages";
import { HeaderProvider } from "./context/HeaderContext";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import { KYCProvider } from "./context/KycContext";
import { AdminProvider } from "./context/AdminContext";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import { NotificationProvider } from "./components/NotificationContext";

// Initialize Stripe with your publishable key
// const stripePromise = loadStripe(import.meta.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <div>
      <HeaderProvider>
        <KYCProvider>
          <UserProvider>
          <AdminProvider>
          <Router>
            {/* Wrap your application with the Elements provider */}
            {/* <Elements stripe={stripePromise}> */}
            <Pages />
            {/* </Elements> */}
          </Router>
          </AdminProvider>
          </UserProvider>
          {/* </NotificationProvider> */}
        </KYCProvider>
      </HeaderProvider>
    </div>
  );
}

export default App;
