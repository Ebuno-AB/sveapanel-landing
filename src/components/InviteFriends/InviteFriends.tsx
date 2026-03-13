import { useState } from "react";
import { Copy, Check } from "lucide-react";
import QRCode from "react-qr-code";
import "./InviteFriends.css";

const REFERRAL_CODE = "38173";
const REFERRAL_LINK = `https://sveapanelen.se/join/${REFERRAL_CODE}`;

const steps = [
  {
    number: 1,
    title: "Bjud in din kompis",
    description:
      "Dela din länk eller din kod till din kompis som de kan när de registrerar sig hos Sveapanelen.",
  },
  {
    number: 2,
    title: "Dina kompisar shoppar",
    description:
      "Vi håller sedan koll på vilka av dina inbjudna vänner har gjort ett köp med Sveapanelen cashback.",
  },
  {
    number: 3,
    title: "Bli belönad",
    description:
      "När din kompis har samlat in 100kr i cashback får ni båda en belöning.",
  },
];

export const InviteFriends = () => {
  const [copiedField, setCopiedField] = useState<"code" | "link" | null>(null);

  const handleCopy = (text: string, field: "code" | "link") => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="invite-friends">
      <h2 className="invite-friends__title">Bjud in vänner</h2>

      <div className="invite-friends__steps">
        {steps.map((step) => (
          <div key={step.number} className="invite-friends__step-card">
            <div className="invite-friends__step-number">{step.number}</div>
            <h3 className="invite-friends__step-title">{step.title}</h3>
            <p className="invite-friends__step-description">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="invite-friends__share">
        <div className="invite-friends__info-box">
          <div className="invite-friends__info-row">
            <span className="invite-friends__info-label">Kod</span>
            <span className="invite-friends__info-value">{REFERRAL_CODE}</span>
            <button
              className={`invite-friends__copy-btn${copiedField === "code" ? " invite-friends__copy-btn--copied" : ""}`}
              onClick={() => handleCopy(REFERRAL_CODE, "code")}
              aria-label="Kopiera kod"
              title={copiedField === "code" ? "Kopierad!" : "Kopiera"}
            >
              {copiedField === "code" ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
          <div className="invite-friends__info-divider" />
          <div className="invite-friends__info-row">
            <span className="invite-friends__info-label">Länk</span>
            <span className="invite-friends__info-value">{REFERRAL_LINK}</span>
            <button
              className={`invite-friends__copy-btn${copiedField === "link" ? " invite-friends__copy-btn--copied" : ""}`}
              onClick={() => handleCopy(REFERRAL_LINK, "link")}
              aria-label="Kopiera länk"
              title={copiedField === "link" ? "Kopierad!" : "Kopiera"}
            >
              {copiedField === "link" ? (
                <Check size={16} />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>

        <div className="invite-friends__qr">
          <QRCode value={REFERRAL_LINK} size={80} />
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
