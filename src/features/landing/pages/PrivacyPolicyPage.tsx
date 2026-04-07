"use client";
import {
  Container,
  Typography,
  Paper,
  Box,
  Link,
  Divider,
} from "@mui/material";
import "@/App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSearchParams } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily:
      "Cereal, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          html, body, #__next { height: 100%;background-color:#fff;  }
          body, * { font-family: Cereal, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; }
        `,
    },
  },
});

const Section = ({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) => (
  <Box id={id} sx={{ mb: { xs: 4, md: 5 }, scrollMarginTop: "24px" }}>
    <Typography
      variant="h5"
      component="h2"
      sx={{
        fontWeight: 700,
        fontSize: { xs: "1.25rem", md: "1.5rem" },
        mb: 2,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const SubSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="h6"
      sx={{
        fontWeight: 600,
        fontSize: { xs: "1.05rem", md: "1.2rem" },
        mb: 1.5,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const BulletList = ({ items }: { items: string[] }) => (
  <Box
    component="ul"
    sx={{
      pl: 2.5,
      mb: 2,
      "& li": {
        mb: 0.75,
        fontSize: { xs: "0.9rem", md: "1rem" },
        lineHeight: 1.6,
        color: "#374151",
      },
    }}
  >
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </Box>
);

const DataCard = ({
  title,
  processing,
  personalData,
  legalBasis,
  storagePeriod,
  notes,
  isEn,
}: {
  title: string;
  processing: string[];
  personalData: { label?: string; items: string[] };
  legalBasis: { basis: string; description: string }[];
  storagePeriod: string;
  notes?: string[];
  isEn: boolean;
}) => (
  <Paper
    elevation={0}
    sx={{
      border: "1px solid #e5e7eb",
      borderRadius: 2,
      overflow: "hidden",
      mb: 3,
    }}
  >
    <Box
      sx={{
        bgcolor: "#f8f9fa",
        px: { xs: 2, md: 3 },
        py: 1.5,
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 700, fontSize: { xs: "0.95rem", md: "1.05rem" } }}
      >
        {title}
      </Typography>
    </Box>

    <Box sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
      <Typography
        variant="overline"
        sx={{
          color: "#6b7280",
          fontWeight: 600,
          fontSize: "0.7rem",
          letterSpacing: 1,
        }}
      >
        {isEn ? "What processing we perform" : "Vilken behandling vi utför"}
      </Typography>
      <BulletList items={processing} />

      {notes &&
        notes.map((note, i) => (
          <Typography
            key={i}
            sx={{
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              color: "#6b7280",
              fontStyle: "italic",
              mb: 2,
              pl: 1,
              borderLeft: "2px solid #e5e7eb",
            }}
          >
            {note}
          </Typography>
        ))}

      <Divider sx={{ my: 1.5 }} />

      <Typography
        variant="overline"
        sx={{
          color: "#6b7280",
          fontWeight: 600,
          fontSize: "0.7rem",
          letterSpacing: 1,
        }}
      >
        {isEn ? "What personal data we process" : "Vilka personuppgifter vi behandlar"}
      </Typography>
      {personalData.label && (
        <Typography
          sx={{
            fontSize: { xs: "0.9rem", md: "0.95rem" },
            fontWeight: 600,
            mb: 0.5,
            mt: 0.5,
          }}
        >
          {personalData.label}
        </Typography>
      )}
      <BulletList items={personalData.items} />

      <Divider sx={{ my: 1.5 }} />

      <Typography
        variant="overline"
        sx={{
          color: "#6b7280",
          fontWeight: 600,
          fontSize: "0.7rem",
          letterSpacing: 1,
        }}
      >
        {isEn ? "Our lawful basis for the processing" : "Vår lagliga grund för behandlingen"}
      </Typography>
      {legalBasis.map((lb, i) => (
        <Box key={i} sx={{ mt: 1, mb: 1.5 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              color: "#1f2937",
            }}
          >
            {lb.basis}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.85rem", md: "0.9rem" },
              color: "#374151",
              lineHeight: 1.6,
              mt: 0.25,
            }}
          >
            {lb.description}
          </Typography>
        </Box>
      ))}
    </Box>

    <Box
      sx={{
        bgcolor: "#f0fdf4",
        px: { xs: 2, md: 3 },
        py: 1.5,
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: "0.8rem", md: "0.85rem" },
          color: "#374151",
        }}
      >
        <strong>{isEn ? "Storage period:" : "Lagringsperiod:"}</strong> {storagePeriod}
      </Typography>
    </Box>
  </Paper>
);

const Paragraph = ({
  children,
  mb = 2,
}: {
  children: React.ReactNode;
  mb?: number;
}) => (
  <Typography
    sx={{
      fontSize: { xs: "0.95rem", md: "1rem" },
      lineHeight: 1.7,
      color: "#374151",
      mb,
    }}
  >
    {children}
  </Typography>
);

const TermsPage = () => {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  const isEn = lang === "en";

  const AppName = "SveaPanelen";
  const SupportEmail = "help@sveapanelen.se";

  return (
    <ThemeProvider theme={theme}>
      <style>{`
        body { background-color: #fff; }
        html { background-color: #fff !important; }
      `}</style>
      <Container
        maxWidth="md"
        sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 5 } }}
      >
        {/* Header */}
        <Box sx={{ mb: { xs: 3, md: 5 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
              mb: 3,
            }}
          >
            {isEn ? "Privacy Policy" : "Integritetspolicy"}
          </Typography>

          <Paragraph>
            {isEn
              ? `Flow Group AB, a Swedish company with company organization number 559183-6027 ("Flow Group", "${AppName}", "we", "our" or "us"), is responsible for the processing of your personal data as described below. This privacy policy concerns you who register an account and become an ${AppName} user.`
              : `Flow Group AB, ett svenskt företag med organisationsnummer 559183-6027 ("Flow Group", "${AppName}", "vi", "vår" eller "oss"), är ansvarig för behandlingen av dina personuppgifter enligt nedan. Denna integritetspolicy avser dig som registrerar ett konto och blir en ${AppName}-användare.`}
          </Paragraph>

          <Paragraph>
            {isEn
              ? `${AppName}, a platform built by Flow Group under the PollFlow project, is a company based in Sweden with organization number 559183-6027`
              : `${AppName}, en plattform byggd av Flow Group under PollFlow-projektet, är ett företag baserat i Sverige med organisationsnummer 559183-6027`}
          </Paragraph>

          <Paragraph mb={3}>
            {isEn
              ? "We care about and value your privacy. Through this privacy policy we therefore wish to provide you with information on how we process your personal data as well as what rights you have in relation to our processing of your personal data."
              : "Vi bryr oss om och värdesätter din integritet. Genom denna integritetspolicy vill vi därför ge dig information om hur vi behandlar dina personuppgifter samt vilka rättigheter du har i förhållande till vår behandling av dina personuppgifter."}
          </Paragraph>

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.95rem", md: "1rem" },
              mb: 1.5,
            }}
          >
            {isEn
              ? "We process your personal data for the following general purposes:"
              : "Vi behandlar dina personuppgifter för följande allmänna ändamål:"}
          </Typography>

          <BulletList
            items={isEn ? [
              `To create and administer your account at ${AppName};`,
              `To create and administer your profile at ${AppName};`,
              "To match your profile with surveys that are relevant for you;",
              "To provide surveys;",
              "To provide cashback services for online shopping;",
              "To provide mobile game offers and rewards;",
              "To provide skill-based quiz games;",
              "To administer your withdrawal of virtual currency via Swish;",
              "To provide customer service and improve our website by analyzing feedback;",
              "To administer your interactions with us on our social media account;",
              "To detect and prevent fraud and misuse of our services; and",
              "To comply with our legal obligations and handle possible legal claims.",
            ] : [
              `Att skapa och administrera ditt konto på ${AppName};`,
              `Att skapa och administrera din profil på ${AppName};`,
              "Att matcha din profil med undersökningar som är relevanta för dig;",
              "Att tillhandahålla undersökningar;",
              "Att tillhandahålla cashback-tjänster för onlineshopping;",
              "Att tillhandahålla mobilspelserbjudanden och belöningar;",
              "Att tillhandahålla kunskapsbaserade quizspel;",
              "Att administrera ditt uttag av virtuell valuta via Swish;",
              "Att tillhandahålla kundservice och förbättra vår webbplats genom att analysera feedback;",
              "Att administrera dina interaktioner med oss på vårt konto i sociala medier;",
              "Att upptäcka och förhindra bedrägerier och missbruk av våra tjänster; och",
              "Att uppfylla våra rättsliga förpliktelser och hantera eventuella rättsliga anspråk.",
            ]}
          />

          <Paragraph>
            {isEn
              ? `Below you can read more about how we process your personal data. Should you have any questions regarding our processing of your personal data, or if you wish to exercise any of your rights under data protection legislation, please contact us via our email address ${SupportEmail}. Our postal address is Flow Group AB Luntmakargatan 54B, 113 58, Stockholm.`
              : `Nedan kan du läsa mer om hur vi behandlar dina personuppgifter. Om du har några frågor angående vår behandling av dina personuppgifter, eller om du vill utöva någon av dina rättigheter enligt dataskyddslagstiftningen, vänligen kontakta oss via vår e-postadress ${SupportEmail}. Vår postadress är Flow Group AB Luntmakargatan 54B, 113 58, Stockholm.`}
          </Paragraph>

        </Box>

        {/* Table of Contents */}
        <Paper
          elevation={0}
          sx={{
            border: "1px solid #e5e7eb",
            borderRadius: 2,
            p: { xs: 2, md: 3 },
            mb: { xs: 4, md: 5 },
            bgcolor: "#f9fafb",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 1.5,
              fontSize: { xs: "1rem", md: "1.15rem" },
            }}
          >
            {isEn ? "Table of Contents" : "Innehållsförteckning"}
          </Typography>
          <Box
            component="nav"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Link
              href="#age-requirement"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn ? "Age requirement" : "Ålderskrav"}
            </Link>
            <Link
              href="#from-where"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn
                ? "From where do we collect your personal data and are you required to provide personal data to us?"
                : "Varifrån samlar vi in dina personuppgifter och är du skyldig att lämna personuppgifter till oss?"}
            </Link>
            <Link
              href="#who-can-access"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn
                ? "Who can gain access to your personal data and why?"
                : "Vem kan få tillgång till dina personuppgifter och varför?"}
            </Link>
            <Link
              href="#where-processed"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn
                ? "Where are your personal data processed?"
                : "Var behandlas dina personuppgifter?"}
            </Link>
            <Link
              href="#your-rights"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn
                ? "What rights do you have in relation to our processing of your personal data?"
                : "Vilka rättigheter har du i förhållande till vår behandling av dina personuppgifter?"}
            </Link>
            <Link
              href="#virtual-currency"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn ? "Virtual currency" : "Virtuell valuta"}
            </Link>
            <Link
              href="#detailed-description"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn
                ? "Detailed description on how we process your personal data"
                : "Detaljerad beskrivning av hur vi behandlar dina personuppgifter"}
            </Link>
            <Link
              href="#analytics-tracking"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn ? "Analytics and tracking technologies" : "Analys- och spårningstekniker"}
            </Link>
            <Link
              href="#automated-decisions"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn ? "Automated decision-making" : "Automatiserat beslutsfattande"}
            </Link>
            <Link
              href="#account-deletion"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn ? "Account deletion and data retention" : "Kontoradering och datalagring"}
            </Link>
            <Link
              href="#business-transfers"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn ? "Business transfers" : "Verksamhetsöverlåtelser"}
            </Link>
            <Link
              href="#data-breach"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn ? "Data breach procedures" : "Rutiner vid personuppgiftsincidenter"}
            </Link>
            <Link
              href="#cookies"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn ? "Cookies and similar technologies" : "Cookies och liknande tekniker"}
            </Link>
            <Link
              href="#balancing-of-interests"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              {isEn ? "Balancing of interests assessments" : "Intresseavvägningar"}
            </Link>
          </Box>
        </Paper>

        {/* Section: Age requirement */}
        <Section id="age-requirement" title={isEn ? "Age requirement" : "Ålderskrav"}>
          <Paragraph>
            {isEn
              ? `You must be at least 13 years of age to use ${AppName}, in accordance with Swedish data protection legislation. If you are under 18 years of age, you must have your parent or legal guardian's permission to access and use the service. Please note that registration requires Swedish BankID, which may have its own age requirements. We do not knowingly collect personal data from children under 13. If we become aware that we have collected personal data from a child under 13, we will take steps to delete that information.`
              : `Du måste vara minst 13 år för att använda ${AppName}, i enlighet med svensk dataskyddslagstiftning. Om du är under 18 år måste du ha din förälders eller vårdnadshavares tillstånd för att få tillgång till och använda tjänsten. Observera att registrering kräver svenskt BankID, som kan ha egna ålderskrav. Vi samlar inte medvetet in personuppgifter från barn under 13 år. Om vi får kännedom om att vi har samlat in personuppgifter från ett barn under 13 år kommer vi att vidta åtgärder för att radera den informationen.`}
          </Paragraph>
        </Section>

        {/* Section: From where */}
        <Section
          id="from-where"
          title={isEn
            ? "From where do we collect your personal data and are you required to provide personal data to us?"
            : "Varifrån samlar vi in dina personuppgifter och är du skyldig att lämna personuppgifter till oss?"}
        >
          <Paragraph>
            {isEn
              ? "We collect your personal data directly from you, for example when you register an account and answer our profiling questions."
              : "Vi samlar in dina personuppgifter direkt från dig, till exempel när du registrerar ett konto och svarar på våra profileringsfrågor."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "When you register an account, we collect identity information through Swedish BankID, including your full name, social security number (personnummer), and date of birth. Your social security number is required for secure identity verification and is necessary under Swedish law for processing Swish payments. We also collect your email address, phone number, and postal code during the registration process."
              : "När du registrerar ett konto samlar vi in identitetsinformation via svenskt BankID, inklusive ditt fullständiga namn, personnummer och födelsedatum. Ditt personnummer krävs för säker identitetsverifiering och är nödvändigt enligt svensk lag för att behandla Swish-betalningar. Vi samlar även in din e-postadress, ditt telefonnummer och ditt postnummer under registreringsprocessen."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "We automatically collect certain technical data from your device, including your IP address, device model and type, operating system version, app version, timezone, advertising identifier, and country of origin. This data is collected through our app and is used for service delivery, fraud prevention, and analytics purposes."
              : "Vi samlar automatiskt in viss teknisk data från din enhet, inklusive din IP-adress, enhetsmodell och typ, operativsystemversion, appversion, tidszon, annonsidentifierare och ursprungsland. Denna data samlas in via vår app och används för tjänsteleverans, bedrägeriförebyggande och analysändamål."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "When you use our cashback service, we collect data about your clicks and transactions through our affiliate network partners. This includes click timestamps, the store visited, and transaction details provided by the affiliate networks."
              : "När du använder vår cashback-tjänst samlar vi in data om dina klick och transaktioner via våra affiliatenätverkspartners. Detta inkluderar klicktidsstämplar, vilken butik som besöktes och transaktionsdetaljer som tillhandahålls av affiliatenätverken."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "In some of our profiling questions you can choose to share sensitive personal data (e.g. data about your health) with us. Answering these questions is optional and we will process the data you share with us only if you give your explicit consent."
              : "I vissa av våra profileringsfrågor kan du välja att dela känsliga personuppgifter (t.ex. uppgifter om din hälsa) med oss. Att svara på dessa frågor är frivilligt och vi kommer att behandla de uppgifter du delar med oss endast om du ger ditt uttryckliga samtycke."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? 'Generally, you are free to choose if you want to provide your personal data to us. It is however in some instances necessary for you to provide personal data to us, e.g. to register an account. What exact personal data we require from you can be found in the tables below in relation to the legal bases "fulfilment of contract" and "legal obligation". The data we require from you is never sensitive data.'
              : 'Generellt sett är du fri att välja om du vill lämna dina personuppgifter till oss. I vissa fall är det dock nödvändigt att du lämnar personuppgifter till oss, t.ex. för att registrera ett konto. Vilka exakta personuppgifter vi kräver av dig framgår av tabellerna nedan i förhållande till de rättsliga grunderna "fullgörande av avtal" och "rättslig förpliktelse". De uppgifter vi kräver av dig är aldrig känsliga uppgifter.'}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "If you don't provide us with certain requested personal data, you will not be able to participate in the surveys or games we provide or create and use an account. Furthermore, we will not be able to comply with bookkeeping and accounting law and handle possible legal claims."
              : "Om du inte lämnar vissa begärda personuppgifter till oss kommer du inte att kunna delta i de undersökningar eller spel vi tillhandahåller eller skapa och använda ett konto. Dessutom kommer vi inte att kunna uppfylla kraven i bokförings- och redovisningslagstiftningen och hantera eventuella rättsliga anspråk."}
          </Paragraph>
        </Section>

        {/* Section: Who can access */}
        <Section
          id="who-can-access"
          title={isEn
            ? "Who can gain access to your personal data and why?"
            : "Vem kan få tillgång till dina personuppgifter och varför?"}
        >
          <Paragraph>
            {isEn
              ? "Your personal data is primarily processed by Flow Group AB under the PollFlow project. However, in certain instances, we share your personal data with third parties in accordance with below."
              : "Dina personuppgifter behandlas i första hand av Flow Group AB inom PollFlow-projektet. I vissa fall delar vi dock dina personuppgifter med tredje parter i enlighet med nedan."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "If you want to know more about who we share your personal data with, please feel free to contact us. Our contact details can be found in the beginning of this privacy policy."
              : "Om du vill veta mer om vilka vi delar dina personuppgifter med, tveka inte att kontakta oss. Våra kontaktuppgifter finns i början av denna integritetspolicy."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "No matter the purpose for our processing of your personal data, we will share your personal data with our IT-suppliers who will process these on our behalf and on our instructions in order to ensure good and secure IT-operations. We only share your personal data with our IT-suppliers if it is necessary in order for them to fulfil their obligations towards us according to the contract that we have with them."
              : "Oavsett syftet med vår behandling av dina personuppgifter kommer vi att dela dina personuppgifter med våra IT-leverantörer som behandlar dessa för vår räkning och enligt våra instruktioner för att säkerställa god och säker IT-drift. Vi delar endast dina personuppgifter med våra IT-leverantörer om det är nödvändigt för att de ska kunna fullgöra sina åtaganden gentemot oss enligt det avtal vi har med dem."}
          </Paragraph>

          <SubSection title={isEn ? "If you participate in surveys" : "Om du deltar i undersökningar"}>
            <BulletList
              items={isEn ? [
                "In order to provide you with surveys that are relevant for you, we share your personal data with our survey partners who match your profile to available surveys. Our partners act as intermediating parties between us and the companies looking for participants in surveys by matching your profile to the needs of the survey companies.",
                "Any information you provide directly within a survey is processed by the third-party survey provider, not by SveaPanelen. We do not have access to your individual survey responses. The survey provider is a separate data controller for the data you provide within their surveys.",
              ] : [
                "För att kunna erbjuda dig undersökningar som är relevanta för dig delar vi dina personuppgifter med våra undersökningspartners som matchar din profil mot tillgängliga undersökningar. Våra partners agerar som förmedlande parter mellan oss och de företag som söker deltagare i undersökningar genom att matcha din profil mot undersökningsföretagens behov.",
                "All information du lämnar direkt i en undersökning behandlas av den tredje parts undersökningsleverantören, inte av SveaPanelen. Vi har inte tillgång till dina individuella undersökningssvar. Undersökningsleverantören är en separat personuppgiftsansvarig för de uppgifter du lämnar i deras undersökningar.",
              ]}
            />
          </SubSection>

          <SubSection title={isEn ? "If you use our cashback service" : "Om du använder vår cashback-tjänst"}>
            <BulletList
              items={isEn ? [
                "In order to track your purchases and attribute cashback, we share data with our affiliate network partners. These networks process click and transaction data to verify purchases and calculate commissions.",
                "Each store you shop at through our cashback service is subject to its own terms and conditions. We are not a party to the agreement between you and the store. The store is a separate data controller for data you provide during your purchase.",
              ] : [
                "För att spåra dina köp och tillskriva cashback delar vi data med våra affiliatenätverkspartners. Dessa nätverk behandlar klick- och transaktionsdata för att verifiera köp och beräkna provisioner.",
                "Varje butik du handlar hos via vår cashback-tjänst har sina egna villkor. Vi är inte part i avtalet mellan dig och butiken. Butiken är en separat personuppgiftsansvarig för de uppgifter du lämnar under ditt köp.",
              ]}
            />
          </SubSection>

          <SubSection title={isEn ? "If you use mobile game offers" : "Om du använder mobilspelserbjudanden"}>
            <BulletList
              items={isEn ? [
                "In order to provide mobile game offers and verify completion of offer requirements, we share data with our game offer partners. These partners receive your device identifier, advertising ID, IP address, and information about your progress in the offered games.",
              ] : [
                "För att tillhandahålla mobilspelserbjudanden och verifiera att erbjudandekraven uppfyllts delar vi data med våra spelserbjudandepartners. Dessa partners tar emot din enhetsidentifierare, annons-ID, IP-adress och information om dina framsteg i de erbjudna spelen.",
              ]}
            />
          </SubSection>

          <SubSection title={isEn ? "If you withdraw your earnings via Swish" : "Om du tar ut dina intjänade medel via Swish"}>
            <BulletList
              items={isEn ? [
                "In order to process your Swish withdrawal, we share your full name, social security number, Swish phone number, and withdrawal amount with our payment processing service to complete the transaction.",
              ] : [
                "För att behandla ditt Swish-uttag delar vi ditt fullständiga namn, personnummer, Swish-telefonnummer och uttagsbelopp med vår betaltjänstleverantör för att slutföra transaktionen.",
              ]}
            />
          </SubSection>
        </Section>

        {/* Section: Where processed */}
        <Section
          id="where-processed"
          title={isEn ? "Where are your personal data processed?" : "Var behandlas dina personuppgifter?"}
        >
          <Paragraph>
            {isEn
              ? "We, as well as our processors, mainly process your personal data within EU/EEA. When we process your personal data outside of the EU/EEA we do so because our partner, which help us match your profile to surveys you find interesting and relevant, will store your personal data outside of the EU/EEA."
              : "Vi, liksom våra personuppgiftsbiträden, behandlar i huvudsak dina personuppgifter inom EU/EES. När vi behandlar dina personuppgifter utanför EU/EES beror det på att vår partner, som hjälper oss att matcha din profil mot undersökningar som du finner intressanta och relevanta, lagrar dina personuppgifter utanför EU/EES."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "Some of our affiliate network partners and game offer providers may also process data outside of the EU/EEA."
              : "Vissa av våra affiliatenätverkspartners och spelserbjudandeleverantörer kan också behandla data utanför EU/EES."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "When we transfer your personal data outside of the EU/EEA, we do so based on either a decision from the Commission, standard contractual clauses or other appropriate safeguards as required by applicable data protection legislation."
              : "När vi överför dina personuppgifter utanför EU/EES gör vi det baserat på antingen ett beslut från kommissionen, standardavtalsklausuler eller andra lämpliga skyddsåtgärder som krävs enligt tillämplig dataskyddslagstiftning."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "If you want to know more about who we share your personal data with, please feel free to contact us. Our contact details can be found in the beginning of this privacy policy."
              : "Om du vill veta mer om vilka vi delar dina personuppgifter med, tveka inte att kontakta oss. Våra kontaktuppgifter finns i början av denna integritetspolicy."}
          </Paragraph>
        </Section>

        {/* Section: Your rights */}
        <Section
          id="your-rights"
          title={isEn
            ? "What rights do you have in relation to our processing of your personal data?"
            : "Vilka rättigheter har du i förhållande till vår behandling av dina personuppgifter?"}
        >
          <Paragraph>
            {isEn
              ? "According to applicable data protection legislation, depending on the circumstances, you are entitled to a number of different rights which are set out below."
              : "Enligt tillämplig dataskyddslagstiftning har du, beroende på omständigheterna, rätt till ett antal olika rättigheter som anges nedan."}
          </Paragraph>

          <Paragraph mb={3}>
            {isEn
              ? "If you have any questions regarding these rights or if you want to use any of your rights, you are welcome to contact us. Our contact details can be found in the beginning of this privacy policy."
              : "Om du har några frågor om dessa rättigheter eller om du vill utöva någon av dina rättigheter är du välkommen att kontakta oss. Våra kontaktuppgifter finns i början av denna integritetspolicy."}
          </Paragraph>

          <SubSection title={isEn ? "Right to information and access" : "Rätt till information och tillgång"}>
            <Paragraph>
              {isEn
                ? "You have the right to obtain a confirmation on whether we process your personal data. If we process your personal data, you also have a right to receive information about how we process the personal data and to receive a copy of your personal data."
                : "Du har rätt att få en bekräftelse på om vi behandlar dina personuppgifter. Om vi behandlar dina personuppgifter har du även rätt att få information om hur vi behandlar personuppgifterna och att få en kopia av dina personuppgifter."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Right to rectification" : "Rätt till rättelse"}>
            <Paragraph>
              {isEn
                ? "You have a right to have inaccurate personal data corrected and to have incomplete personal data completed."
                : "Du har rätt att få felaktiga personuppgifter rättade och att få ofullständiga personuppgifter kompletterade."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn
            ? 'Right to erasure ("right to be forgotten") and restriction of processing'
            : 'Rätt till radering ("rätten att bli bortglömd") och begränsning av behandling'}>
            <Paragraph>
              {isEn
                ? "You have the right to have your personal data erased in certain instances. This is the case e.g. when the personal data is no longer necessary for the purposes for which it was collected or otherwise processed and where we process your personal data on the basis of our legitimate interest and we find, following your objection (see below under Right to object), that we do not have an overriding interest in continuing to process it."
                : "Du har rätt att få dina personuppgifter raderade i vissa fall. Detta gäller t.ex. när personuppgifterna inte längre är nödvändiga för de ändamål för vilka de samlades in eller på annat sätt behandlades och när vi behandlar dina personuppgifter på grundval av vårt berättigade intresse och vi finner, efter din invändning (se nedan under Rätt att invända), att vi inte har ett övervägande intresse av att fortsätta behandla dem."}
            </Paragraph>
            <Paragraph>
              {isEn
                ? "You also have a right to request that we restrict our processing of your personal data. For example, when you question the accuracy of the personal data, when you have objected to our processing of your personal data based upon our legitimate interest, or where the processing is unlawful, and you oppose to the erasure of your personal data and instead want us to restrict our processing."
                : "Du har även rätt att begära att vi begränsar vår behandling av dina personuppgifter. Till exempel när du ifrågasätter riktigheten av personuppgifterna, när du har invänt mot vår behandling av dina personuppgifter baserat på vårt berättigade intresse, eller när behandlingen är olaglig och du motsätter dig radering av dina personuppgifter och istället vill att vi begränsar vår behandling."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Right to data portability" : "Rätt till dataportabilitet"}>
            <Paragraph>
              {isEn
                ? "In certain instances, you have a right to be provided with such personal data (concerning you) that you have provided to us, in a structured, commonly used and machine-readable format. You also have a right to in certain instances have such personal data transferred to another controller, where technically feasible."
                : "I vissa fall har du rätt att få sådana personuppgifter (som rör dig) som du har lämnat till oss, i ett strukturerat, allmänt använt och maskinläsbart format. Du har även rätt att i vissa fall få sådana personuppgifter överförda till en annan personuppgiftsansvarig, när det är tekniskt möjligt."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Right to object" : "Rätt att invända"}>
            <Paragraph>
              {isEn
                ? "You have the right to object to our processing of your personal data if we use it for marketing purposes."
                : "Du har rätt att invända mot vår behandling av dina personuppgifter om vi använder dem i marknadsföringssyfte."}
            </Paragraph>
            <Paragraph>
              {isEn
                ? 'You also have a right to object to our processing of your personal data when the processing is based on the legal basis "legitimate interest". The situations when we base our processing on our legitimate interest are stated in the below charts and you can read more about our balancing of interest assessments in the end of this privacy policy. In some instances, we may continue to process your personal data even if you have objected to our processing. This can be the case if we can show compelling legitimate reasons for the processing that outweigh your interests or if it is for the purpose of establishing, exercising or defending against legal claims.'
                : 'Du har även rätt att invända mot vår behandling av dina personuppgifter när behandlingen baseras på den rättsliga grunden "berättigat intresse". De situationer då vi baserar vår behandling på vårt berättigade intresse anges i nedanstående tabeller och du kan läsa mer om våra intresseavvägningar i slutet av denna integritetspolicy. I vissa fall kan vi fortsätta att behandla dina personuppgifter även om du har invänt mot vår behandling. Detta kan vara fallet om vi kan visa tvingande berättigade skäl för behandlingen som väger tyngre än dina intressen eller om det är i syfte att fastställa, utöva eller försvara rättsliga anspråk.'}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Right to withdraw consent" : "Rätt att återkalla samtycke"}>
            <Paragraph>
              {isEn
                ? "You have the right to withdraw a given consent at any time. The withdrawal will not affect the lawfulness of processing based on your consent before the withdrawal."
                : "Du har rätt att återkalla ett givet samtycke när som helst. Återkallelsen påverkar inte lagligheten av behandling som baserats på ditt samtycke innan återkallelsen."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Right to lodge a complaint to a supervisory authority" : "Rätt att lämna klagomål till en tillsynsmyndighet"}>
            <Paragraph>
              {isEn
                ? "You have the right to lodge a complaint to a supervisory authority concerning our processing of your personal data."
                : "Du har rätt att lämna klagomål till en tillsynsmyndighet angående vår behandling av dina personuppgifter."}
            </Paragraph>
            <Paragraph>
              {isEn
                ? "Such a complaint can be filed with the authority in the EU/EEA member state where you live, work or where the alleged infringement of applicable data protection legislation has occurred. In Sweden, the supervisory authority is The Swedish Data Protection Authority."
                : "Ett sådant klagomål kan lämnas till myndigheten i det EU/EES-land där du bor, arbetar eller där den påstådda överträdelsen av tillämplig dataskyddslagstiftning har skett. I Sverige är tillsynsmyndigheten Integritetsskyddsmyndigheten (IMY)."}
            </Paragraph>
          </SubSection>
        </Section>

        {/* Section: Virtual currency */}
        <Section id="virtual-currency" title={isEn ? "Virtual currency" : "Virtuell valuta"}>
          <Paragraph>
            {isEn
              ? `All balances, earnings, and amounts displayed within the ${AppName} app represent virtual currency. Although values may be displayed using the denomination "SEK" or "kr" for ease of understanding, all in-app balances constitute virtual points without monetary value until a withdrawal is successfully completed via Swish. Virtual currency cannot be transferred between users, exchanged outside of the app, or considered as stored monetary value. We reserve the right to adjust conversion rates and virtual currency balances in accordance with our terms of service.`
              : `Alla saldon, intäkter och belopp som visas i ${AppName}-appen representerar virtuell valuta. Även om värden kan visas med beteckningen "SEK" eller "kr" för enklare förståelse utgör alla saldon i appen virtuella poäng utan penningvärde tills ett uttag har genomförts framgångsrikt via Swish. Virtuell valuta kan inte överföras mellan användare, växlas utanför appen eller betraktas som lagrat penningvärde. Vi förbehåller oss rätten att justera omräkningskurser och saldon för virtuell valuta i enlighet med våra användarvillkor.`}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "This includes virtual currency used in our skill-based quiz games, where users can wager virtual points against other users. These wagers do not constitute real-money gambling, as the wagered amounts are virtual currency without monetary value."
              : "Detta inkluderar virtuell valuta som används i våra kunskapsbaserade quizspel, där användare kan satsa virtuella poäng mot andra användare. Dessa satsningar utgör inte spel om riktiga pengar, eftersom de satsade beloppen är virtuell valuta utan penningvärde."}
          </Paragraph>
        </Section>

        {/* Section: Detailed description */}
        <Section
          id="detailed-description"
          title={isEn
            ? "Detailed description on how we process your personal data"
            : "Detaljerad beskrivning av hur vi behandlar dina personuppgifter"}
        >
          <Paragraph mb={3}>
            {isEn
              ? "The below chart describes in detail why we process your personal data, which personal data we process, the lawful basis for the processing and for how long we process your personal data."
              : "Nedanstående tabell beskriver i detalj varför vi behandlar dina personuppgifter, vilka personuppgifter vi behandlar, den rättsliga grunden för behandlingen och hur länge vi behandlar dina personuppgifter."}
          </Paragraph>

          {/* === Account & Profile === */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              mb: 2,
            }}
          >
            {isEn
              ? `If you register an account and become an ${AppName} user`
              : `Om du registrerar ett konto och blir en ${AppName}-användare`}
          </Typography>

          <DataCard
            isEn={isEn}
            title={isEn ? "To administer your account" : "Att administrera ditt konto"}
            processing={isEn ? [
              "To create and enable you to securely use your account, including to communicate with you regarding your account",
              "To give you the benefits of having an account, including e.g. enable you to manage your settings and gain access to your survey history",
              "To keep track of the points you receive from various completed surveys",
              `To calculate your ranking compared to other ${AppName} users based on your points`,
            ] : [
              "Att skapa och göra det möjligt för dig att säkert använda ditt konto, inklusive att kommunicera med dig angående ditt konto",
              "Att ge dig fördelarna med att ha ett konto, inklusive t.ex. möjligheten att hantera dina inställningar och få tillgång till din undersökningshistorik",
              "Att hålla reda på de poäng du får från olika genomförda undersökningar",
              `Att beräkna din ranking jämfört med andra ${AppName}-användare baserat på dina poäng`,
            ]}
            personalData={{
              label: isEn
                ? "Information you provide to us and information collected via BankID, e.g.:"
                : "Information du lämnar till oss och information som samlas in via BankID, t.ex.:",
              items: isEn ? [
                "Name (collected via BankID)",
                "Social security number (collected via BankID)",
                "Date of birth (collected via BankID)",
                "Contact information (email)",
                "Phone number (Swish number)",
                "Postal code and city",
                "Gender",
                "The number of surveys you have completed and points you have collected",
                "Other information you choose to provide to us, such as street address",
              ] : [
                "Namn (insamlat via BankID)",
                "Personnummer (insamlat via BankID)",
                "Födelsedatum (insamlat via BankID)",
                "Kontaktinformation (e-post)",
                "Telefonnummer (Swish-nummer)",
                "Postnummer och ort",
                "Kön",
                "Antalet undersökningar du har genomfört och poäng du har samlat",
                "Övrig information du väljer att lämna till oss, t.ex. gatuadress",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Performance of contract",
                description: `The processing is necessary for us to fulfil the contract concerning your registration at ${AppName}.`,
              },
              {
                basis: "Legitimate interest",
                description:
                  "It is not necessary for you to provide us information about your street address to fulfil any contract. This information is instead processed on the basis of our legitimate interest to process your personal data in order to administer your account.",
              },
            ] : [
              {
                basis: "Fullgörande av avtal",
                description: `Behandlingen är nödvändig för att vi ska kunna fullgöra avtalet avseende din registrering på ${AppName}.`,
              },
              {
                basis: "Berättigat intresse",
                description:
                  "Det är inte nödvändigt att du lämnar information om din gatuadress till oss för att fullgöra något avtal. Denna information behandlas istället på grundval av vårt berättigade intresse att behandla dina personuppgifter för att administrera ditt konto.",
              },
            ]}
            storagePeriod={isEn
              ? `We will store your personal data until you choose to delete your account at ${AppName}.`
              : `Vi lagrar dina personuppgifter tills du väljer att radera ditt konto på ${AppName}.`}
          />

          <DataCard
            isEn={isEn}
            title={isEn ? "To administer your account — Referrals" : "Att administrera ditt konto — Värvningar"}
            processing={isEn ? [
              `To keep track of when you have referred a friend to ${AppName} and how many points they have collected in order to reward you with extra points`,
            ] : [
              `Att hålla reda på när du har värvat en vän till ${AppName} och hur många poäng de har samlat för att belöna dig med extra poäng`,
            ]}
            personalData={{
              items: isEn ? [
                "The points you collect",
                "Name of the friend you have referred",
                "The number of points your friend has claimed",
              ] : [
                "De poäng du samlar",
                "Namnet på den vän du har värvat",
                "Antalet poäng din vän har samlat",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legitimate interest",
                description: `Our legitimate interest to process your personal data to reward you with the extra points for recruiting one of your friends to ${AppName}.`,
              },
              {
                basis: "",
                description: `If you are the referred friend and register an account, we will process your personal data based on the performance of contract, please see above.`,
              },
            ] : [
              {
                basis: "Berättigat intresse",
                description: `Vårt berättigade intresse att behandla dina personuppgifter för att belöna dig med extra poäng för att du har värvat en av dina vänner till ${AppName}.`,
              },
              {
                basis: "",
                description: `Om du är den värvade vännen och registrerar ett konto kommer vi att behandla dina personuppgifter baserat på fullgörande av avtal, se ovan.`,
              },
            ]}
            storagePeriod={isEn
              ? `We will store your personal data until you choose to delete your account at ${AppName}.`
              : `Vi lagrar dina personuppgifter tills du väljer att radera ditt konto på ${AppName}.`}
          />

          <DataCard
            isEn={isEn}
            title={isEn ? "To administer your profile" : "Att administrera din profil"}
            processing={isEn ? [
              "To ask you questions in order to create a profile for you that can be matched to relevant surveys",
              "To give you surveys that are matched to your interests and persona",
            ] : [
              "Att ställa frågor till dig för att skapa en profil som kan matchas mot relevanta undersökningar",
              "Att ge dig undersökningar som matchas mot dina intressen och din person",
            ]}
            personalData={{
              label: isEn
                ? "Information you provide to us, e.g.:"
                : "Information du lämnar till oss, t.ex.:",
              items: isEn ? [
                "Information about your household, education and occupation, car, food and beverages, hobbies and interests, electronics, computer and video gaming, media, travel and what research surveys you are willing to participate in",
                "Information about your ethnicity, smoking and tobacco habits, healthcare and eventual children",
              ] : [
                "Information om ditt hushåll, utbildning och yrke, bil, mat och dryck, hobbyer och intressen, elektronik, dator- och videospel, media, resor och vilka forskningsundersökningar du är villig att delta i",
                "Information om din etnicitet, rök- och tobaksvanor, hälsovård och eventuella barn",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data that you choose to give us to be able to create and administer your profile.",
              },
              {
                basis: "Explicit consent",
                description:
                  'Sensitive information will be processed based on your explicit consent. You can withdraw such consent at any time. You can also change some of the answers you have given to "I prefer not to declare this".',
              },
            ] : [
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla dina personuppgifter som du väljer att ge oss för att kunna skapa och administrera din profil.",
              },
              {
                basis: "Uttryckligt samtycke",
                description:
                  'Känslig information behandlas baserat på ditt uttryckliga samtycke. Du kan återkalla ett sådant samtycke när som helst. Du kan också ändra vissa av de svar du har gett till "Jag föredrar att inte uppge detta".',
              },
            ]}
            storagePeriod={isEn
              ? 'We will store your personal data until you choose to delete your account or until you change your answers to "I prefer not to declare this". We will stop storing your sensitive personal data immediately if you withdraw your consent.'
              : 'Vi lagrar dina personuppgifter tills du väljer att radera ditt konto eller tills du ändrar dina svar till "Jag föredrar att inte uppge detta". Vi slutar lagra dina känsliga personuppgifter omedelbart om du återkallar ditt samtycke.'}
            notes={isEn ? [
              "Note that it is optional to answer these questions and that you choose what information you want to share with us.",
            ] : [
              "Observera att det är frivilligt att svara på dessa frågor och att du själv väljer vilken information du vill dela med oss.",
            ]}
          />

          <DataCard
            isEn={isEn}
            title={isEn ? "To send you notifications" : "Att skicka aviseringar till dig"}
            processing={isEn ? [
              "To send you push notifications about new surveys, cashback offers, game rewards, and other service updates",
              "To send you email notifications about your account and available opportunities",
              "To send you SMS notifications when applicable",
            ] : [
              "Att skicka push-aviseringar om nya undersökningar, cashback-erbjudanden, spelbelöningar och andra tjänsteuppdateringar",
              "Att skicka e-postaviseringar om ditt konto och tillgängliga möjligheter",
              "Att skicka SMS-aviseringar när det är tillämpligt",
            ]}
            personalData={{
              items: isEn ? [
                "Device push notification token",
                "Email address",
                "Phone number",
                "Your notification preferences (push, email, SMS)",
              ] : [
                "Enhetens push-aviseringstoken",
                "E-postadress",
                "Telefonnummer",
                "Dina aviseringspreferenser (push, e-post, SMS)",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Consent",
                description:
                  "Push notifications are only sent if you have granted notification permission on your device and opted in to receive them. You can withdraw your consent at any time by disabling notifications in your device settings or in the app.",
              },
              {
                basis: "Legitimate interest",
                description:
                  "For service-related communications that are essential for the use of the platform, such as account-related messages.",
              },
            ] : [
              {
                basis: "Samtycke",
                description:
                  "Push-aviseringar skickas endast om du har beviljat aviseringstillstånd på din enhet och valt att ta emot dem. Du kan återkalla ditt samtycke när som helst genom att inaktivera aviseringar i enhetens inställningar eller i appen.",
              },
              {
                basis: "Berättigat intresse",
                description:
                  "För tjänsterelaterad kommunikation som är nödvändig för användningen av plattformen, såsom kontomeddelanden.",
              },
            ]}
            storagePeriod={isEn
              ? "We will store your notification token until you choose to delete your account or disable notifications. Notification history is retained until account deletion."
              : "Vi lagrar din aviseringstoken tills du väljer att radera ditt konto eller inaktivera aviseringar. Aviseringshistorik sparas tills kontot raderas."}
          />

          {/* === Surveys === */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              mb: 2,
              mt: 4,
            }}
          >
            {isEn
              ? "If you participate in the surveys we provide"
              : "Om du deltar i de undersökningar vi tillhandahåller"}
          </Typography>

          <DataCard
            isEn={isEn}
            title={isEn ? "To enable your profile to be matched with relevant surveys" : "Att möjliggöra matchning av din profil med relevanta undersökningar"}
            processing={isEn ? [
              "To enable your profile to be matched with surveys you find relevant and interesting we share information with our partners",
              "Our partner matches your profile to companies that have surveys both within the EU and outside of EU",
            ] : [
              "Att möjliggöra matchning av din profil med undersökningar som du finner relevanta och intressanta genom att dela information med våra partners",
              "Vår partner matchar din profil mot företag som har undersökningar både inom EU och utanför EU",
            ]}
            personalData={{
              label: isEn
                ? "Information you provide to us, e.g.:"
                : "Information du lämnar till oss, t.ex.:",
              items: isEn ? [
                "Name",
                "Contact information (email)",
                "Postal code and city",
                "Gender",
                "Date of birth",
                "The number of surveys you have completed and points you have collected",
                "Other information you choose to provide to us, such as street address and phone number",
                "Other information from the profiling questions you have chosen to answer",
                "Other information that might have technical administration purposes such as IP address or country location",
              ] : [
                "Namn",
                "Kontaktinformation (e-post)",
                "Postnummer och ort",
                "Kön",
                "Födelsedatum",
                "Antalet undersökningar du har genomfört och poäng du har samlat",
                "Övrig information du väljer att lämna till oss, t.ex. gatuadress och telefonnummer",
                "Övrig information från de profileringsfrågor du har valt att svara på",
                "Övrig information som kan ha tekniska administrationsändamål såsom IP-adress eller platsland",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to enable your profile to be matched with surveys you find relevant and interesting.",
              },
              {
                basis: "Explicit consent",
                description:
                  'Sensitive information will be processed based on your explicit consent. You can withdraw such consent at any time. You can also change some of the answers you have given to "I prefer not to declare this".',
              },
            ] : [
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla dina personuppgifter för att möjliggöra matchning av din profil med undersökningar som du finner relevanta och intressanta.",
              },
              {
                basis: "Uttryckligt samtycke",
                description:
                  'Känslig information behandlas baserat på ditt uttryckliga samtycke. Du kan återkalla ett sådant samtycke när som helst. Du kan också ändra vissa av de svar du har gett till "Jag föredrar att inte uppge detta".',
              },
            ]}
            storagePeriod={isEn
              ? 'We will store your personal data for survey matching purposes until you choose to delete your account. This is essential for providing you with targeted and relevant survey opportunities. We will stop storing your sensitive personal data immediately when you withdraw your consent or change your answers to "I prefer not to declare this".'
              : 'Vi lagrar dina personuppgifter för undersökningsmatchning tills du väljer att radera ditt konto. Detta är nödvändigt för att kunna erbjuda dig riktade och relevanta undersökningsmöjligheter. Vi slutar lagra dina känsliga personuppgifter omedelbart när du återkallar ditt samtycke eller ändrar dina svar till "Jag föredrar att inte uppge detta".'}
          />

          <DataCard
            isEn={isEn}
            title={isEn ? "To provide surveys" : "Att tillhandahålla undersökningar"}
            processing={isEn ? [
              "To provide you with surveys that you can participate in",
              "To award you points for each survey you partake in",
            ] : [
              "Att erbjuda dig undersökningar som du kan delta i",
              "Att tilldela dig poäng för varje undersökning du deltar i",
            ]}
            personalData={{
              label: isEn
                ? "Information you provide to us, e.g.:"
                : "Information du lämnar till oss, t.ex.:",
              items: isEn ? [
                "Name",
                "Contact information (email)",
                "Postal code and city",
                "Gender",
                "Date of birth",
                "Other information you choose to provide to us, such as street address and phone number",
                "The number of surveys you have completed and points you have collected",
                "Information you have provided to us through your profile",
              ] : [
                "Namn",
                "Kontaktinformation (e-post)",
                "Postnummer och ort",
                "Kön",
                "Födelsedatum",
                "Övrig information du väljer att lämna till oss, t.ex. gatuadress och telefonnummer",
                "Antalet undersökningar du har genomfört och poäng du har samlat",
                "Information du har lämnat till oss via din profil",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to provide you with surveys that you can participate in.",
              },
            ] : [
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla dina personuppgifter för att erbjuda dig undersökningar som du kan delta i.",
              },
            ]}
            storagePeriod={isEn
              ? "We will store your personal data until you choose to delete your account."
              : "Vi lagrar dina personuppgifter tills du väljer att radera ditt konto."}
            notes={isEn ? [
              "Note that we provide the opportunity for you to participate in surveys, but the actual surveys are managed by third parties. Any information you provide directly within a survey (your survey responses) is processed by the third-party survey provider and not by SveaPanelen. We do not have access to your individual survey responses. If you choose to state your name or any other information about yourself in a survey, the survey company might be able to tie your answers to you as a person. In such cases, the survey company is a separate data controller. If you want to know more about how they process your data you can contact the relevant company.",
            ] : [
              "Observera att vi erbjuder möjligheten för dig att delta i undersökningar, men de faktiska undersökningarna hanteras av tredje parter. All information du lämnar direkt i en undersökning (dina undersökningssvar) behandlas av den tredje parts undersökningsleverantören och inte av SveaPanelen. Vi har inte tillgång till dina individuella undersökningssvar. Om du väljer att ange ditt namn eller annan information om dig själv i en undersökning kan undersökningsföretaget eventuellt koppla dina svar till dig som person. I sådana fall är undersökningsföretaget en separat personuppgiftsansvarig. Om du vill veta mer om hur de behandlar dina uppgifter kan du kontakta det relevanta företaget.",
            ]}
          />

          {/* === Cashback === */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              mb: 2,
              mt: 4,
            }}
          >
            {isEn ? "If you use our cashback service" : "Om du använder vår cashback-tjänst"}
          </Typography>

          <DataCard
            isEn={isEn}
            title={isEn ? "To provide cashback for online shopping" : "Att tillhandahålla cashback för onlineshopping"}
            processing={isEn ? [
              "To track your clicks when you visit a store through our app and attribute any resulting purchases to your account",
              "To calculate and credit cashback based on your verified purchases",
              "To display pending and approved cashback balances in your account",
              "To verify and validate transactions with our affiliate network partners",
              "To reject or reverse cashback earnings in cases of returned, cancelled, or manipulated orders",
            ] : [
              "Att spåra dina klick när du besöker en butik via vår app och tillskriva eventuella köp till ditt konto",
              "Att beräkna och kreditera cashback baserat på dina verifierade köp",
              "Att visa väntande och godkända cashback-saldon på ditt konto",
              "Att verifiera och validera transaktioner med våra affiliatenätverkspartners",
              "Att avvisa eller återföra cashback-intäkter vid returnerade, avbokade eller manipulerade beställningar",
            ]}
            personalData={{
              label: isEn
                ? "Information collected through our service and affiliate partners:"
                : "Information som samlas in via vår tjänst och affiliatepartners:",
              items: isEn ? [
                "Click data (timestamp, store visited, IP address, device information, referrer URL)",
                "Transaction data received from affiliate networks (order value, commission, currency, transaction date, validation status)",
                "Store and product category information",
                "Decline reasons for rejected transactions",
              ] : [
                "Klickdata (tidsstämpel, besökt butik, IP-adress, enhetsinformation, hänvisnings-URL)",
                "Transaktionsdata mottagen från affiliatenätverk (ordervärde, provision, valuta, transaktionsdatum, valideringsstatus)",
                "Butiks- och produktkategoriinformation",
                "Avvisningsskäl för nekade transaktioner",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Performance of contract",
                description: `The processing is necessary for us to fulfil the contract concerning your use of the cashback service within ${AppName}.`,
              },
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process transaction data to verify purchases, detect fraud, and prevent manipulation of cashback earnings.",
              },
            ] : [
              {
                basis: "Fullgörande av avtal",
                description: `Behandlingen är nödvändig för att vi ska kunna fullgöra avtalet avseende din användning av cashback-tjänsten inom ${AppName}.`,
              },
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla transaktionsdata för att verifiera köp, upptäcka bedrägerier och förhindra manipulation av cashback-intäkter.",
              },
            ]}
            storagePeriod={isEn
              ? "We will store your cashback transaction data until you choose to delete your account. Transaction records may be retained longer where required for bookkeeping and accounting obligations."
              : "Vi lagrar dina cashback-transaktionsdata tills du väljer att radera ditt konto. Transaktionsregister kan sparas längre om det krävs för bokförings- och redovisningsskyldigheter."}
            notes={isEn ? [
              "Cashback is calculated on the order value excluding VAT, taxes, and shipping costs, and is rounded down to the nearest whole number. Cashback rates are set by the individual stores and may vary.",
              "Modified, cancelled, or returned orders do not generate cashback. If cashback has already been credited for a transaction that is subsequently returned or reversed, we reserve the right to deduct the corresponding amount from your balance.",
              "We reserve the right to reject or reverse cashback earnings in cases of suspected fraud, manipulation, or violation of store terms. This includes but is not limited to: use of unauthorized discount codes, splitting purchases to maximize cashback, or any other form of abuse.",
              "Each store is subject to its own terms and conditions. We are not a party to the purchase agreement between you and the store, and we are not responsible for the store's products, services, or campaigns.",
              "Cashback tracking requires that you access the store through our app. Purchases made directly on a store's website or app without clicking through our service cannot be tracked or credited.",
            ] : [
              "Cashback beräknas på ordervärdet exklusive moms, skatter och fraktkostnader, och avrundas nedåt till närmaste heltal. Cashback-nivåer sätts av de enskilda butikerna och kan variera.",
              "Ändrade, avbokade eller returnerade beställningar genererar ingen cashback. Om cashback redan har krediterats för en transaktion som sedan returneras eller återförs förbehåller vi oss rätten att dra av motsvarande belopp från ditt saldo.",
              "Vi förbehåller oss rätten att avvisa eller återföra cashback-intäkter vid misstänkt bedrägeri, manipulation eller överträdelse av butiksvillkor. Detta inkluderar men är inte begränsat till: användning av obehöriga rabattkoder, uppdelning av köp för att maximera cashback eller annan form av missbruk.",
              "Varje butik har sina egna villkor. Vi är inte part i köpeavtalet mellan dig och butiken och ansvarar inte för butikens produkter, tjänster eller kampanjer.",
              "Cashback-spårning kräver att du besöker butiken via vår app. Köp som görs direkt på en butiks webbplats eller app utan att klicka via vår tjänst kan inte spåras eller krediteras.",
            ]}
          />

          {/* === Games & Offers === */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              mb: 2,
              mt: 4,
            }}
          >
            {isEn
              ? "If you use mobile game offers or play quiz games"
              : "Om du använder mobilspelserbjudanden eller spelar quizspel"}
          </Typography>

          <DataCard
            isEn={isEn}
            title={isEn ? "To provide mobile game offers" : "Att tillhandahålla mobilspelserbjudanden"}
            processing={isEn ? [
              "To display available mobile game offers that you can complete for rewards",
              "To track your installation and progress in offered games",
              "To verify completion of offer requirements and credit rewards to your account",
            ] : [
              "Att visa tillgängliga mobilspelserbjudanden som du kan slutföra för belöningar",
              "Att spåra din installation och dina framsteg i erbjudna spel",
              "Att verifiera att erbjudandekraven uppfyllts och kreditera belöningar till ditt konto",
            ]}
            personalData={{
              label: isEn
                ? "Information collected through our game offer partners:"
                : "Information som samlas in via våra spelserbjudandepartners:",
              items: isEn ? [
                "Device identifier and advertising ID",
                "App installation status and progress events",
                "IP address and country of origin",
                "Device type and operating system",
                "Reward levels achieved and amounts earned",
              ] : [
                "Enhetsidentifierare och annons-ID",
                "Appinstallationsstatus och framstegshändelser",
                "IP-adress och ursprungsland",
                "Enhetstyp och operativsystem",
                "Uppnådda belöningsnivåer och intjänade belopp",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to provide you with mobile game offers, verify completion of offer requirements, and credit rewards to your account.",
              },
            ] : [
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla dina personuppgifter för att erbjuda dig mobilspelserbjudanden, verifiera att erbjudandekraven uppfyllts och kreditera belöningar till ditt konto.",
              },
            ]}
            storagePeriod={isEn
              ? "We will store your game offer data until you choose to delete your account."
              : "Vi lagrar dina spelserbjudandedata tills du väljer att radera ditt konto."}
            notes={isEn ? [
              "Mobile game offers are provided through third-party partners. When you install and interact with an offered game, these partners collect data about your device and in-game activity to verify offer completion. These partners act as separate data controllers for the data they collect through their SDKs.",
            ] : [
              "Mobilspelserbjudanden tillhandahålls via tredjepartspartners. När du installerar och interagerar med ett erbjudet spel samlar dessa partners in data om din enhet och aktivitet i spelet för att verifiera att erbjudandet slutförts. Dessa partners agerar som separata personuppgiftsansvariga för de data de samlar in via sina SDK:er.",
            ]}
          />

          <DataCard
            isEn={isEn}
            title={isEn ? "To provide skill-based quiz games" : "Att tillhandahålla kunskapsbaserade quizspel"}
            processing={isEn ? [
              "To provide you with quiz games where you can play against other users",
              "To match you with opponents and manage game sessions",
              "To calculate scores based on correct answers and response time",
              "To process virtual currency wagers and payouts for each game",
              "To calculate your ranking compared to other players",
            ] : [
              "Att erbjuda dig quizspel där du kan spela mot andra användare",
              "Att matcha dig med motståndare och hantera spelsessioner",
              "Att beräkna poäng baserat på korrekta svar och svarstid",
              "Att behandla satsningar och utbetalningar av virtuell valuta för varje spel",
              "Att beräkna din ranking jämfört med andra spelare",
            ]}
            personalData={{
              items: isEn ? [
                "Name and profile avatar",
                "Quiz answers and response times",
                "Virtual currency balance and wager amounts",
                "Win/loss record and ranking",
                "Duel credits balance",
              ] : [
                "Namn och profilavatar",
                "Quizsvar och svarstider",
                "Saldo för virtuell valuta och satsningsbelopp",
                "Vinst-/förlusthistorik och ranking",
                "Saldo för duellkrediter",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to allow you to play skill-based quiz games, compete against other users, and manage virtual currency wagers and payouts.",
              },
            ] : [
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla dina personuppgifter för att låta dig spela kunskapsbaserade quizspel, tävla mot andra användare och hantera satsningar och utbetalningar av virtuell valuta.",
              },
            ]}
            storagePeriod={isEn
              ? "We will store your personal data until you choose to delete your account."
              : "Vi lagrar dina personuppgifter tills du väljer att radera ditt konto."}
            notes={isEn ? [
              "Quiz games involve wagering virtual currency (displayed as SEK) against other users. These wagers are made with virtual points that have no monetary value. Game outcomes are determined by skill (knowledge and response speed), not by chance.",
            ] : [
              "Quizspel innebär att man satsar virtuell valuta (visas som SEK) mot andra användare. Dessa satsningar görs med virtuella poäng som inte har något penningvärde. Spelresultat avgörs av skicklighet (kunskap och svarshastighet), inte av slump.",
            ]}
          />

          {/* === Withdrawals === */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              mb: 2,
              mt: 4,
            }}
          >
            {isEn ? "If you withdraw your earnings" : "Om du tar ut dina intjänade medel"}
          </Typography>

          <DataCard
            isEn={isEn}
            title={isEn
              ? "To administer withdrawal of your virtual currency via Swish"
              : "Att administrera uttag av din virtuella valuta via Swish"}
            processing={isEn ? [
              "To convert your virtual currency balance into a Swish payment",
              "To process and send the Swish payment to your registered phone number",
              "To keep track of your withdrawal history and payment status",
            ] : [
              "Att omvandla ditt saldo för virtuell valuta till en Swish-betalning",
              "Att behandla och skicka Swish-betalningen till ditt registrerade telefonnummer",
              "Att hålla reda på din uttagshistorik och betalningsstatus",
            ]}
            personalData={{
              label: isEn
                ? "Information you provide to us, e.g.:"
                : "Information du lämnar till oss, t.ex.:",
              items: isEn ? [
                "Name",
                "Social security number",
                "Swish phone number",
                "Withdrawal amount",
                "Payment status and transaction reference",
              ] : [
                "Namn",
                "Personnummer",
                "Swish-telefonnummer",
                "Uttagsbelopp",
                "Betalningsstatus och transaktionsreferens",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Performance of contract",
                description: `The processing is necessary for us to fulfil the contract concerning your membership in ${AppName} which means you receive points that can be withdrawn as Swish payments in exchange for participating in surveys and other activities.`,
              },
            ] : [
              {
                basis: "Fullgörande av avtal",
                description: `Behandlingen är nödvändig för att vi ska kunna fullgöra avtalet avseende ditt medlemskap i ${AppName} vilket innebär att du får poäng som kan tas ut som Swish-betalningar i utbyte mot att delta i undersökningar och andra aktiviteter.`,
              },
            ]}
            storagePeriod={isEn
              ? "We will store your withdrawal data until you choose to delete your account. Transaction records may be retained longer where required for bookkeeping and accounting obligations."
              : "Vi lagrar dina uttagsdata tills du väljer att radera ditt konto. Transaktionsregister kan sparas längre om det krävs för bokförings- och redovisningsskyldigheter."}
          />

          {/* === Social media === */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              mb: 2,
              mt: 4,
            }}
          >
            {isEn ? "If you interact with us on social media" : "Om du interagerar med oss i sociala medier"}
          </Typography>

          <DataCard
            isEn={isEn}
            title={isEn ? "To communicate with you on social media" : "Att kommunicera med dig i sociala medier"}
            processing={isEn ? [
              "To communicate with you on our social media account (Facebook), e.g. if you communicates with us on our page",
            ] : [
              "Att kommunicera med dig på vårt konto i sociala medier (Facebook), t.ex. om du kommunicerar med oss på vår sida",
            ]}
            personalData={{
              items: isEn ? [
                "Information from your profile on the social media in question (user name and any picture you have chosen for your account)",
                "Information which you provide on our page",
              ] : [
                "Information från din profil på det aktuella sociala mediet (användarnamn och eventuell bild du har valt för ditt konto)",
                "Information som du tillhandahåller på vår sida",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to communicate with you on our social media platform.",
              },
            ] : [
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla dina personuppgifter för att kommunicera med dig på vår plattform i sociala medier.",
              },
            ]}
            storagePeriod={isEn
              ? "Your personal data will be removed if you ask us to remove it or if you yourself delete the content, but we will otherwise store the personal data on the social media platform until further notice."
              : "Dina personuppgifter tas bort om du ber oss ta bort dem eller om du själv raderar innehållet, men vi kommer annars att lagra personuppgifterna på plattformen för sociala medier tills vidare."}
          />

          {/* === Other processing === */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              mb: 2,
              mt: 4,
            }}
          >
            {isEn ? "Other processing activities" : "Övriga behandlingsaktiviteter"}
          </Typography>

          <DataCard
            isEn={isEn}
            title={isEn ? "To provide customer service" : "Att tillhandahålla kundservice"}
            processing={isEn ? [
              "Answer and administer customer service matters",
            ] : [
              "Besvara och administrera kundserviceärenden",
            ]}
            personalData={{
              items: isEn ? [
                "Name",
                "Contact information you provide in our contact",
                "Other information you provide regarding the matter, e.g. a problem with a function",
              ] : [
                "Namn",
                "Kontaktinformation du lämnar i vår kontakt",
                "Övrig information du lämnar angående ärendet, t.ex. ett problem med en funktion",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to answer and administer customer service matters.",
              },
            ] : [
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla dina personuppgifter för att besvara och administrera kundserviceärenden.",
              },
            ]}
            storagePeriod={isEn
              ? "We will store your personal data until the account is removed."
              : "Vi lagrar dina personuppgifter tills kontot raderas."}
          />

          <DataCard
            isEn={isEn}
            title={isEn ? "To improve our services" : "Att förbättra våra tjänster"}
            processing={isEn ? [
              "To improve our services and website's functions based on your feedback",
            ] : [
              "Att förbättra våra tjänster och webbplatsens funktioner baserat på din feedback",
            ]}
            personalData={{
              label: isEn
                ? "Information you provide to us, e.g.:"
                : "Information du lämnar till oss, t.ex.:",
              items: isEn ? [
                "Name",
                "Contact details (e-mail)",
                "Other information you provide to us when sending us feedback",
              ] : [
                "Namn",
                "Kontaktuppgifter (e-post)",
                "Övrig information du lämnar till oss när du skickar feedback",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to handle your feedback and improve our services.",
              },
            ] : [
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla dina personuppgifter för att hantera din feedback och förbättra våra tjänster.",
              },
            ]}
            storagePeriod={isEn
              ? "We will store your personal data until account is removed"
              : "Vi lagrar dina personuppgifter tills kontot raderas"}
          />

          <DataCard
            isEn={isEn}
            title={isEn ? "To detect and prevent fraud" : "Att upptäcka och förhindra bedrägerier"}
            processing={isEn ? [
              "To verify your identity and prevent fraudulent account creation",
              "To check your IP address against known proxies, VPNs, and suspicious sources",
              "To monitor for suspicious patterns of activity such as manipulation of cashback, surveys, or game offers",
              "To enforce country restrictions and verify your geographic location",
            ] : [
              "Att verifiera din identitet och förhindra bedrägligt kontoskapande",
              "Att kontrollera din IP-adress mot kända proxyer, VPN:er och misstänkta källor",
              "Att övervaka misstänkta aktivitetsmönster såsom manipulation av cashback, undersökningar eller spelserbjudanden",
              "Att upprätthålla landsbegränsningar och verifiera din geografiska plats",
            ]}
            personalData={{
              items: isEn ? [
                "IP address",
                "Device identifier and advertising ID",
                "Country and geographic location data",
                "Proxy and VPN detection results",
                "Login history and activity patterns",
                "Transaction and earnings history",
              ] : [
                "IP-adress",
                "Enhetsidentifierare och annons-ID",
                "Land och geografisk platsdata",
                "Resultat från proxy- och VPN-detektering",
                "Inloggningshistorik och aktivitetsmönster",
                "Transaktions- och intäktshistorik",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to detect and prevent fraud, protect the integrity of our services, and ensure fair use for all users.",
              },
            ] : [
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla dina personuppgifter för att upptäcka och förhindra bedrägerier, skydda integriteten i våra tjänster och säkerställa rättvis användning för alla användare.",
              },
            ]}
            storagePeriod={isEn
              ? "We will store fraud prevention data until you choose to delete your account. IP and proxy check logs may be retained for up to 12 months for security purposes."
              : "Vi lagrar bedrägeriförebyggande data tills du väljer att radera ditt konto. IP- och proxykontrolloggar kan sparas i upp till 12 månader i säkerhetssyfte."}
          />

          <DataCard
            isEn={isEn}
            title={isEn ? "To handle any claims and rights" : "Att hantera eventuella anspråk och rättigheter"}
            processing={isEn ? [
              "Handle any consumer rights such as your right to make complaints",
              "Defend ourselves against claims and complaints",
              "Initiate any claims",
            ] : [
              "Hantera konsumenträttigheter såsom din rätt att framställa klagomål",
              "Försvara oss mot anspråk och klagomål",
              "Initiera eventuella anspråk",
            ]}
            personalData={{
              items: isEn ? [
                "Name",
                "Contact details you have chosen to use, e.g. email address and/or phone number",
                "Information from our communication with you in relation to the claim, e.g. information about the relevant booking or information about your stay",
              ] : [
                "Namn",
                "Kontaktuppgifter du har valt att använda, t.ex. e-postadress och/eller telefonnummer",
                "Information från vår kommunikation med dig i förhållande till anspråket, t.ex. information om den relevanta bokningen eller information om din vistelse",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legal obligation",
                description:
                  "The processing is necessary to comply with legal obligations to which we are subject, i.e. comply with a legal obligation that we are subject to.",
              },
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to defend ourselves against a possible legal claim and to initiate any claim.",
              },
            ] : [
              {
                basis: "Rättslig förpliktelse",
                description:
                  "Behandlingen är nödvändig för att uppfylla rättsliga förpliktelser som vi är underkastade, dvs. att uppfylla en rättslig förpliktelse som vi är underkastade.",
              },
              {
                basis: "Berättigat intresse",
                description:
                  "Vårt berättigade intresse att behandla dina personuppgifter för att försvara oss mot eventuella rättsliga anspråk och för att initiera eventuella anspråk.",
              },
            ]}
            storagePeriod={isEn
              ? "We will store your personal data until we have processed the complaint, until we have handled the right or for the duration of the dispute."
              : "Vi lagrar dina personuppgifter tills vi har behandlat klagomålet, tills vi har hanterat rättigheten eller under tvistens varaktighet."}
          />

          <DataCard
            isEn={isEn}
            title={isEn ? "To comply with bookkeeping and accounting legislation" : "Att uppfylla bokförings- och redovisningslagstiftning"}
            processing={isEn ? [
              "Store information in bookkeeping and accounting",
            ] : [
              "Lagra information i bokföring och redovisning",
            ]}
            personalData={{
              items: isEn ? [
                "Name",
                "History regarding withdrawals and payments made",
                "Other information that constitutes accounting records",
              ] : [
                "Namn",
                "Historik avseende uttag och gjorda betalningar",
                "Övrig information som utgör bokföringsunderlag",
              ],
            }}
            legalBasis={isEn ? [
              {
                basis: "Legal obligation",
                description:
                  "The processing is necessary to comply with legal obligations to which we are subject, i.e. bookkeeping and accounting legislation.",
              },
            ] : [
              {
                basis: "Rättslig förpliktelse",
                description:
                  "Behandlingen är nödvändig för att uppfylla rättsliga förpliktelser som vi är underkastade, dvs. bokförings- och redovisningslagstiftning.",
              },
            ]}
            storagePeriod={isEn
              ? "We will store your personal data until and including the seventh year after the end of the calendar year for the fiscal year to which the personal data relates."
              : "Vi lagrar dina personuppgifter till och med det sjunde året efter utgången av det kalenderår då räkenskapsåret som personuppgifterna avser avslutades."}
          />
        </Section>

        {/* Section: Analytics and tracking */}
        <Section
          id="analytics-tracking"
          title={isEn ? "Analytics and tracking technologies" : "Analys- och spårningstekniker"}
        >
          <Paragraph>
            {isEn
              ? "We use the following analytics and tracking services to improve our service, measure performance, and understand how users interact with our app:"
              : "Vi använder följande analys- och spårningstjänster för att förbättra vår tjänst, mäta prestanda och förstå hur användare interagerar med vår app:"}
          </Paragraph>

          <SubSection title={isEn ? "App analytics" : "Appanalys"}>
            <Paragraph>
              {isEn
                ? "We use third-party analytics services to track app usage events, screen views, and user engagement. These services collect device information, app usage data, and custom events that we define. Analytics data helps us understand how our app is used and improve our services."
                : "Vi använder tredjepartsanalystjänster för att spåra appanvändningshändelser, skärmvisningar och användarengagemang. Dessa tjänster samlar in enhetsinformation, appanvändningsdata och anpassade händelser som vi definierar. Analysdata hjälper oss att förstå hur vår app används och förbättra våra tjänster."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Advertising and attribution" : "Annonsering och tillskrivning"}>
            <Paragraph>
              {isEn
                ? "We use third-party SDKs for conversion attribution and event tracking. These SDKs may collect data about your app activity including registration, purchases, and engagement events. This data may be used by third-party advertising platforms in accordance with their respective privacy policies."
                : "Vi använder tredjeparts-SDK:er för konverteringstillskrivning och händelsespårning. Dessa SDK:er kan samla in data om din appaktivitet inklusive registrering, köp och engagemangshändelser. Denna data kan användas av tredjepartsannonsplattformar i enlighet med deras respektive integritetspolicyer."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Deep linking and referral attribution" : "Deep linking och värvningstillskrivning"}>
            <Paragraph>
              {isEn
                ? "We use third-party deep linking services for referral attribution. These services collect data about how you arrived at our app, including referring links, click timestamps, and device information. This is used to attribute referrals and measure marketing effectiveness."
                : "Vi använder tredje parts deep linking-tjänster för värvningstillskrivning. Dessa tjänster samlar in data om hur du kom till vår app, inklusive hänvisningslänkar, klicktidsstämplar och enhetsinformation. Detta används för att tillskriva värvningar och mäta marknadsföringseffektivitet."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Error monitoring" : "Felövervakning"}>
            <Paragraph>
              {isEn
                ? "We use third-party error monitoring services to track and resolve technical issues. These services collect technical error logs, stack traces, and limited device information when errors occur in the app. This is used solely for identifying and fixing technical issues."
                : "Vi använder tredje parts felövervakningstjänster för att spåra och lösa tekniska problem. Dessa tjänster samlar in tekniska felloggar, stackspårningar och begränsad enhetsinformation när fel uppstår i appen. Detta används uteslutande för att identifiera och åtgärda tekniska problem."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "App Tracking Transparency (iOS)" : "App Tracking Transparency (iOS)"}>
            <Paragraph>
              {isEn
                ? "On iOS devices, we request your permission to track your activity across other companies' apps and websites through Apple's App Tracking Transparency framework. You can grant or deny this permission, and you can change your choice at any time in your device settings. If you deny tracking, we will not share your device's advertising identifier with third parties."
                : "På iOS-enheter begär vi ditt tillstånd att spåra din aktivitet över andra företags appar och webbplatser genom Apples App Tracking Transparency-ramverk. Du kan bevilja eller neka detta tillstånd, och du kan ändra ditt val när som helst i enhetens inställningar. Om du nekar spårning kommer vi inte att dela din enhets annonsidentifierare med tredje parter."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Browser extension" : "Webbläsartillägg"}>
            <Paragraph>
              {isEn
                ? `If you use our Safari browser extension for cashback tracking, authentication data is shared between the app and the extension via a secure iOS App Group. This is necessary for the extension to attribute your purchases to your ${AppName} account. No additional personal data is collected through the extension beyond what is described in this privacy policy.`
                : `Om du använder vårt Safari-webbläsartillägg för cashback-spårning delas autentiseringsdata mellan appen och tillägget via en säker iOS App Group. Detta är nödvändigt för att tillägget ska kunna tillskriva dina köp till ditt ${AppName}-konto. Inga ytterligare personuppgifter samlas in via tillägget utöver vad som beskrivs i denna integritetspolicy.`}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Do Not Track" : "Do Not Track"}>
            <Paragraph>
              {isEn
                ? 'Our service does not currently respond to "Do Not Track" browser signals. However, you can control tracking through your device settings, including the App Tracking Transparency prompt on iOS.'
                : 'Vår tjänst svarar för närvarande inte på "Do Not Track"-signaler från webbläsare. Du kan dock kontrollera spårning via dina enhetsinställningar, inklusive App Tracking Transparency-prompten på iOS.'}
            </Paragraph>
          </SubSection>
        </Section>

        {/* Section: Automated decision-making */}
        <Section
          id="automated-decisions"
          title={isEn ? "Automated decision-making" : "Automatiserat beslutsfattande"}
        >
          <Paragraph>
            {isEn
              ? "We use automated processing to match your profile with relevant surveys. This matching is based on the demographic and profiling information you have provided, such as age, gender, location, interests, and other profile attributes. The outcome of this automated matching determines which surveys are shown to you. This processing does not produce legal effects or similarly significant effects on you — it only affects which survey opportunities are displayed to you."
              : "Vi använder automatiserad behandling för att matcha din profil med relevanta undersökningar. Denna matchning baseras på den demografiska och profilerande information du har lämnat, såsom ålder, kön, plats, intressen och andra profilattribut. Resultatet av denna automatiserade matchning avgör vilka undersökningar som visas för dig. Denna behandling ger inte upphov till rättsliga effekter eller liknande betydande effekter för dig — den påverkar endast vilka undersökningsmöjligheter som visas för dig."}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "We also use automated processing for fraud detection, including checking IP addresses against known proxy and VPN databases and monitoring activity patterns for suspicious behaviour. In some cases, this automated processing may result in restrictions on your account. Under GDPR Article 22, you have the right not to be subject to a decision based solely on automated processing that produces legal or similarly significant effects on you. If you believe such a decision has been made about you, you have the right to obtain human intervention, express your point of view, and contest the decision by contacting our Data Protection Officer."
              : "Vi använder även automatiserad behandling för bedrägeridetektering, inklusive kontroll av IP-adresser mot kända proxy- och VPN-databaser samt övervakning av aktivitetsmönster för misstänkt beteende. I vissa fall kan denna automatiserade behandling leda till begränsningar av ditt konto. Enligt GDPR artikel 22 har du rätt att inte bli föremål för ett beslut som enbart grundar sig på automatiserad behandling och som har rättsliga effekter eller liknande betydande effekter för dig. Om du anser att ett sådant beslut har fattats om dig har du rätt att få mänsklig inblandning, uttrycka din ståndpunkt och bestrida beslutet genom att kontakta vårt dataskyddsombud."}
          </Paragraph>
        </Section>

        {/* Section: Account deletion */}
        <Section
          id="account-deletion"
          title={isEn ? "Account deletion and data retention" : "Kontoradering och datalagring"}
        >
          <Paragraph>
            {isEn
              ? "When you delete your account, we take the following steps to protect your privacy:"
              : "När du raderar ditt konto vidtar vi följande åtgärder för att skydda din integritet:"}
          </Paragraph>

          <BulletList
            items={isEn ? [
              "Your personal identification data (name, email, social security number, phone number, postal code) is scrambled and anonymized so that it can no longer be linked to you as a person.",
              "Your profiling answers and active game data are permanently deleted.",
              "Your data is deleted from our third-party survey partners where technically possible.",
              "Your push notification tokens are permanently deleted.",
              "Your notification preferences are disabled.",
            ] : [
              "Dina personidentifieringsuppgifter (namn, e-post, personnummer, telefonnummer, postnummer) förväxlas och anonymiseras så att de inte längre kan kopplas till dig som person.",
              "Dina profilsvar och aktiva speldata raderas permanent.",
              "Dina uppgifter raderas från våra tredjepartsundersökningspartners där det är tekniskt möjligt.",
              "Dina push-aviseringstoken raderas permanent.",
              "Dina aviseringspreferenser inaktiveras.",
            ]}
          />

          <Paragraph>
            {isEn
              ? "Please note that certain anonymized records are retained even after account deletion for the following purposes:"
              : "Observera att vissa anonymiserade uppgifter behålls även efter kontoradering för följande ändamål:"}
          </Paragraph>

          <BulletList
            items={isEn ? [
              "Survey completion records, cashback transactions, withdrawal history, and game completion records are retained in anonymized form for bookkeeping, accounting, and fraud prevention purposes.",
              "We are legally required to retain certain financial records for up to seven years after the end of the relevant fiscal year, in accordance with Swedish bookkeeping and accounting legislation.",
            ] : [
              "Uppgifter om genomförda undersökningar, cashback-transaktioner, uttagshistorik och genomförda spel behålls i anonymiserad form för bokförings-, redovisnings- och bedrägeriförebyggande ändamål.",
              "Vi är enligt lag skyldiga att behålla vissa finansiella uppgifter i upp till sju år efter utgången av det relevanta räkenskapsåret, i enlighet med svensk bokförings- och redovisningslagstiftning.",
            ]}
          />

          <Paragraph>
            {isEn
              ? "After anonymization, the retained records cannot be linked back to you as an identifiable person."
              : "Efter anonymisering kan de behållna uppgifterna inte kopplas tillbaka till dig som identifierbar person."}
          </Paragraph>
        </Section>

        {/* Section: Business transfers */}
        <Section id="business-transfers" title={isEn ? "Business transfers" : "Verksamhetsöverlåtelser"}>
          <Paragraph>
            {isEn
              ? "If Flow Group AB or its assets are acquired by or merged with another company, or in the unlikely event that we go out of business or enter bankruptcy, personal data may be among the assets transferred to the acquiring party. In such a case, you will be notified before your personal data is transferred and becomes subject to a different privacy policy. The acquiring party will be required to continue to process your personal data in accordance with applicable data protection legislation."
              : "Om Flow Group AB eller dess tillgångar förvärvas av eller slås samman med ett annat företag, eller i det osannolika fallet att vi upphör med vår verksamhet eller går i konkurs, kan personuppgifter vara bland de tillgångar som överförs till den förvärvande parten. I ett sådant fall kommer du att meddelas innan dina personuppgifter överförs och blir föremål för en annan integritetspolicy. Den förvärvande parten kommer att vara skyldig att fortsätta behandla dina personuppgifter i enlighet med tillämplig dataskyddslagstiftning."}
          </Paragraph>
        </Section>

        {/* Section: Data breach */}
        <Section id="data-breach" title={isEn ? "Data breach procedures" : "Rutiner vid personuppgiftsincidenter"}>
          <Paragraph>
            {isEn
              ? "In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, we will notify the Swedish Data Protection Authority (IMY) without undue delay and no later than 72 hours after becoming aware of the breach, in accordance with GDPR Article 33. If the breach is likely to result in a high risk to your rights and freedoms, we will also notify you directly without undue delay, in accordance with GDPR Article 34."
              : "Vid en personuppgiftsincident som sannolikt leder till en risk för dina rättigheter och friheter kommer vi att anmäla till Integritetsskyddsmyndigheten (IMY) utan onödigt dröjsmål och senast 72 timmar efter att vi har fått kännedom om incidenten, i enlighet med GDPR artikel 33. Om incidenten sannolikt leder till en hög risk för dina rättigheter och friheter kommer vi även att meddela dig direkt utan onödigt dröjsmål, i enlighet med GDPR artikel 34."}
          </Paragraph>
        </Section>

        {/* Section: Cookies */}
        <Section id="cookies" title={isEn ? "Cookies and similar technologies" : "Cookies och liknande tekniker"}>
          <Paragraph>
            {isEn
              ? "When you use our app and related services (such as our Safari browser extension for cashback), we and our partners may use cookies and similar tracking technologies to enable essential functionality, measure performance, and attribute transactions."
              : "När du använder vår app och relaterade tjänster (såsom vårt Safari-webbläsartillägg för cashback) kan vi och våra partners använda cookies och liknande spårningstekniker för att möjliggöra grundläggande funktionalitet, mäta prestanda och tillskriva transaktioner."}
          </Paragraph>

          <SubSection title={isEn ? "Essential cookies" : "Nödvändiga cookies"}>
            <Paragraph>
              {isEn
                ? "These are necessary for the service to function and include session management, authentication tokens, and security tokens (e.g. CSRF protection). These cannot be disabled."
                : "Dessa är nödvändiga för att tjänsten ska fungera och inkluderar sessionshantering, autentiseringstoken och säkerhetstoken (t.ex. CSRF-skydd). Dessa kan inte inaktiveras."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Analytics cookies" : "Analyscookies"}>
            <Paragraph>
              {isEn
                ? "We use analytics cookies and SDKs to understand how users interact with our service, measure feature usage, and improve the user experience. These are activated based on your consent."
                : "Vi använder analyscookies och SDK:er för att förstå hur användare interagerar med vår tjänst, mäta funktionsanvändning och förbättra användarupplevelsen. Dessa aktiveras baserat på ditt samtycke."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Advertising and attribution cookies" : "Annonserings- och tillskrivningscookies"}>
            <Paragraph>
              {isEn
                ? "We use advertising SDKs and attribution tools to measure the effectiveness of marketing campaigns and attribute app installs and registrations. On iOS, these are subject to your App Tracking Transparency choice."
                : "Vi använder annonserings-SDK:er och tillskrivningsverktyg för att mäta effektiviteten av marknadsföringskampanjer och tillskriva appinstallationer och registreringar. På iOS är dessa beroende av ditt val i App Tracking Transparency."}
            </Paragraph>
          </SubSection>

          <SubSection title={isEn ? "Affiliate tracking cookies" : "Affiliatespårningscookies"}>
            <Paragraph>
              {isEn
                ? "When you use our cashback service, tracking technology is placed on your device to document your transaction and attribute your purchase. This is necessary for the cashback service to function. The tracking is initiated when you click through to a store via our service and is used solely for cashback attribution."
                : "När du använder vår cashback-tjänst placeras spårningsteknik på din enhet för att dokumentera din transaktion och tillskriva ditt köp. Detta är nödvändigt för att cashback-tjänsten ska fungera. Spårningen initieras när du klickar dig vidare till en butik via vår tjänst och används uteslutande för cashback-tillskrivning."}
            </Paragraph>
          </SubSection>

          <Paragraph>
            {isEn
              ? "You can manage your cookie preferences through your device or browser settings. Please note that disabling certain cookies may affect the functionality of our services, particularly cashback tracking."
              : "Du kan hantera dina cookie-preferenser via dina enhets- eller webbläsarinställningar. Observera att inaktivering av vissa cookies kan påverka funktionaliteten i våra tjänster, särskilt cashback-spårning."}
          </Paragraph>
        </Section>

        {/* Section: Balancing of interests */}
        <Section
          id="balancing-of-interests"
          title={isEn ? "Balancing of interests assessments" : "Intresseavvägningar"}
        >
          <Paragraph>
            {isEn
              ? 'As we state above, for some purposes, we process your personal data based upon our "legitimate interest". By carrying out a balancing of interests assessment concerning our processing of your personal data, we have concluded that our legitimate interest for the processing outweighs your interests or rights which require the protection of your personal data.'
              : 'Som vi anger ovan behandlar vi för vissa ändamål dina personuppgifter baserat på vårt "berättigade intresse". Genom att utföra en intresseavvägning avseende vår behandling av dina personuppgifter har vi kommit fram till att vårt berättigade intresse för behandlingen väger tyngre än dina intressen eller rättigheter som kräver skydd av dina personuppgifter.'}
          </Paragraph>

          <Paragraph>
            {isEn
              ? "Below is a summary of the key balancing assessments we have conducted:"
              : "Nedan följer en sammanfattning av de viktigaste intresseavvägningar vi har genomfört:"}
          </Paragraph>

          <BulletList
            items={isEn ? [
              "Profile administration and survey matching: We have a strong interest in providing you with relevant surveys based on your profile. The data processed is information you have voluntarily chosen to provide, and the impact on your privacy is limited since the processing primarily benefits you through more relevant survey opportunities.",
              "Referral tracking: We have an interest in rewarding users who refer friends. Only minimal data is processed (names and points), and the processing directly benefits both the referrer and the referred user.",
              "Fraud detection: We have a strong interest in protecting the integrity of our platform for all users. The data processed (IP addresses, activity patterns) is necessary to identify and prevent abuse. The impact on legitimate users is minimal as the monitoring is automated and only results in action when suspicious patterns are detected.",
              "Cashback transaction verification: We have an interest in verifying that cashback transactions are legitimate. Transaction data is processed to prevent manipulation and ensure fair use. This protects both us and other users from the consequences of fraudulent activity.",
              "Service improvement: We have an interest in improving our services based on user feedback. The data processed is information voluntarily provided to us, and the processing benefits all users through an improved service.",
              "Customer service: We have an interest in providing effective support. The data processed is information you provide when contacting us, and the processing directly benefits you.",
            ] : [
              "Profiladministration och undersökningsmatchning: Vi har ett starkt intresse av att erbjuda dig relevanta undersökningar baserat på din profil. De uppgifter som behandlas är information du frivilligt har valt att lämna, och påverkan på din integritet är begränsad eftersom behandlingen i första hand gynnar dig genom mer relevanta undersökningsmöjligheter.",
              "Värvningsspårning: Vi har ett intresse av att belöna användare som värvar vänner. Endast minimal data behandlas (namn och poäng), och behandlingen gynnar direkt både den som värvar och den värvade användaren.",
              "Bedrägeridetektering: Vi har ett starkt intresse av att skydda integriteten i vår plattform för alla användare. De uppgifter som behandlas (IP-adresser, aktivitetsmönster) är nödvändiga för att identifiera och förhindra missbruk. Påverkan på legitima användare är minimal eftersom övervakningen är automatiserad och bara leder till åtgärder när misstänkta mönster upptäcks.",
              "Verifiering av cashback-transaktioner: Vi har ett intresse av att verifiera att cashback-transaktioner är legitima. Transaktionsdata behandlas för att förhindra manipulation och säkerställa rättvis användning. Detta skyddar både oss och andra användare från konsekvenserna av bedräglig aktivitet.",
              "Tjänsteförbättring: Vi har ett intresse av att förbättra våra tjänster baserat på användarfeedback. De uppgifter som behandlas är information som frivilligt lämnats till oss, och behandlingen gynnar alla användare genom en förbättrad tjänst.",
              "Kundservice: Vi har ett intresse av att tillhandahålla effektiv support. De uppgifter som behandlas är information du lämnar när du kontaktar oss, och behandlingen gynnar dig direkt.",
            ]}
          />

          <Paragraph>
            {isEn
              ? "If you want more information in relation to our balancing of interests assessments, please do not hesitate to contact us. Our contact details can be found in the beginning of this privacy policy."
              : "Om du vill ha mer information om våra intresseavvägningar, tveka inte att kontakta oss. Våra kontaktuppgifter finns i början av denna integritetspolicy."}
          </Paragraph>
        </Section>

        {/* Section: DPO */}
        <Section id="dpo" title={isEn ? "Data Protection Officer" : "Dataskyddsombud"}>
          <Paragraph>
            {isEn
              ? "Our Data Protection Officer is Oliver Weitman, who can be reached at oliver@pollflow.io for any questions or concerns regarding the processing of your personal data."
              : "Vårt dataskyddsombud är Oliver Weitman, som kan nås på oliver@pollflow.io för eventuella frågor eller funderingar angående behandlingen av dina personuppgifter."}
          </Paragraph>
        </Section>

        {/* Footer */}
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { xs: "0.8rem", md: "0.85rem" },
            color: "#9ca3af",
            mt: 4,
            pb: 4,
          }}
        >
          {isEn
            ? "This privacy policy was last updated on 2026-04-01. Originally established by Flow Group AB on 2021-08-18."
            : "Denna integritetspolicy uppdaterades senast 2026-04-01. Ursprungligen upprättad av Flow Group AB den 2021-08-18."}
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default TermsPage;
