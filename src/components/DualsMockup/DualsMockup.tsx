import "./DualsMockup.css";
import dualsPhone from "@/assets/Images/duals/DualsPhone.webp";
import quizIcon from "@/assets/Images/duals/QuizIcon.webp";
import vsIcon from "@/assets/Images/duals/VSIcon.webp";

export const DualsMockup = () => {
  return (
    <div className="duals-mockup">
      {/* Base phone */}
      <img
        className="duals-mockup__base"
        src={dualsPhone}
        alt="SveaPanel duals"
      />

      {/* Floating icons */}
      <img
        className="duals-mockup__layer duals-mockup__quiz"
        src={quizIcon}
        alt="Quiz icon"
      />
      <img
        className="duals-mockup__layer duals-mockup__vs"
        src={vsIcon}
        alt="VS icon"
      />
    </div>
  );
};
