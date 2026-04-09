import "./DuelsMockup.css";
import duelsPhone from "@/assets/Images/duels/DuelsPhone.webp";
import quizIcon from "@/assets/Images/duels/QuizIcon.webp";
import vsIcon from "@/assets/Images/duels/VSIcon.webp";

export const DuelsMockup = () => {
  return (
    <div className="duels-mockup">
      {/* Base phone */}
      <img
        className="duels-mockup__base"
        src={duelsPhone}
        alt="SveaPanel duels"
      />

      {/* Floating icons */}
      <img
        className="duels-mockup__layer duels-mockup__quiz"
        src={quizIcon}
        alt="Quiz icon"
      />
      <img
        className="duels-mockup__layer duels-mockup__vs"
        src={vsIcon}
        alt="VS icon"
      />
    </div>
  );
};
