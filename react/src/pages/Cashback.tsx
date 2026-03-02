import "../App.css";
import { useState } from "react";
import TopNav from "../components/topNav/TopNav";
import Footer from "../components/footer/Footer";
import AppDownloadQRModal from "../components/appDownloadModal/AppDownloadQRModal";

function Cashback() {
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
    useState(false);

  const handleAppDownload = () => setIsAppDownloadQRModalOpen(true);

  return (
    <>
      <TopNav handleAppDownload={handleAppDownload} />
      <main
        style={{
          paddingTop: "120px",
          minHeight: "80vh",
          maxWidth: 900,
          margin: "0 auto",
          padding: "120px 2rem 4rem",
        }}
      >
        <h1>Cashback</h1>
        <p>
          Tjäna cashback på dina köp med SveaPanelen. Mer information kommer
          snart.
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

export default Cashback;
