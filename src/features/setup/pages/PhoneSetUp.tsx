import { useNavigate } from "react-router-dom";
import { useUpdateSwish } from "../api/setup.mutations";
import { SetupProgress } from "../components/SetupProgress";
import { useSetupField } from "../hooks/useSetupField";
import "../styles/SetUp.css";

const formatPhone = (value: string): string => {
  if (value.startsWith("+")) {
    return "+" + value.slice(1).replace(/\D/g, "");
  }
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 8)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)} ${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)} ${digits.slice(6, 8)} ${digits.slice(8, 10)}`;
};

export const PhoneSetUp = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useSetupField("setup_phone");
  const { mutate, isPending, error } = useUpdateSwish();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(phone, {
      onSuccess: () => navigate("/setup/email"),
    });
  };

  return (
    <div className="setup-page">
      <div className="setup-card">
        <SetupProgress />
        <h1 className="setup-title">Ditt Swish-nummer</h1>
        <p className="setup-description">
          Vi behöver ditt telefonummer kopplat till Swish för att du ska kunna
          ta ut pengar. Om du har utlänkst nummer så ange med landskod (t.ex
          +47).
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="setup-input"
            type="tel"
            placeholder="070-123 45 67"
            value={phone}
            onChange={handlePhoneChange}
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
