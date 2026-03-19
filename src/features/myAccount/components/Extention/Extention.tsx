import { motion, type Variants } from "framer-motion";
import { ExternalLink, Download, ShieldCheck, Puzzle } from "lucide-react";
import "./Extention.css";

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

type BrowserInfo = {
  name: string;
  storeUrl: string;
  addText: string;
};

const getBrowserInfo = (): BrowserInfo => {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) {
    return {
      name: "Edge",
      storeUrl: "https://microsoftedge.microsoft.com/addons",
      addText: "Lägg till i Edge",
    };
  }
  if (/Firefox\//.test(ua)) {
    return {
      name: "Firefox",
      storeUrl: "https://addons.mozilla.org",
      addText: "Lägg till i Firefox",
    };
  }
  if (/Chrome\//.test(ua)) {
    return {
      name: "Chrome",
      storeUrl: "https://chrome.google.com/webstore",
      addText: "Lägg till i Chrome",
    };
  }
  return {
    name: "din webbläsare",
    storeUrl: "#",
    addText: "Lägg till tillägg",
  };
};

const steps = [
  {
    number: 1,
    icon: ExternalLink,
    title: "Öppna butiken",
    description:
      "Klicka på installationsknappen för att komma till tilläggsbutiken för din webbläsare.",
  },
  {
    number: 2,
    icon: Download,
    title: "Installera tillägget",
    description:
      "Klicka på knappen för att lägga till tillägget och följ instruktionerna.",
  },
  {
    number: 3,
    icon: ShieldCheck,
    title: "Börja shoppa",
    description:
      "Ge tillåtelse till alla webbplatser om du blir ombedd – sen är det bara att shoppa som vanligt!",
  },
];

export const Extentsion = () => {
  const { name, storeUrl, addText } = getBrowserInfo();

  return (
    <div className="extension">
      {/* Heading */}
      <motion.div
        className="extension__heading"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="extension__title">Svea Extension</h2>
        <p className="extension__subtitle">Missa aldrig din cashback</p>
      </motion.div>

      {/* Bento grid */}
      <motion.div
        className="extension__bento"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Step cards */}
        {steps.map((step) => (
          <motion.div
            key={step.number}
            className="extension__card extension__card--step"
            variants={cardVariants}
          >
            <div className="extension__card-header">
              <div className="extension__step-number">{step.number}</div>
              <Puzzle size={18} className="extension__card-icon" />
            </div>
            <h3 className="extension__step-title">{step.title}</h3>
            <p className="extension__step-desc">{step.description}</p>
          </motion.div>
        ))}

        {/* Install card — full width */}
        <motion.div
          className="extension__card extension__card--install"
          variants={cardVariants}
        >
          <div className="extension__card-header">
            <span className="extension__card-label">Installera i {name}</span>
            <Puzzle size={18} className="extension__card-icon" />
          </div>
          <p className="extension__install-desc">
            Svea-extension påminner dig om att aktivera cashback när du besöker
            en butik där du kan få pengar tillbaka. På så sätt missar du{" "}
            <strong>aldrig din cashback</strong>.
          </p>
          <div className="extension__install-actions">
            <a
              className="extension__install-btn"
              href={storeUrl}
              target="_blank"
              rel="noreferrer"
            >
              {addText}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
