import "./SurveyMockup.css";
import phoneBase from "@/assets/Images/HeroIosReview.webp";
import surveyIcon from "@/assets/Images/Surveys/surveyIcon.webp";

export const SurveyMockup = () => {
  return (
    <div className="survey-mockup">
      {/* Blue background shape */}
      <div className="survey-mockup__bg" />

      <img
        className="survey-mockup__base"
        src={phoneBase}
        alt="SveaPanel enkäter"
      />
      <img
        className="survey-mockup__layer survey-mockup__icon"
        src={surveyIcon}
        alt="Enkät-ikon"
      />
    </div>
  );
};
