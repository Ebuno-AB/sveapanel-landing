import { useLocation, useNavigate } from "react-router-dom";

const STEPS = [
  "/setup/phone",
  "/setup/email",
  "/setup/zip",
  "/setup/referral",
  "/setup/join-reason",
];

export const SetupProgress = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const currentStep = STEPS.indexOf(pathname);

  return (
    <div className="setup-progress-wrapper">
      {currentStep > 0 && (
        <button
          className="setup-back-btn"
          onClick={() => navigate(STEPS[currentStep - 1])}
          aria-label="Gå tillbaka"
        >
          &#8592;
        </button>
      )}
      <div className="setup-progress">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`setup-progress-dot${i === currentStep ? " active" : i < currentStep ? " done" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};
