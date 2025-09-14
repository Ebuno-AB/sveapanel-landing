
// return (
//   <>
//     <div className="">
//       <header className="landing-header">
//         <div className="logo-container">
//           <Link to="/">
//             <img
//               src={logoImage}
//               alt="Sveapanelen logo"
//               className="logo-img"
//             />
//           </Link>
//         </div>
//       </header>

//       {/* Centered container for the hero section */}
//       <section className="custom-hero fade-in">
//         <ParticlesComponent />
//         <div className="custom-hero-content">
//           {/*
//           <img src={gameIcon1} alt="Game" className="game-icon game-icon-1" />

//           <img src={gameIcon2} alt="Game" className="game-icon game-icon-2" />
//           <img src={gameIcon3} alt="Game" className="game-icon game-icon-3" /> */}
//           {/* <img
//             src={icon1}
//             alt="Game"
//             className="game-icon game-icon-5"
//             style={{ left: "30%", top: "10%", opacity: "0.8" }}
//           />
//           <img src={icon2} alt="Game" className="game-icon game-icon-5" /> */}

//           {/* Left: Text */}
//           <div className="custom-hero-left">
//             <span className="custom-welcome">Välkommen till</span>
//             <h1 className="custom-title">
//               Betalda undersökningar.
//               <br />
//               Som du kan lita på.
//             </h1>
//             <p className="custom-desc">
//               Vi är ett företag som hjälper dig att tjäna pengar på att svara
//               på enkäter och spela spel!
//             </p>

//             {isRegistered ? (
//               <div className="">
//                 <button
//                   className="custom-app-btn"
//                   onClick={handleBankIDRegistration}
//                 >
//                   Registrera dig med BankID
//                   <img
//                     src={BankIdLogo}
//                     style={{
//                       width: "50px",
//                       height: "auto",
//                       marginLeft: "8px",
//                     }}
//                   />
//                 </button>
//                 <p style={{ fontSize: "1rem" }}>
//                   Registrera dig för att få tillgång till våra tjänster{" "}
//                 </p>
//               </div>
//             ) : (
//               // Show app store buttons for registered users
//               <div className="custom-app-buttons">
//                 <button
//                   className="custom-app-btn"
//                   onClick={handleAppDownload}
//                 >
//                   Ladda ner appen
//                   <img src={logo} style={{ width: "35px", height: "35px" }} />
//                 </button>
//                 {/* <button
//                   className="custom-app-btn google"
//                   onClick={handleAppDownload}
//                 >
//                   <img src={googleImage} alt="Google" />
//                   Google Play
//                 </button>
//                 <button
//                   className="custom-app-btn apple"
//                   onClick={handleAppDownload}
//                 >
//                   <img src={appleImage} alt="Apple" />
//                   App Store
//                 </button> */}
//               </div>
//             )}
//           </div>
//           {/* Right: Phone mockup and cards */}
//           <div className="custom-hero-right">
//             {!isPhone() && (
//               <div className="custom-phone-stack">
//                 <img
//                   src={globeImage}
//                   alt="mobileImage"
//                   className={`fade-image ${fade ? "fade-in" : "fade-out"}`}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </div>

//     {/* Live Earnings Counter - positioned for maximum impact */}

//     {/* Services Section - now outside landing-root for white background */}
//     <div className="services-section">
//       <h2 className="services-heading">
//         Tjäna pengar med <br />{" "}
//         <span className="text-black">SveaPanelen</span>
//       </h2>
//       <p className="services-subheading">
//         Med tre enkla steg kan du tjäna pengar på att svara på enkäter!
//       </p>

//       <div className="cards-container">
//         <div className="card">
//           <img
//             src={gameBird}
//             alt="Game"
//             className="card-img"
//             style={{ width: "130px", height: "130px" }}
//           />
//           <div className="card-text">Spela och tjäna poäng!</div>
//           <p>
//             Lorem ipsum dolor sit amet consectetur <br />
//             adipisicing elit. Quisquam, quos.
//           </p>
//         </div>
//         <div className="card">
//           <img src={marioBird} alt="Game" className="card-img" />
//           <div className="card-text">Upptäck nya spel!</div>
//           <p>
//             Lorem ipsum dolor sit amet consectetur <br />
//             adipisicing elit. Quisquam, quos.
//           </p>
//         </div>
//         <div className="card">
//           <img src={rewardBird} alt="Game" className="card-img" />
//           <div className="card-text">Få belöningar direkt!</div>
//           <p>
//             Lorem ipsum dolor sit amet consectetur <br />
//             adipisicing elit. Quisquam, quos.
//           </p>
//         </div>
//       </div>
//       <LiveEarningsCounter />
//       <RatingsSection />

//       {/* IMAGES*/}

//       {/* <img ref={el => { splineRefs.current[0] = el; }} src={games} alt="Game" className="spline-img" />
//      <img ref={el => { splineRefs.current[1] = el; }} src={forms} alt="Game" className="spline-img" /> */}

