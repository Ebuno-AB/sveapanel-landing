import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateEmail } from "../api/setup.mutations";
import { SetupProgress } from "../components/SetupProgress";
import { useSetupField } from "../hooks/useSetupField";
import "../styles/SetUp.css";

export const EmailSetUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useSetupField("setup_email");
  const [confirmEmail, setConfirmEmail] = useSetupField("setup_confirm_email");
  const [matchError, setMatchError] = useState("");
  const { mutate, isPending, error } = useUpdateEmail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email !== confirmEmail) {
      setMatchError("E-postadresserna matchar inte.");
      return;
    }
    setMatchError("");
    mutate(email, {
      onSuccess: () => navigate("/setup/zip"),
    });
  };

  return (
    <div className="setup-page">
      <div className="setup-card">
        <SetupProgress />
        <h1 className="setup-title">Din e-post</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="setup-input"
            type="email"
            placeholder="din@email.se"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            required
          />
          <input
            className="setup-input"
            type="email"
            placeholder="Bekräfta e-post"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            required
          />
          {matchError && <p className="setup-error">{matchError}</p>}
          {error && <p className="setup-error">{error.message}</p>}
          <button className="setup-btn" type="submit" disabled={isPending}>
            {isPending ? "Sparar..." : "Fortsätt"}
          </button>
        </form>
      </div>
    </div>
  );
};
