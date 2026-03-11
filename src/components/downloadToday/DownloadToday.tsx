import "./DownloadToday.css";
import appleIcon from "../../assets/icons/Download_on_the_App_Store_Badge_SE_RGB_blk_100317.svg";
import googleIcon from "../../assets/icons/GetItOnGooglePlay_Badge_Web_color_Swedish.png";

export const DownloadToday = () => {
  return (
    <div className="download-today-wrapper">
      <div className="download-today-card">
        <h2 className="download-today-title">Ladda ner appen idag!</h2>
        <div className="download-today-buttons">
          <a
            href="https://apps.apple.com/app/apple-store/id1617681550?pt=120111031&ct=direct&mt=8"
            target="_blank"
            rel="noopener noreferrer"
            className="store-button"
          >
            <img src={appleIcon} alt="Ladda ner på App Store" />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.ebuno.swishpanelenfinal"
            target="_blank"
            rel="noopener noreferrer"
            className="store-button"
          >
            <img src={googleIcon} alt="Ladda ned på Google Play" />
          </a>
        </div>
      </div>
    </div>
  );
};
