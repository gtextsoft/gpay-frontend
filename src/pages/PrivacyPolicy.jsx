// import Footer from "../components/reusables/Footer";
// import Header from "../components/reusables/Header";
import style from "../styles/tc.module.css";

function PrivacyPolicy() {
  return (
    <div>
      {/* <Header /> */}
      <div className={style.home}>
        <div className={style.homeText}>
          <p className={style.homeText1}>Privacy Policy</p>
        </div>
      </div>

      <div className={style.content}>
        <p className={style.head}>1. Introduction</p>
        <p>
          At GVest, we are committed to protecting your privacy. This policy
          explains how we collect, use, and protect your information.
        </p>

        <p className={style.head}>2. Information We Collect</p>
        <p className={style.para}>
          - Personal Information: Name, email address, phone number, and other
          details provided during registration or transactions.
        </p>
        <p>
         -  Usage Data: IP address, browser type, and activity on our platform.
        </p>
        <p>
          - Payment Information: Billing address and payment details, securely
          processed through third-party providers.
        </p>

        <p className={style.head}>3. How We Use Your Information</p>
        <p>- To provide and improve our services.</p>
        <p>
        - To communicate with you regarding your inquiries, transactions, or
          promotions.
        </p>
        <p> - To comply with legal obligations.</p>

        <p className={style.head}>4. Data Sharing</p>
        <p>
          We do not sell your personal information to third parties. However, we
          may share your data with:
        </p>
        <p> - Payment processors for transaction purposes.</p>
        <p> - Service providers to enhance our platform functionality.</p>
        <p> - Legal authorities, if required by law.</p>

        <p className={style.head}>5. Data Security</p>
        <p>
          We implement industry-standard security measures to protect your
          information. However, no method of transmission over the internet is
          entirely secure, and we cannot guarantee absolute security.
        </p>

        <p className={style.head}>6. Cookies</p>
        <p>
          Our website uses cookies to improve user experience. You can manage
          your cookie preferences through your browser settings.
        </p>

        <p className={style.head}>7. User Rights</p>
        <p>You have the right to:</p>
        <p> - Access the data we hold about you.</p>
        <p> - Request corrections to inaccurate data.</p>
        <p>
        -  Request deletion of your data, subject to legal and contractual
          obligations.
        </p>

        <p className={style.head}>8. Retention of Data</p>
        <p>
          We retain your information as long as necessary to provide our
          services and comply with legal obligations.
        </p>

        <p className={style.head}>9. Third-Party Links</p>
        <p>
          Our website may contain links to external sites. We are not
          responsible for the privacy practices of these sites.
        </p>

        <p className={style.head}>10. Changes to Privacy Policy</p>
        <p>
          We may update this policy periodically. Please review it regularly to
          stay informed.
        </p>

        <p className={style.head}>11. Contact</p>
        <p>
          For questions or concerns about this policy, please contact us at
          info@gvest.com or +234 - 8123232323.
        </p>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default PrivacyPolicy;
