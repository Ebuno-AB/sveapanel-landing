import "../App.css";
import { useState } from "react";
import TopNav from "../components/topNav/TopNav";
import Footer from "../components/footer/Footer";
import AppDownloadQRModal from "../components/appDownloadModal/AppDownloadQRModal";
import cashbackMockup from "../assets/Images/cashbackMockup.png";
import howTo1 from "../assets/Images/HowTo1.png";
import howTo2 from "../assets/Images/HowTo2.png";
import howTo3 from "../assets/Images/HowTo3.png";

function Cashback() {
  const [isAppDownloadQRModalOpen, setIsAppDownloadQRModalOpen] =
    useState(false);

  const handleAppDownload = () => setIsAppDownloadQRModalOpen(true);

  return (
    <>
      <TopNav handleAppDownload={handleAppDownload} />

      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#F647A4",
          maxHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 5% 80px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          {/* Left copy */}
          <div style={{ flex: "1 1 0", maxWidth: 580 }}>
            <h1
              style={{
                color: "#fff",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                margin: "0 0 24px 0",
              }}
            >
              SveaPanelen Cashback
            </h1>
            <p
              style={{
                color: "#fff",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                fontWeight: 400,
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 460,
              }}
            >
              Ladda ner SveaPanelens app för att få tillfång till Cashback på
              hundratals butiker. Pengarna kommer till ditt konto hos
              SveaPanelen som du sedan kan ta ut med Swish!
            </p>
          </div>

          {/* Right mockup */}
          <div
            style={{
              flex: "1 1 0",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <img
              src={cashbackMockup}
              alt="SveaPanelen Cashback app"
              style={{
                maxWidth: "min(480px, 100%)",
                width: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>

      {/* How-to Section */}
      <section
        style={{
          backgroundColor: "#fff",
          padding: "80px 5%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 800,
              color: "#111",
              margin: "0 0 48px 0",
            }}
          >
            Såhär gör du
          </h2>

          <style>{`
            .howto-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 32px;
            }
            @media (max-width: 768px) {
              .howto-grid {
                grid-template-columns: 1fr;
              }
            }
          `}</style>

          <div className="howto-grid">
            {[
              {
                img: howTo1,
                title: "Gå till butiken från appen",
                desc: "Du kan även scrolla bland alla butiker i appen och gå till butiken därifrån. När köpet har gått igenom kan du se din kommande cashback i appen.",
              },
              {
                img: howTo2,
                title: "Aktivera våran extension",
                desc: "Med våran extension på får du automatiskt cashback när du handlar online och använder Safari.",
              },
              {
                img: howTo3,
                title: "Ta ut från appen",
                desc: "Cashbacken kommer till ditt konto i appen som du sen kan ta ut direkt med Swish.",
              },
            ].map((card, i) => (
              <div key={i}>
                <img
                  src={card.img}
                  alt={card.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                    borderRadius: 24,
                    marginBottom: 24,
                  }}
                />
                <h3
                  style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                    fontWeight: 700,
                    color: "#111",
                    margin: "0 0 12px 0",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
                    color: "#333",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section></section>

      <Footer />
      <AppDownloadQRModal
        isOpen={isAppDownloadQRModalOpen}
        onClose={() => setIsAppDownloadQRModalOpen(false)}
      />
    </>
  );
}

export default Cashback;
