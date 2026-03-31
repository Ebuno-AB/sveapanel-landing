import "./AuthFooter.css";
import logoImg from "@/assets/icons/logo.png";

export const AuthFooter = () => {
  return (
    <footer className="auth-footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <img src={logoImg} alt="SveaPanelen" />
          <span>SveaPanelen</span>
        </div>
        <div className="footer-copyright">
          <span>
            © {new Date().getFullYear()} SveaPanelen. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
