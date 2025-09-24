import React, { useState } from "react";
import "./FAQ.css";

interface FAQItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Hur fungerar SveaPanelen?",
    answer: (
      <>
        <p>
          SveaPanelen är en enkel tjänst där du kan tjäna pengar direkt via
          mobilen. Allt du behöver göra är att registrera dig med BankID, välja
          vilka undersökningar eller spel du vill delta i och börja samla
          belöningar. Dina pengar skickas snabbt och smidigt via Swish.
        </p>
      </>
    ),
  },
  {
    id: "2",
    question: "Vad innebär betalda undersökningar?",
    answer: (
      <>
        <p>
          Betalda undersökningar är enkäter som företag betalar dig för att
          svara på. Här är hur det fungerar:
        </p>
        <ul>
          <li>
            <strong>Företag behöver feedback:</strong> Många företag vill testa
            sina produkter och idéer innan de lanseras. De vänder sig till
            panelföretag som SveaPanelen för att sätta upp undersökningar.
          </li>
          <li>
            <strong>Du får betalt:</strong> Vi visar undersökningarna för våra
            användare och betalar ut belöningar för deltagandet. Alla belöningar
            kan tas ut till Swish, direkt till ditt konto, utan uttagsgränser.
          </li>
          <li>
            <strong>Extra tävlingar:</strong> Vi erbjuder även tävlingar för de
            som gör flest enkäter eller bjuder in flest användare. Du kan vinna
            häftiga priser som betalas ut varje vecka!
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "3",
    question: "Vad kan man tjäna med betalda undersökningar?",
    answer: (
      <>
        <p>
          Betalda undersökningar erbjuder möjligheten att tjäna extra pengar på
          fritiden genom att dela med sig av sina åsikter och tankar om olika
          produkter och tjänster.
        </p>
        <ul>
          <li>
            <strong>Extra inkomst:</strong> Med minimal ansträngning kan du få
            en extra inkomst som kan hjälpa dig att spara pengar eller
            finansiera dina fritidsintressen.
          </li>
          <li>
            <strong>Små belopp blir stora:</strong> Även om det är mindre belopp
            som du kan tjäna på undersökningar så kan små belopp sammanlagt bli
            ett bra tillskott.
          </li>
          <li>
            <strong>Lunch betald:</strong> Genom att vara aktiv då och då kan du
            få lunchen betald.
          </li>
        </ul>
        <p>
          <strong>Kom igång redan idag:</strong> Börja att tjäna pengar på
          enkäter och ladda ner appen på App Store eller Google Play.
        </p>
      </>
    ),
  },
  {
    id: "8",
    question: "Hur tjänar jag på mobilspel?",
    answer: (
      <>
        <p>
          Du tjänar pengar genom att spela mobilspel direkt i appen. Varje gång
          du klarar en nivå eller uppnår ett mål belönas du med poäng som kan
          växlas in till riktiga pengar.
        </p>
        <p>
          Ju längre du kommer i spelen, desto bättre blir belöningen – de högre
          nivåerna kan ge ersättningar på flera hundra kronor. Perfekt för dig
          som vill ha roligt samtidigt som saldot växer!
        </p>
      </>
    ),
  },
  {
    id: "4",
    question: "Vilka belöningar kan jag få?",
    answer: (
      <>
        <p>
          Vi betalar ut alla våra belöningar snabbt och smidigt via Swish - du
          kan ta ut så lite som 3kr!
        </p>
      </>
    ),
  },
  {
    id: "5",
    question: "Hur mycket kan jag tjäna?",
    answer: (
      <>
        <p>Belöningarna varierar beroende på enkätens längd och komplexitet:</p>
        <ul>
          <li>Korta enkäter: 1-10 kr</li>
          <li>Mellanlånga enkäter: 10-25 kr</li>
          <li>Långa enkäter: 25-50 kr</li>
        </ul>
        <p>
          När det kommer till mobilspel beror det på vilket spel du spelar och
          vilka nivåer du kommer upp till. De högsta nivåerna kan betala ut
          flera hundra kronor!
        </p>
      </>
    ),
  },
  {
    id: "6",
    question: "Är det säkert?",
    answer: (
      <>
        <p>
          Ja, du loggar alltid in med BankID och väljer själv vilka uppgifter du
          vill dela. Vi har inga dolda avgifter och du kan ta ut dina pengar när
          du vill - utan gränser för minsta uttag.
        </p>
      </>
    ),
  },
  {
    id: "7",
    question: "Varför just oss?",
    answer: (
      <>
        <p>
          SveaPanelen är en av Sveriges snabbast växande belöningsplattformar
          med över 200 000 registrerade medlemmar.
        </p>
        <ul>
          <li>
            🔒 Säkerhet först – BankID-inloggning och full kontroll över vilken
            data du delar.
          </li>
          <li>
            🤝 Extremt hjälpsam kundsupport – vi finns alltid här när du behöver
            hjälp.
          </li>
          <li>
            💸 Direkta Swish-betalningar – inga gränser, ta ut dina pengar när
            du vill.
          </li>
          <li>⚡ En modern, snabb och användarvänlig plattform.</li>
          <li>
            📝 Kvalitativa och relevanta undersökningar – anpassade efter dig.
          </li>
          <li>
            🎮 Roliga och välbetalda mobilspel – tjäna pengar medan du spelar!
          </li>
        </ul>
      </>
    ),
  },
];

const FAQ: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]); // First item expanded by default

  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="faq-section" id="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Vanliga frågor</h2>
        </div>

        <div className="faq-list">
          {faqData.map((item) => (
            <div key={item.id} className="faq-item">
              <button
                className={`faq-question ${
                  expandedItems.includes(item.id) ? "expanded" : ""
                }`}
                onClick={() => toggleItem(item.id)}
                aria-expanded={expandedItems.includes(item.id)}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-icon">
                  {expandedItems.includes(item.id) ? "×" : "+"}
                </span>
              </button>

              <div
                className={`faq-answer ${
                  expandedItems.includes(item.id) ? "expanded" : ""
                }`}
              >
                <div className="faq-answer-content">
                  {typeof item.answer === "string" ? item.answer : item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
