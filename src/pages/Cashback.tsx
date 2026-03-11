import "../App.css";
import "./Cashback.css";
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
      <section className="cashback-hero">
        <div className="cashback-hero-inner">
          {/* Left copy */}
          <div className="cashback-hero-copy">
            <h1 className="cashback-hero-title">SveaPanelen Cashback</h1>
            <p className="cashback-hero-desc">
              Ladda ner SveaPanelens app för att få tillfång till Cashback på
              hundratals butiker. Pengarna kommer till ditt konto hos
              SveaPanelen som du sedan kan ta ut med Swish!
            </p>
          </div>

          {/* Right mockup */}
          <div className="cashback-hero-image-wrap">
            <img
              src={cashbackMockup}
              alt="SveaPanelen Cashback app"
              className="cashback-hero-image"
            />
          </div>
        </div>
      </section>

      {/* How-to Section */}
      <section className="cashback-howto">
        <div className="cashback-howto-inner">
          <h2 className="cashback-section-title">Såhär gör du</h2>

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
                  className="howto-card-img"
                />
                <h3 className="howto-card-title">{card.title}</h3>
                <p className="howto-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Cards Section */}
      <section className="cashback-stores">
        <div className="cashback-stores-inner">
          <h2 className="cashback-section-title">
            Få cashback på dina favoritbutiker
          </h2>

          <div className="store-grid">
            {[
              { name: "IKEA", cashback: 2.0 },
              { name: "H&M", cashback: 5.0 },
              { name: "Zalando", cashback: 4.0 },
              { name: "Adidas", cashback: 6.0 },
              { name: "Nike", cashback: 5.0 },
              { name: "Elgiganten", cashback: 3.0 },
              { name: "Apotek Hjärtat", cashback: 8.0 },
              { name: "Webhallen", cashback: 3.5 },
              { name: "Stadium", cashback: 4.0 },
              { name: "Lindex", cashback: 6.0 },
              { name: "Boozt", cashback: 7.0 },
              { name: "Coop", cashback: 2.5 },
            ].map((store, i) => (
              <div key={i} className="store-card">
                <div className="store-logo-fallback">
                  {store.name.charAt(0)}
                </div>
                <span className="store-name">{store.name}</span>
                <span className="store-cashback-badge">
                  {store.cashback}% cashback
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <AppDownloadQRModal
        isOpen={isAppDownloadQRModalOpen}
        onClose={() => setIsAppDownloadQRModalOpen(false)}
      />
    </>
  );
}

export default Cashback;
