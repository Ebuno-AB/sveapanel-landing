import { useState } from "react";
import { ChevronRight } from "lucide-react";
import "./MyAccount.css";
import TopNav from "../../components/topNav/TopNav";
import AppDownloadQRModal from "../../components/appDownloadModal/AppDownloadQRModal";
import { AccountOverview } from "@/components/AccountOverview/AccountOverview";

type Tab =
  | "oversikt"
  | "bjud-in"
  | "extension"
  | "kophistorik"
  | "installningar";

const tabs: { id: Tab; label: string }[] = [
  { id: "oversikt", label: "Översikt" },
  { id: "bjud-in", label: "Bjud in vänner" },
  { id: "extension", label: "Svea - extension" },
  { id: "kophistorik", label: "Köphistorik" },
  { id: "installningar", label: "Kontoinställningar" },
];

function BjudInContent() {
  return (
    <div className="my-account__content-inner">
      <h2>Bjud in vänner</h2>
      <div className="my-account__placeholder-card">
        <h3>Din referenskod</h3>
        <p>
          Dela din unika länk med vänner och tjäna cashback när de registrerar
          sig.
        </p>
      </div>
      <div className="my-account__placeholder-card">
        <h3>Dina inbjudningar</h3>
        <p>Du har inga aktiva inbjudningar ännu.</p>
      </div>
    </div>
  );
}

function ExtensionContent() {
  return (
    <div className="my-account__content-inner">
      <h2>Svea - extension</h2>
      <div className="my-account__placeholder-card">
        <h3>Webbläsartillägg</h3>
        <p>
          Installera Svea-tillägget för att automatiskt aktivera cashback när du
          handlar online.
        </p>
      </div>
      <div className="my-account__placeholder-card">
        <h3>Status</h3>
        <p>Tillägget är inte installerat på den här enheten.</p>
      </div>
    </div>
  );
}

function KophistorikContent() {
  return (
    <div className="my-account__content-inner">
      <h2>Köphistorik</h2>
      <div className="my-account__placeholder-card">
        <h3>Inga köp ännu</h3>
        <p>Dina godkända och väntande köp kommer att visas här.</p>
      </div>
    </div>
  );
}

function InstallningarContent() {
  return (
    <div className="my-account__content-inner">
      <h2>Kontoinställningar</h2>
      <div className="my-account__placeholder-card">
        <h3>Personuppgifter</h3>
        <p>Hantera ditt namn, e-postadress och lösenord.</p>
      </div>
      <div className="my-account__placeholder-card">
        <h3>Aviseringar</h3>
        <p>Välj vilka meddelanden du vill ta emot från oss.</p>
      </div>
      <div className="my-account__placeholder-card">
        <h3>Ta bort konto</h3>
        <p>Permanent borttagning av ditt konto och all tillhörande data.</p>
      </div>
    </div>
  );
}

const contentMap: Record<Tab, React.ReactNode> = {
  oversikt: <AccountOverview />,
  "bjud-in": <BjudInContent />,
  extension: <ExtensionContent />,
  kophistorik: <KophistorikContent />,
  installningar: <InstallningarContent />,
};

export const MyAccount = () => {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
    useState(false);

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 700;

  const handleSelect = (tab: Tab) => setActiveTab(tab);
  const handleBack = () => setActiveTab(null);
  const handleAppDownload = () => setIsAppDownloadQRModalOpen(true);

  // On desktop activeTab defaults to first tab
  const resolvedTab = activeTab ?? (isMobile ? null : "oversikt");

  return (
    <>
      <TopNav handleAppDownload={handleAppDownload} />
      <AppDownloadQRModal
        isOpen={isAppDownloadQRModalOpen}
        onClose={() => setIsAppDownloadQRModalOpen(false)}
      />
      <div className="my-account">
        {/* Sidebar */}
        <aside
          className={`my-account__sidebar${
            isMobile && resolvedTab ? "" : " my-account__sidebar--visible"
          }`}
        >
          <div className="my-account__profile">
            <div className="my-account__avatar">EM</div>
            <h1 className="my-account__greeting">Hej Elias!</h1>
          </div>

          <ul className="my-account__nav">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`my-account__nav-item${
                  resolvedTab === tab.id ? " my-account__nav-item--active" : ""
                }`}
                onClick={() => handleSelect(tab.id)}
              >
                {tab.label}
                <ChevronRight className="my-account__nav-chevron" size={18} />
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <main
          className={`my-account__content${
            isMobile && !resolvedTab ? "" : " my-account__content--visible"
          }`}
        >
          {isMobile && (
            <button className="my-account__back" onClick={handleBack}>
              ‹ Tillbaka
            </button>
          )}
          {resolvedTab && contentMap[resolvedTab]}
        </main>
      </div>
    </>
  );
};

export default MyAccount;