//       {/* Discover Games & Earn Rewards Section */}

//       {/* 1st block */}
//       <div className="features-section">
//         <div className="feature-block">
//           <div className="feature-content">
//             <div className="feature-icon">
//               <Gamepad2 size={24} className="highlight" />
//             </div>
//             <div className="feature-header">SPEL</div>
//             <h2 className="feature-title">Upptäck Spel</h2>
//             <p className="feature-description">
//               Våra spel är anpassade för dig. Hitta ett spel du gillar och
//               börja spela. Ju längre du spelar, desto fler poäng får du.
//             </p>
//           </div>
//           <div className="feature-graphics">
//             <div className="game-icons">
//               <img src={gameCards} style={{ width: "80%" }} />
//             </div>
//           </div>
//         </div>

//         {/* 2nd block */}
//         <div className="feature-block">
//           <div className="feature-content">
//             <div className="feature-icon">
//               <List size={24} className="highlight" />
//             </div>
//             <div className="feature-header">FORMULÄR</div>
//             <h2 className="feature-title">Fyll i formulär</h2>
//             <p className="feature-description">
//               Fyll i formulär och få pengar direkt via Swish, utan
//               uttagsgränser. Lorem ipsum dolor sit amet consectetur
//               adipisicing elit. Quisquam, quos.
//             </p>
//           </div>
//           <div className="feature-graphics">
//             <div className="game-icons">
//               <img src={FormImg} />
//             </div>
//           </div>
//         </div>

//         {/* 3rd block */}
//         <div className="feature-block">
//           <div className="feature-graphics">
//             <div className="reward-cards">
//               <img src={money} />
//             </div>
//           </div>

//           <div className="feature-content">
//             <div className="feature-icon">
//               <DollarSign size={24} className="highlight" />
//             </div>
//             <div className="feature-header">Swish</div>
//             <h2 className="feature-title">Tjäna pengar</h2>
//             <p className="feature-description">
//               Få pengar direkt via Swish, utan uttagsgränser. Lorem ipsum
//               dolor sit amet consectetur adipisicing elit. Quisquam, quos.
//             </p>
//           </div>

//           {/* 4th block */}
//         </div>
//         <div className="feature-block">
//           <div className="feature-graphics">
//             <div className="reward-cards">
//               <img src={tokens} style={{ width: "50%" }} />
//             </div>
//           </div>
//           <div className="feature-content">
//             <div className="feature-icon">
//               <Gift size={24} className="highlight" />
//             </div>
//             <div className="feature-header">POÄNG</div>
//             <h2 className="feature-title">Formulär</h2>
//             <p className="feature-description">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit.
//               Quisquam, quos. Lorem ipsum dolor sit amet consectetur
//               adipisicing elit. Quisquam, quos.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ABOUT FORM */}
//       <div className="about-form">
//         <div className="about-form-header">
//           <h2 className="about-form-title">
//             Vanliga frågor om betalda undersökningar
//           </h2>
//           <p className="about-form-subtitle">
//             Här får du svar på dina vanligaste frågor om hur du tjänar pengar
//             genom att svara på enkäter
//           </p>
//         </div>

//         <div className="info-container">
//           <div className="info-card">
//             <div className="info-card-content">
//               <h3 className="info-title">
//                 Vad brukar belöningarna ligga på?
//               </h3>
//               <p className="info-desc">
//                 Belöningarna brukar ligga runt 1-50kr per enkät, beroende på
//                 längd och komplexitet.
//               </p>
//             </div>
//           </div>
//           <div className="info-card">
//             <div className="info-card-content">
//               <h3 className="info-title">Hur långa är undersökningarna?</h3>
//               <p className="info-desc">
//                 Undersökningarna är från 1-25 minuter långa, så du kan välja
//                 vad som passar dig bäst.
//               </p>
//             </div>
//           </div>
//           <div className="info-card">
//             <div className="info-card-content">
//               <h3 className="info-title">Hur får jag pengarna?</h3>
//               <p className="info-desc">
//                 Du får pengar direkt via Swish, utan uttagsgränser eller dolda
//                 avgifter.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div
//         className="foldable-cards-section-margin"
//         id="foldable-cards-section"
//       >
//         <h3 className="foldable-cards-section-title">Frågor och svar</h3>
//         {/* Foldable Cards Section */}
//         <div className="foldable-cards-section">
//           <FoldableCard title="Hur fungerar det?" defaultOpen={false}>
//             <p>
//               Du registrerar dig, svarar på enkäter och tjänar pengar direkt
//               via Swish. Det är så enkelt!
//             </p>
//             <ul>
//               <li>Registrera dig gratis</li>
//               <li>Svara på enkäter</li>
//               <li>Få pengar via Swish</li>
//             </ul>
//           </FoldableCard>

