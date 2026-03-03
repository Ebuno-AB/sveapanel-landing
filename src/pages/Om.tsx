import "../App.css";
import { useState } from "react";
import TopNav from "../components/topNav/TopNav";
import Footer from "../components/footer/Footer";
import AppDownloadQRModal from "../components/appDownloadModal/AppDownloadQRModal";

function Om() {
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
    useState(false);

  const handleAppDownload = () => setIsAppDownloadQRModalOpen(true);

  return (
    <>
      <TopNav handleAppDownload={handleAppDownload} />
      <main
        style={{
          minHeight: "80vh",
          maxWidth: 900,
          margin: "0 auto",
          padding: "120px 2rem 4rem",
        }}
      >
        <h1>Om SveaPanelen</h1>
        <p>
          SveaPanelen är Sveriges ledande rewards-app där du tjänar pengar på
          enkäter, mobilspel och cashback.
        </p>
      </main>
      <Footer />
      <AppDownloadQRModal
        isOpen={isAppDownloadQRModalOpen}
        onClose={() => setIsAppDownloadQRModalOpen(false)}
      />
    </>
  );
}

export default Om;
