import "../App.css";
import { useState } from "react";
import TopNav from "../components/topNav/TopNav";
import Footer from "../components/footer/Footer";
import AppDownloadQRModal from "../components/appDownloadModal/AppDownloadQRModal";
import FAQ from "@/components/faq/FAQ";

function CustomerService() {
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
    useState(false);

  const handleAppDownload = () => setIsAppDownloadQRModalOpen(true);

  return (
    <>
      <TopNav handleAppDownload={handleAppDownload} />

      {/* Hero section */}
      <section
        style={{
          backgroundColor: "#7571FC",
          maxHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 5% 80px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "1200px", width: "100%" }}>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              margin: "0 0 24px 0",
            }}
          >
            Kundtjänst
          </h1>
          <p
            style={{
              color: "#fff",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              fontWeight: 400,
              lineHeight: 1.6,
              margin: "0 0 48px 0",
              maxWidth: "460px",
            }}
          >
            Har du frågor eller behöver hjälp? Vi finns här för dig. Kontakta
            oss via e-post eller kolla in svaren på vanliga frågor nedan.
          </p>

          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
              fontWeight: 700,
              margin: "0 0 12px 0",
            }}
          >
            Kontakta oss
          </h2>
          <p style={{ color: "rgba(255,255,255,0.9)", margin: 0 }}>
            E-post:{" "}
            <a
              href="mailto:help@sveapanelen.se"
              style={{
                color: "#ffffff",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              help@sveapanelen.se
            </a>
          </p>
          <p style={{ color: "rgba(255,255,255,0.75)", marginTop: "6px" }}>
            Vi svarar normalt inom 1–2 arbetsdagar.
          </p>
        </div>
      </section>

      {/* FAQ – full-width, outside the constrained hero container */}
      <FAQ />

      <Footer />

      <AppDownloadQRModal
        isOpen={isAppDownloadQRModalOpen}
        onClose={() => setIsAppDownloadQRModalOpen(false)}
      />
    </>
  );
}

export default CustomerService;
