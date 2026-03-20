import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare, Mail, LogOut, Trash2 } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useAuthStore } from "@/core/auth/authStore";
import {
  useUpdatePushPermission,
  useUpdateSmsPermission,
  useUpdateEmailPermission,
  useDeleteAccount,
} from "@/features/myAccount/api/accountSettings.mutations";
import "./AccountSettings.css";

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

interface ToggleRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

function ToggleRow({
  icon,
  title,
  description,
  checked,
  onChange,
  disabled,
}: ToggleRowProps) {
  return (
    <div className="account-settings__row" style={{ cursor: "default" }}>
      <div className="account-settings__icon account-settings__icon--teal">
        {icon}
      </div>
      <div className="account-settings__text">
        <p className="account-settings__title">{title}</p>
        <p className="account-settings__desc">{description}</p>
      </div>
      <label
        className="account-settings__toggle"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="account-settings__toggle-track" />
      </label>
    </div>
  );
}

export const AccountSettings = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updatePush = useUpdatePushPermission();
  const updateSms = useUpdateSmsPermission();
  const updateEmail = useUpdateEmailPermission();
  const deleteAccount = useDeleteAccount();

  const handleToggle = (
    current: boolean,
    setter: (v: boolean) => void,
    mutate: (v: boolean) => void,
  ) => {
    const next = !current;
    setter(next);
    mutate(next);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteConfirm = () => {
    deleteAccount.mutate(undefined, {
      onSuccess: () => {
        logout();
        navigate("/");
      },
    });
  };

  return (
    <div className="account-settings">
      {/* Notiser */}
      <motion.p
        className="account-settings__section-label"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Notiser
      </motion.p>
      <motion.div
        className="account-settings__card"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <ToggleRow
          icon={<Bell size={20} />}
          title="Push-notiser"
          description="Få aviseringar om enkäter, tävlingar och belöningar"
          checked={pushEnabled}
          onChange={() =>
            handleToggle(pushEnabled, setPushEnabled, updatePush.mutate)
          }
          disabled={updatePush.isPending}
        />
        <ToggleRow
          icon={<MessageSquare size={20} />}
          title="SMS-notiser"
          description="Få SMS om viktiga uppdateringar"
          checked={smsEnabled}
          onChange={() =>
            handleToggle(smsEnabled, setSmsEnabled, updateSms.mutate)
          }
          disabled={updateSms.isPending}
        />
        <ToggleRow
          icon={<Mail size={20} />}
          title="E-postnotiser"
          description="Få e-post om enkäter och erbjudanden"
          checked={emailEnabled}
          onChange={() =>
            handleToggle(emailEnabled, setEmailEnabled, updateEmail.mutate)
          }
          disabled={updateEmail.isPending}
        />
      </motion.div>

      {/* Konto */}
      <motion.p
        className="account-settings__section-label"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Konto
      </motion.p>
      <motion.div
        className="account-settings__card"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="account-settings__row"
          variants={cardVariants}
          onClick={handleLogout}
        >
          <div className="account-settings__icon account-settings__icon--orange">
            <LogOut size={20} />
          </div>
          <div className="account-settings__text">
            <p className="account-settings__title">Logga ut</p>
            <p className="account-settings__desc">
              Du kan logga in igen med BankID
            </p>
          </div>
        </motion.div>
        <motion.div
          className="account-settings__row"
          variants={cardVariants}
          onClick={() => setShowDeleteDialog(true)}
        >
          <div className="account-settings__icon account-settings__icon--red">
            <Trash2 size={20} />
          </div>
          <div className="account-settings__text">
            <p className="account-settings__title account-settings__title--red">
              Radera konto
            </p>
            <p className="account-settings__desc">
              Permanent radering av ditt konto och all data
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Delete confirmation dialog */}
      {showDeleteDialog && (
        <div
          className="account-settings__dialog-overlay"
          onClick={() => setShowDeleteDialog(false)}
        >
          <div
            className="account-settings__dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Radera konto?</h3>
            <p>
              Det här är permanent. Ditt konto och all data raderas omedelbart
              och kan inte återställas.
            </p>
            <div className="account-settings__dialog-actions">
              <button
                className="account-settings__dialog-cancel"
                onClick={() => setShowDeleteDialog(false)}
              >
                Avbryt
              </button>
              <button
                className="account-settings__dialog-confirm"
                onClick={handleDeleteConfirm}
                disabled={deleteAccount.isPending}
              >
                {deleteAccount.isPending ? "Raderar..." : "Radera konto"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
