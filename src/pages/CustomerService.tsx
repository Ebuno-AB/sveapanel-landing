import "../App.css";
import "./CustomerService.css";
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
      <section className="cs-hero">
        <div className="cs-hero__inner">
          <h1 className="cs-hero__title">Kundtjänst</h1>
          <p className="cs-hero__description">
            Har du frågor eller behöver hjälp? Vi finns här för dig. Kontakta
            oss via e-post eller kolla in svaren på vanliga frågor nedan.
          </p>

          <h2 className="cs-hero__contact-heading">Kontakta oss</h2>
          <p className="cs-hero__contact-email">
            E-post: <a href="mailto:help@sveapanelen.se">help@sveapanelen.se</a>
          </p>
          <p className="cs-hero__response-time">
            Vi svarar normalt inom 1-2 arbetsdagar.
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
