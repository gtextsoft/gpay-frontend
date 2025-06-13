import Pages from "./components/Pages";
import { HeaderProvider } from "./context/HeaderContext";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
import { KYCProvider } from "./context/KycContext";
import { BusKYCProvider } from "./context/BusKycContext";
import { AdminProvider } from "./context/AdminContext";

function App() {
  return (
    <div>
      <HeaderProvider>
          <BusKYCProvider>
        <KYCProvider>
            <UserProvider>
              <AdminProvider>
                <Router>
                  <Pages />
                </Router>
              </AdminProvider>
            </UserProvider>
        </KYCProvider>
          </BusKYCProvider>
      </HeaderProvider>
    </div>
  );
}

export default App;
