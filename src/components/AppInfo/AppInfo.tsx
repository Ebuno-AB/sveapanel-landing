import "./AppInfo.css";
import { CashbackMockup } from "@/components/CashbackMockup/CashbackMockup";
import { DualsMockup } from "@/components/DualsMockup/DualsMockup";
import { GamingMockup } from "@/components/GamingMockup/GamingMockup";
import { SurveyMockup } from "@/components/SurveyMockup/SurveyMockup";
import { isIosReview } from "@/config/reviewConfig";
import competitionMockup from "../../assets/Images/GamingMockup_.png";

type Accent = "pink" | "teal" | "purple" | "orange" | "blue";

interface AppInfoItem {
  image: string | null;
  imageAlt: string;
  reverse: boolean;
  accent: Accent;
  headingParts: { text: string; highlighted?: boolean }[];
  bullets: ({ text: string; iosHidden?: boolean } | string)[];
  MockupComponent?: React.ComponentType;
  iosHidden?: boolean;
}

const CheckIcon = ({ accent }: { accent: Accent }) => (
  <span className={`app-info__check app-info__check--${accent}`}>
    <svg viewBox="0 0 12 10" aria-hidden="true">
      <polyline points="1.5,5 4.5,8.5 10.5,1.5" />
    </svg>
  </span>
);

const items: AppInfoItem[] = [
  {
    image: null,
    imageAlt: "Cashback mockup",
    reverse: false,
    accent: "pink",
    headingParts: [
      { text: "Få tillbaka pengar när du " },
      { text: "handlar", highlighted: true },
      { text: " med SveaPanelen" },
    ],
    bullets: [
      "Du handlar som vanligt",
      "Använd SveaPanelens extention eller öppna butiken från appen",
      "Få pengar tillbaka!",
    ],
  },
  {
    image: null,
    imageAlt: "Gaming mockup",
    reverse: true,
    accent: "teal",
    MockupComponent: GamingMockup,
    iosHidden: true,
    headingParts: [
      { text: "Ladda ner " },
      { text: "mobilspel", highlighted: true },
      { text: " och klara nivåer för att tjäna pengar" },
    ],
    bullets: [
      "Ladda ner ett spel",
      "Klara en nivå",
      "Få pengar direkt i appen",
    ],
  },
  {
    image: null,
    imageAlt: "Duels mockup",
    reverse: false,
    accent: "purple",
    MockupComponent: DualsMockup,
    headingParts: [
      { text: "Spela mot andra användare i vårat " },
      { text: "quiz-spel", highlighted: true },
    ],
    bullets: [
      "Bestäm hur mycket du vill spela om",
      "Svara så snabbt du kan på frågorna för att få mer poäng",
      {
        text: "Den som får mest poäng vinner och får den andras satsade pengar",
        iosHidden: true,
      },
    ],
  },
  {
    image: competitionMockup,
    imageAlt: "Competition mockup",
    reverse: true,
    accent: "orange",
    headingParts: [
      { text: "Vi har dagliga och veckovisa " },
      { text: "tävlingar", highlighted: true },
      { text: " där vinnarna får pris" },
    ],
    bullets: [
      "Samla poäng genom att göra enkäter och klara nivåer i spel",
      { text: "Vinnarna i tävlingarna får pengar i vinst", iosHidden: true },
    ],
  },
  {
    image: null,
    imageAlt: "Survey mockup",
    reverse: false,
    accent: "blue",
    MockupComponent: SurveyMockup,
    headingParts: [
      { text: "Svara på " },
      { text: "enkäter", highlighted: true },
      { text: " och bli belönad med pengar" },
    ],
    bullets: [
      "Nya enkäter släpps varje dag",
      "Ju fler du gör desto bättre anpassade enkäter får du",
    ],
  },
];

export const AppInfo = () => {
  const visibleItems = items.filter((item) => !(isIosReview && item.iosHidden));
  return (
    <section className="app-info">
      {visibleItems.map((item, i) => (
        <div
          key={i}
          className={`app-info__row${item.reverse ? " app-info__row--reverse" : ""} app-info__row--bg-${item.accent}`}
        >
          <div className="app-info__image-wrap">
            {item.MockupComponent ? (
              <item.MockupComponent />
            ) : item.image === null ? (
              <CashbackMockup />
            ) : (
              <img src={item.image} alt={item.imageAlt} />
            )}
          </div>

          <div className="app-info__content">
            <h2 className="app-info__heading">
              {item.headingParts.map((part, j) =>
                part.highlighted ? (
                  <span
                    key={j}
                    className={`app-info__heading--accent-${item.accent}`}
                  >
                    {part.text}
                  </span>
                ) : (
                  part.text
                ),
              )}
            </h2>

            <ul className="app-info__list">
              {item.bullets
                .filter(
                  (b) => !(isIosReview && typeof b === "object" && b.iosHidden),
                )
                .map((bullet, j) => (
                  <li key={j} className="app-info__list-item">
                    <CheckIcon accent={item.accent} />
                    <span>
                      {typeof bullet === "string" ? bullet : bullet.text}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};
