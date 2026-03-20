import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { useUser } from "@/features/user/api/user.queries";
import "./InviteFriends.css";

export const ReferralShareCard = () => {
  const { data: user, isLoading } = useUser();
  const [copiedField, setCopiedField] = useState<"code" | "link" | null>(null);

  const referralCode = user?.referralCode ?? "";
  const referralLink = referralCode
    ? `https://sveapanelen.se/join/${referralCode}`
    : "";

  const handleCopy = (text: string, field: "code" | "link") => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fallbackCopy = (text: string) => {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.focus();
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  return (
    <div className="invite__card invite__card--share">
      <div className="invite__card-header">
        <span className="invite__card-label">Dela din kod eller länk</span>
        <Share2 size={18} className="invite__card-icon" />
      </div>
      <p className="invite__share-desc">
        Bjud in dina vänner och bli belönad med <strong>15%</strong> av vad de
        tjänar.
      </p>

      <div className="invite__share-body">
        <div className="invite__fields">
          <div className="invite__row">
            <span className="invite__row-label">Kod</span>
            {isLoading ? (
              <span className="invite__skel invite__skel--code" />
            ) : (
              <span className="invite__code">{referralCode}</span>
            )}
            <button
              className={`invite__copy-btn${
                copiedField === "code" ? " invite__copy-btn--copied" : ""
              }`}
              onClick={() => handleCopy(referralCode, "code")}
              disabled={!referralCode}
              aria-label="Kopiera kod"
            >
              {copiedField === "code" ? (
                <Check size={15} />
              ) : (
                <Copy size={15} />
              )}
              {copiedField === "code" ? "Kopierad!" : "Kopiera"}
            </button>
          </div>
          <div className="invite__divider" />
          <div className="invite__row">
            <span className="invite__row-label">Länk</span>
            {isLoading ? (
              <span className="invite__skel invite__skel--link" />
            ) : (
              <span className="invite__link">{referralLink}</span>
            )}
            <button
              className={`invite__copy-btn${
                copiedField === "link" ? " invite__copy-btn--copied" : ""
              }`}
              onClick={() => handleCopy(referralLink, "link")}
              disabled={!referralLink}
              aria-label="Kopiera länk"
            >
              {copiedField === "link" ? (
                <Check size={15} />
              ) : (
                <Copy size={15} />
              )}
              {copiedField === "link" ? "Kopierad!" : "Kopiera"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralShareCard;
