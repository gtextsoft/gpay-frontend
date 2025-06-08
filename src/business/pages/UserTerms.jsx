import SideBar from "../components/UserSideBar";
import UserHeader from "../components/UserHeader";
import style from "../../styles/TC.module.css";
function UserTerm() {
  return (
    <>
      <div className={style.componentContent}>
        <SideBar />

        <div className={style.headerContent}>
          <UserHeader />

          <div className={style.outlines}>
            <div className={style.content}>
              <p className={style.head}>1. Introduction</p>
              <p>
                Welcome to GVest. By using our website and services, you agree
                to comply with these Terms and Conditions. Please read them
                carefully before accessing or using our platform.
              </p>

              <h2 className={style.head}>2. Definitions</h2>
              <p>
                - Company: Refers to GText, its subsidiaries, affiliates, and
                employees.
              </p>
              <p>
                - User: Refers to any person accessing or using the website or
                services.
              </p>
              <p>
                - Services: Refers to the investment opportunities, real estate
                listings, and other services provided by GText.
              </p>

              <p className={style.head}>3. Eligibility</p>
              <p>
                You must be at least 18 years old to use our services. By
                accessing the website, you confirm that you meet this age
                requirement.
              </p>

              <p className={style.head}>4. Use Of Service</p>
              <p>
                You agree to use our services solely for lawful purposes. Any
                unauthorized use of the platform, such as fraudulent activity or
                misuse of data, is strictly prohibited.
              </p>

              <p className={style.head}>5. Payments and Transactions</p>
              <p>
                All transactions are processed securely. By making a payment,
                you agree to our terms for refunds and cancellations as detailed
                on the relevant service page.
              </p>

              <p className={style.head}>6. Intellectual Property</p>
              <p>
                All content on our website, including text, graphics, logos, and
                images, is the property of GVest and is protected by copyright
                laws. Unauthorized use of this content is prohibited.
              </p>

              <p className={style.head}>7. Limitation of Liability</p>
              <p>
                GText is not liable for any indirect, incidental, or
                consequential damages resulting from the use of our services or
                platform.
              </p>

              <p className={style.head}>8. Termination</p>
              <p>
                We reserve the right to suspend or terminate your access to our
                services if you violate these terms.
              </p>

              <p className={style.head}>9. Governing Law</p>
              <p>
                These terms are governed by the laws of [Your Jurisdiction]. Any
                disputes will be resolved exclusively in [Your Jurisdiction].
              </p>

              <p className={style.head}>10. Changes to Terms</p>
              <p>
                We may update these Terms and Conditions at any time. Please
                review them periodically to stay informed.
              </p>

              <p className={style.head}>11. Contact</p>
              <p>
                If you have any questions about these terms, please contact us
                at info@gvest.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserTerm;
