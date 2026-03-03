import "../App.css";
import { useState } from "react";
import TopNav from "../components/topNav/TopNav";
import Footer from "../components/footer/Footer";
import AppDownloadQRModal from "../components/appDownloadModal/AppDownloadQRModal";

function Kontakt() {
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
        <h1>Kontakt</h1>
        <p>
          Har du frågor eller funderingar? Kontakta oss på{" "}
          <a href="mailto:info@sveapanelen.se">info@sveapanelen.se</a>.
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

export default Kontakt;
