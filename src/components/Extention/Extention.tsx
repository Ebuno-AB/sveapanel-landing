import { ExternalLink, Download } from "lucide-react";
import "./Extention.css";

type BrowserInfo = {
  name: string;
  storeUrl: string;
  addText: string;
};

const getBrowserInfo = (): BrowserInfo => {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) {
    return {
      name: "Edge",
      storeUrl: "https://microsoftedge.microsoft.com/addons",
      addText: "Add to Edge / Lägg till i Edge",
    };
  }
  if (/Firefox\//.test(ua)) {
    return {
      name: "Firefox",
      storeUrl: "https://addons.mozilla.org",
      addText: "Add to Firefox / Lägg till i Firefox",
    };
  }
  if (/Chrome\//.test(ua)) {
    return {
      name: "Chrome",
      storeUrl: "https://chrome.google.com/webstore",
      addText: "Add to Chrome / Lägg till i Chrome",
    };
  }
  return {
    name: "din webbläsare",
    storeUrl: "#",
    addText: "Lägg till tillägg",
  };
};

export const Extentsion = () => {
  const { name, storeUrl, addText } = getBrowserInfo();

  return (
    <div className="extension">
      <div className="extension__layout">
        {/* Left: info */}
        <div className="extension__info">
          <h2 className="extension__title">Svea - extension</h2>
          <p className="extension__tagline">Missa aldrig din cashback!</p>
          <p className="extension__description">
            Svea-extension är ett tillägg som påminner dig om att aktivera
            cashback när du besöker en butik där du kan få pengar tillbaka. På
            så sätt missar du aldrig din cashback.
          </p>
        </div>

        {/* Right: steps */}
        <div className="extension__steps-col">
          <h3 className="extension__steps-title">Så här gör du</h3>
          <ol className="extension__steps">
            <li className="extension__step">
              <span className="extension__step-icon">
                <ExternalLink size={18} />
              </span>
              <p>
                Klicka här eller på knappen nedan så kommer du till {name}{" "}
                Add-ons.
              </p>
            </li>
            <li className="extension__step">
              <span className="extension__step-icon">
                <Download size={18} />
              </span>
              <p>Installera tillägget genom att klicka på {addText}.</p>
            </li>
            <li className="extension__step">
              <span className="extension__step-icon">
                <Download size={18} />
              </span>
              <p>
                Ge tillåtelse till alla webbplatser om du blir ombedd, sen är
                det bara att shoppa som vanligt!
              </p>
            </li>
          </ol>
        </div>
      </div>

      <div className="extension__actions">
        <a
          className="extension__install-btn"
          href={storeUrl}
          target="_blank"
          rel="noreferrer"
        >
          Installera i {name}
        </a>
      </div>
    </div>
  );
};
