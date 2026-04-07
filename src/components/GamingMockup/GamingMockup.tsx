import "./GamingMockup.css";
import gamingPhone from "@/assets/Images/gaming/GamingMockup.webp";
import coinMaster from "@/assets/Images/gaming/CoinMaster.webp";
import monopoly from "@/assets/Images/gaming/Monopoly.webp";
import candy from "@/assets/Images/gaming/candy.webp";
import clash from "@/assets/Images/gaming/clash.webp";

export const GamingMockup = () => {
  return (
    <div className="gaming-mockup">
      {/* Base phone */}
      <img
        className="gaming-mockup__base"
        src={gamingPhone}
        alt="SveaPanel gaming"
      />

      {/* Floating game icons */}
      <img
        className="gaming-mockup__layer gaming-mockup__coinmaster"
        src={coinMaster}
        alt="Coin Master"
      />
      <img
        className="gaming-mockup__layer gaming-mockup__monopoly"
        src={monopoly}
        alt="Monopoly"
      />
      <img
        className="gaming-mockup__layer gaming-mockup__candy"
        src={candy}
        alt="Candy Crush"
      />
      <img
        className="gaming-mockup__layer gaming-mockup__clash"
        src={clash}
        alt="Clash of Clans"
      />
    </div>
  );
};
