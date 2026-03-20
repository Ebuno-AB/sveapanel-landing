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
import { Transactions } from "@/features/myAccount/components/transactions/Transactions";
import { AccountSettings } from "@/features/myAccount/components/accountSettings/AccountSettings";

type Tab = "overview" | "invite" | "extension" | "transactions" | "settings";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Översikt" },
  { id: "invite", label: "Bjud in vänner" },
  { id: "extension", label: "Svea - extension" },
  { id: "transactions", label: "Transaktioner" },
  { id: "settings", label: "Kontoinställningar" },
];

const contentMap: Record<Tab, React.ReactNode> = {
  overview: <AccountOverview />,
  invite: <InviteFriends />,
  extension: <Extentsion />,
  transactions: <Transactions />,
  settings: <AccountSettings />,
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
  const resolvedTab = activeTab ?? (isMobile ? null : "overview");

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
