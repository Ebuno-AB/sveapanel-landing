import { useNavigate } from "react-router-dom";
import "../styles/SetUp.css";

export const WelcomeSetUp = () => {
  const navigate = useNavigate();

  return (
    <div className="setup-page">
      <div className="setup-card">
        <h1 className="setup-title">Välkommen!</h1>
        <p className="setup-description">
          Innan du kan börja behöver vi veta lite mer om dig, det tar bara någon
          minut.
        </p>
        <button className="setup-btn" onClick={() => navigate("/setup/phone")}>
          Nästa
        </button>
      </div>
    </div>
  );
};
