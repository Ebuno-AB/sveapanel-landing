import { useNavigate } from "react-router-dom";
import { useSubmitReferral } from "../api/setup.mutations";
import { SetupProgress } from "../components/SetupProgress";
import { useSetupField } from "../hooks/useSetupField";
import "../styles/SetUp.css";

export const ReferralSetUp = () => {
  const navigate = useNavigate();
  const [code, setCode] = useSetupField("setup_referral");
  const { mutate, isPending, error } = useSubmitReferral();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(code, {
      onSuccess: () => navigate("/setup/join-reason"),
    });
  };

  const handleSkip = () => navigate("/setup/join-reason");

  return (
    <div className="setup-page">
      <div className="setup-card">
        <SetupProgress />
        <h1 className="setup-title">Har du blivit inbjuden?</h1>
        <p className="setup-description">Skriv in koden (5 tecken).</p>
        <form onSubmit={handleSubmit}>
          <input
            className="setup-input"
            type="text"
            placeholder="inbjudningskod"
            maxLength={5}
            value={code}
            autoFocus
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          {error && <p className="setup-error">{error.message}</p>}
          <button
            className="setup-btn"
            type="submit"
            disabled={isPending || code.length === 0}
          >
            {isPending ? "Sparar..." : "Använd kod"}
          </button>
        </form>
        <button className="setup-btn-skip" onClick={handleSkip}>
          Hoppa över
        </button>
      </div>
    </div>
  );
};
