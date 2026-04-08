import "./CompetitionMockup.css";
import phoneBase from "@/assets/Images/competition/CompetitionMockup.webp";
import confetti from "@/assets/Images/competition/confetti.webp";
import trophy from "@/assets/Images/competition/trophy.webp";

export const CompetitionMockup = () => {
  return (
    <div className="competition-mockup">
      <img
        className="competition-mockup__layer competition-mockup__confetti"
        src={confetti}
        alt=""
      />
      <img
        className="competition-mockup__base"
        src={phoneBase}
        alt="SveaPanel tävlingar"
      />
      <img
        className="competition-mockup__layer competition-mockup__trophy"
        src={trophy}
        alt="Trofé"
      />
    </div>
  );
};
