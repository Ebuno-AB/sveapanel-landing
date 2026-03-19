import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Copy, Check, Share2 } from "lucide-react";
import QRCode from "react-qr-code";
import { useUser } from "@/features/user/api/user.queries";
import "./InviteFriends.css";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const steps = [
  {
    number: 1,
    title: "Bjud in din kompis",
    description:
      "Bjud in dina vänner till Sveapanelen via din länk eller så skriver din vän in din kod när de går med",
  },
  {
    number: 2,
    title: "Dina kompisar tjänar",
    description:
      "Vi håller sedan koll på hur mycket dina vänner tjänar på enkäter, spel och cashback.",
  },
  {
    number: 3,
    title: "Bli belönad",
    description: "Du blir belönad med 15% av vad dina vänner tjänar.",
  },
];

export const InviteFriends = () => {
  const { data: user, isLoading } = useUser();
  const [copiedField, setCopiedField] = useState<"code" | "link" | null>(null);

  const referralCode = user?.referralCode ?? "";
  const referralLink = referralCode
    ? `https://sveapanelen.se/join/${referralCode}`
    : "";

  const handleCopy = (text: string, field: "code" | "link") => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="invite">
      {/* Title */}
      <motion.div
        className="invite__heading"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="invite__title">Bjud in vänner</h2>
        <p className="invite__subtitle">Dela din kod och tjäna extra</p>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        className="invite__bento"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Step cards */}
        {steps.map((step) => (
          <motion.div
            key={step.number}
            className="invite__card invite__card--step"
            variants={cardVariants}
            lang="sv"
          >
            <div className="invite__step-number">{step.number}</div>
            <h3 className="invite__step-title">{step.title}</h3>
            <p className="invite__step-desc">{step.description}</p>
          </motion.div>
        ))}

        {/* Share card — full width, dark */}
        <motion.div
          className="invite__card invite__card--share"
          variants={cardVariants}
        >
          <div className="invite__card-header">
            <span className="invite__card-label">Dela din kod eller länk</span>
            <Share2 size={18} className="invite__card-icon" />
          </div>
          <p className="invite__share-desc">
            Bjud in dina vänner och bli belönad med <strong>15%</strong> av vad
            de tjänar.
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

            {referralLink && (
              <div className="invite__qr">
                <QRCode value={referralLink} size={88} />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InviteFriends;
