import { useState, useEffect } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { useUser } from "@/features/user/api/user.queries";
import branch from "branch-sdk";
import "./DashboardReferralCard.css";

export const DashboardReferralCard = () => {
  const { data: user, isLoading } = useUser();
  const [copiedField, setCopiedField] = useState<"code" | "link" | null>(null);
  const [referralLink, setReferralLink] = useState("");

  const referralCode = user?.referralCode ?? "";

  useEffect(() => {
    if (!referralCode) return;
    branch.link(
      {
        channel: "user-share",
        feature: "referral",
        data: {
          referral_code: referralCode,
          $deeplink_path: `referral/${referralCode}`,
          $fallback_url: `https://sveapanelen.se/r/${referralCode}`,
        },
      },
      (err, link) => {
        if (!err && link) setReferralLink(link);
        else setReferralLink(`https://sveapanelen.se/r/${referralCode}`);
      },
    );
  }, [referralCode]);

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
    <div className="dash-referral">
      <div className="dash-referral__header">
        <span className="dash-referral__label">Dela din kod eller länk</span>
        <Share2 size={18} className="dash-referral__icon" />
      </div>
      <p className="dash-referral__desc">
        Bjud in dina vänner och bli belönad med <strong>15%</strong> av vad de
        tjänar.
      </p>

      <div className="dash-referral__fields">
        <div className="dash-referral__row">
          <span className="dash-referral__row-label">Kod</span>
          {isLoading ? (
            <span className="dash-referral__skel dash-referral__skel--code" />
          ) : (
            <span className="dash-referral__code">{referralCode}</span>
          )}
          <button
            className={`dash-referral__copy-btn${
              copiedField === "code" ? " dash-referral__copy-btn--copied" : ""
            }`}
            onClick={() => handleCopy(referralCode, "code")}
            disabled={!referralCode}
            aria-label="Kopiera kod"
          >
            {copiedField === "code" ? <Check size={15} /> : <Copy size={15} />}
            {copiedField === "code" ? "Kopierad!" : "Kopiera"}
          </button>
        </div>
        <div className="dash-referral__divider" />
        <div className="dash-referral__row">
          <span className="dash-referral__row-label">Länk</span>
          {isLoading ? (
            <span className="dash-referral__skel dash-referral__skel--link" />
          ) : (
            <span className="dash-referral__link">{referralLink}</span>
          )}
          <button
            className={`dash-referral__copy-btn${
              copiedField === "link" ? " dash-referral__copy-btn--copied" : ""
            }`}
            onClick={() => handleCopy(referralLink, "link")}
            disabled={!referralLink}
            aria-label="Kopiera länk"
          >
            {copiedField === "link" ? <Check size={15} /> : <Copy size={15} />}
            {copiedField === "link" ? "Kopierad!" : "Kopiera"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardReferralCard;
