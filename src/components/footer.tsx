// Footer component 
import '../App.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content grid">
        {/* Company Info */}
        <div className="footer-section">
          <h3>SveaPanelen & PollFlow</h3>
          <p>
            SveaPanelen är en app för betalda undersökningar och drivs av Flow Group AB under projektet PollFlow.<br/>
            Flow Group AB har 7 års erfarenhet av undersökningsbranchen och startade i Stockholm år 2018.
          </p>
          <a href="https://pollflow.io" target="_blank" rel="noopener noreferrer" className="footer-link">Besök PollFlow.io</a>
        </div>
        {/* Links & Services */}
        <div className="footer-section">
          <h4>Länkar & Tjänster</h4>
          <ul className="footer-links">
            <li><a href="https://sveapanelen.se" target="_blank" rel="noopener noreferrer">SveaPanelen</a></li>
            <li><a href="#">DeutschePanel: Bezahlte Umfragen</a></li>
            <li><a href="#">NorgePanelen: Betalte spørreundersøkelser</a></li>
          </ul>
        </div>
        {/* Contact */}
        <div className="footer-section">
          <h4>Kontakta Oss</h4>
          <ul className="footer-links">
            <li><a href="mailto:help@sveapanelen.se">help@sveapanelen.se</a></li>
            <li><a href="https://facebook.com/sveapanelen" target="_blank" rel="noopener noreferrer">SveaPanelen Facebook</a></li>
            <li><a href="https://instagram.com/sveapanelen" target="_blank" rel="noopener noreferrer">SveaPanelen Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SveaPanelen & PollFlow. All rights reserved.</p>
      </div>
    </footer>
  );
}