//           <FoldableCard
//             title="Vad är betalda undersökningar?"
//             defaultOpen={false}
//           >
//             <p>
//               Betalda undersökningar är enkäter som företag betalar dig för
//               att svara på. Här är hur det fungerar:
//             </p>
//             <ul>
//               <li>
//                 <strong>Företag behöver feedback:</strong> Många företag vill
//                 testa sina produkter och idéer innan de lanseras. De vänder
//                 sig till panelföretag som SveaPanelen för att sätta upp
//                 undersökningar.
//               </li>
//               <li>
//                 <strong>Du får betalt:</strong> Vi visar undersökningarna för
//                 våra användare och betalar ut belöningar för deltagandet. Alla
//                 belöningar kan tas ut till Swish, direkt till ditt konto, utan
//                 uttagsgränser.
//               </li>
//               <li>
//                 <strong>Extra tävlingar:</strong> Vi erbjuder även tävlingar
//                 för de som gör flest enkäter eller bjuder in flest användare.
//                 Du kan vinna häftiga priser som betalas ut varje vecka!
//               </li>
//             </ul>
//           </FoldableCard>

//           <FoldableCard
//             title="Vad kan man tjäna med betalda undersökningar?"
//             defaultOpen={false}
//           >
//             <p>
//               Betalda undersökningar erbjuder möjligheten att tjäna extra
//               pengar på fritiden genom att dela med sig av sina åsikter och
//               tankar om olika produkter och tjänster.
//             </p>
//             <ul>
//               <li>
//                 <strong>Extra inkomst:</strong> Med minimal ansträngning kan
//                 du få en extra inkomst som kan hjälpa dig att spara pengar
//                 eller finansiera dina fritidsintressen.
//               </li>
//               <li>
//                 <strong>Små belopp blir stora:</strong> Även om det är mindre
//                 belopp som du kan tjäna på undersökningar så kan små belopp
//                 sammanlagt bli ett bra tillskott.
//               </li>
//               <li>
//                 <strong>Lunch betald:</strong> Genom att vara aktiv då och då
//                 kan du få lunchen betald.
//               </li>
//             </ul>
//             <p>
//               <strong>Kom igång redan idag:</strong> Börja att tjäna pengar på
//               enkäter och ladda ner appen på App Store eller Google Play.
//             </p>
//           </FoldableCard>

//           <FoldableCard title="Vilka belöningar kan jag få?">
//             <p>Du kan välja mellan olika belöningar:</p>
//             <ul>
//               <li>Swish-betalningar</li>
//               <li>Presentkort till Amazon</li>
//               <li>Google Play-kort</li>
//               <li>PayPal-betalningar</li>
//             </ul>
//           </FoldableCard>

//           <FoldableCard title="Hur mycket kan jag tjäna?">
//             <p>
//               Belöningarna varierar beroende på enkätens längd och
//               komplexitet:
//             </p>
//             <ul>
//               <li>Korta enkäter: 1-10 kr</li>
//               <li>Mellanlånga enkäter: 10-25 kr</li>
//               <li>Långa enkäter: 25-50 kr</li>
//             </ul>
//           </FoldableCard>

//           <FoldableCard title="Varför just oss?" defaultOpen={false}>
//             <p>
//               Vi är ett företag som hjälper dig att tjäna pengar på att svara
//               på enkäter!
//             </p>
//             <ul>
//               <li>
//                 Vi är ett företag som hjälper dig att tjäna pengar på att
//                 svara på enkäter!
//               </li>
//               <li>
//                 Vi är ett företag som hjälper dig att tjäna pengar på att
//                 svara på enkäter!
//               </li>
//             </ul>
//           </FoldableCard>
//         </div>
//       </div>
//     </div>
//     <Footer />
//     {/* QR Modal */}
//     {/* BankID Registration Modal */}
//     <QRModal
//       isOpen={isModalOpen}
//       onClose={handleModalClose}
//       qrCodeUrl={qrCodeUrl}
//       isLoading={isLoading}
//       error={error || undefined}
//       success={success || undefined}
//     />

//     {/* Success Modal for Mobile Registration */}
//     <QRModal
//       isOpen={showSuccessModal}
//       onClose={() => setShowSuccessModal(false)}
//       success={{
//         title: "Registrering lyckades!",
//         message:
//           "Du har registrerats framgångsrikt med BankID! Du kan nu ladda ner appen för att börja tjäna pengar.",
//         onClose: () => setShowSuccessModal(false),
//       }}
//     />

//     {/* App Download QR Modal */}
//     <AppDownloadQRModal
//       isOpen={isAppDownloadQRModalOpen}
//       onClose={() => setIsAppDownloadQRModalOpen(false)}
//     />

//     {/* Mobile BankID handling - removed since we now redirect directly */}

//     {/* Cookies Consent Banner */}
//     <CookiesConsent
//       onAccept={() => {
//         console.log("Cookies accepted");
//         setCookiesAccepted(true);
//         // Track that user accepted cookies
//         console.log("Cookies accepted");
//       }}
//       onDecline={() => {
//         console.log("Cookies declined");
//         setCookiesAccepted(false);
//         // Track that user declined cookies
//         console.log("Cookies declined");
//       }}
//     />
//   </>
// );
