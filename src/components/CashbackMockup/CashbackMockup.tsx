import "./CashbackMockup.css";
import svea from "@/assets/Images/cashback/svea.webp";
import amazon from "@/assets/Images/cashback/Amazon.webp";
import hotelsCom from "@/assets/Images/cashback/Hotels.com.webp";
import headphones from "@/assets/Images/cashback/headphones.webp";
import lipgloss from "@/assets/Images/cashback/lipgloss.webp";
import percent from "@/assets/Images/cashback/10percent.webp";

export const CashbackMockup = () => {
  return (
    <div className="cashback-mockup">
      {/* Product cards — behind phone (z-index 1) */}
      <img
        className="cashback-mockup__layer cashback-mockup__headphones"
        src={headphones}
        alt="Headphones product"
      />
      <img
        className="cashback-mockup__layer cashback-mockup__lipgloss"
        src={lipgloss}
        alt="Lipgloss product"
      />

      {/* Base phone (z-index 2) */}
      <img className="cashback-mockup__base" src={svea} alt="SveaPanel app" />

      {/* Store cards and badge — over phone (z-index 3) */}
      <img
        className="cashback-mockup__layer cashback-mockup__amazon"
        src={amazon}
        alt="Amazon cashback"
      />
      <img
        className="cashback-mockup__layer cashback-mockup__hotels"
        src={hotelsCom}
        alt="Hotels.com cashback"
      />
      <img
        className="cashback-mockup__layer cashback-mockup__percent"
        src={percent}
        alt="10% cashback"
      />
    </div>
  );
};
