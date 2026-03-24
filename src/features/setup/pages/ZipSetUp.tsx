import { useNavigate } from "react-router-dom";
import { useUpdateZip } from "../api/setup.mutations";
import { SetupProgress } from "../components/SetupProgress";
import { useSetupField } from "../hooks/useSetupField";
import "../styles/SetUp.css";

export const ZipSetUp = () => {
  const navigate = useNavigate();
  const [zip, setZip] = useSetupField("setup_zip");
  const { mutate, isPending, error } = useUpdateZip();

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 5);
    setZip(
      digits.length > 3 ? `${digits.slice(0, 3)} ${digits.slice(3)}` : digits,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(zip.replace(/\s/g, ""), {
      onSuccess: () => navigate("/setup/referral"),
    });
  };

  return (
    <div className="setup-page">
      <div className="setup-card">
        <SetupProgress />
        <h1 className="setup-title">Ditt postnummer</h1>
        <p className="setup-description">
          Ditt postnummer behövs för att vi ska kunna matcha dig med enkäter.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="setup-input"
            type="text"
            inputMode="numeric"
            placeholder="123 45"
            maxLength={6}
            value={zip}
            onChange={handleZipChange}
            autoFocus
            required
          />
          {error && <p className="setup-error">{error.message}</p>}
          <button className="setup-btn" type="submit" disabled={isPending}>
            {isPending ? "Sparar..." : "Fortsätt"}
          </button>
        </form>
      </div>
    </div>
  );
};
