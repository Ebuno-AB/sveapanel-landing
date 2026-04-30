import "@/App.css";
import "./CustomerService.css";
import { useState } from "react";
import emailImage from "@/assets/Images/email.webp";
import TopNav from "@/components/topNav/TopNav";
import Footer from "@/components/footer/Footer";
import AppDownloadQRModal from "@/components/appDownloadModal/AppDownloadQRModal";
import FAQ from "@/components/faq/FAQ";

function CustomerService() {
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
    useState(false);

  return (
    <>
      <TopNav />

      {/* Hero section */}
      <section className="cs-hero">
        <div className="cs-hero__inner">
          <div className="cs-hero__content">
            <div className="cs-hero__text">
              <h1 className="cs-hero__title">Kundtjänst</h1>
              <p className="cs-hero__description">
                Har du frågor eller behöver hjälp? Vi finns här för dig. I appen
                kan du enkelt skapa ett nytt supportärende. Du går in på fliken
                mer och klickar på hjälp, därifrån får du fylla i vad du behöver
                hjälp med.
              </p>
            </div>
            <div className="cs-hero__image-wrap">
              <img
                src={emailImage}
                alt="E-post illustration"
                className="cs-hero__image"
              />
            </div>
          </div>
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
