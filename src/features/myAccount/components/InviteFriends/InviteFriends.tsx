import { motion, type Variants } from "framer-motion";
import { ReferralShareCard } from "./ReferralShareCard";
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
        <motion.div className="invite__card--share" variants={cardVariants}>
          <ReferralShareCard />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InviteFriends;
