import "./SurveyMockup.css";
import phoneBase from "@/assets/Images/Surveys/SurveyMockup.webp";
import phoneBaseIosReview from "@/assets/Images/Surveys/SurveyIosReview.webp";
import surveyIcon from "@/assets/Images/Surveys/surveyIcon.webp";
import { isIosReview } from "@/config/reviewConfig";

export const SurveyMockup = () => {
  return (
    <div className="survey-mockup">
      <img
        className="survey-mockup__base"
        src={isIosReview ? phoneBaseIosReview : phoneBase}
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
