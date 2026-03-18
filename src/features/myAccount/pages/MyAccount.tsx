import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import "../styles/MyAccount.css";
import { useAuthStore } from "@/core/auth/authStore";
import { useUser } from "@/features/user/api/user.queries";
import AppDownloadQRModal from "@/components/appDownloadModal/AppDownloadQRModal";
import { AccountOverview } from "@/features/myAccount/components/AccountOverview/AccountOverview";
import { InviteFriends } from "@/features/myAccount/components/InviteFriends/InviteFriends";
import { Extentsion } from "@/features/myAccount/components/Extention/Extention";

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
  "bjud-in": <InviteFriends />,
  extension: <Extentsion />,
  kophistorik: <KophistorikContent />,
  installningar: <InstallningarContent />,
};

export const MyAccount = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const { data: user } = useUser();
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
    useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 700;

  const handleSelect = (tab: Tab) => setActiveTab(tab);
  const handleBack = () => setActiveTab(null);
  // On desktop activeTab defaults to first tab
  const resolvedTab = activeTab ?? (isMobile ? null : "oversikt");

  return (
    <>
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
            <div className="my-account__avatar">
              {user ? `${user.firstName[0]}${user.lastName[0]}` : ""}
            </div>
            <div>
              <p className="my-account__greeting">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="my-account__greeting-sub">{user?.email}</p>
            </div>
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

          <button className="my-account__logout" onClick={handleLogout}>
            Logga ut
          </button>
        </aside>

        {/* Content */}
        <main
          className={`my-account__content${
            isMobile && !resolvedTab ? "" : " my-account__content--visible"
          }`}
        >
          {isMobile && (
            <button className="my-account__back" onClick={handleBack}>
              <ArrowLeft size={16} /> Tillbaka
            </button>
          )}
          {resolvedTab && contentMap[resolvedTab]}
        </main>
      </div>
    </>
  );
};

export default MyAccount;
