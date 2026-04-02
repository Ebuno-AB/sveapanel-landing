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
}: {
  title: string;
  processing: string[];
  personalData: { label?: string; items: string[] };
  legalBasis: { basis: string; description: string }[];
  storagePeriod: string;
  notes?: string[];
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
        What processing we perform
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
        What personal data we process
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
        Our lawful basis for the processing
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
        <strong>Storage period:</strong> {storagePeriod}
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
            Privacy Policy
          </Typography>

          <Paragraph>
            Flow Group AB, a Swedish company with company organization number
            559183-6027 ("Flow Group", "{AppName}", "we", "our" or "us"), is
            responsible for the processing of your personal data as described
            below. This privacy policy concerns you who register an account and
            become an {AppName} user.
          </Paragraph>

          <Paragraph>
            {AppName}, a platform built by Flow Group under the PollFlow
            project, is a company based in Sweden with organization number
            559183-6027
          </Paragraph>

          <Paragraph mb={3}>
            We care about and value your privacy. Through this privacy policy we
            therefore wish to provide you with information on how we process your
            personal data as well as what rights you have in relation to our
            processing of your personal data.
          </Paragraph>

          <Typography
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.95rem", md: "1rem" },
              mb: 1.5,
            }}
          >
            We process your personal data for the following general purposes:
          </Typography>

          <BulletList
            items={[
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
            ]}
          />

          <Paragraph>
            Below you can read more about how we process your personal data.
            Should you have any questions regarding our processing of your
            personal data, or if you wish to exercise any of your rights under
            data protection legislation, please contact us via our email address{" "}
            {SupportEmail}. Our postal address is Flow Group AB Luntmakargatan
            54B, 113 58, Stockholm.
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
            Table of Contents
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
              Age requirement
            </Link>
            <Link
              href="#from-where"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              From where do we collect your personal data and are you required to
              provide personal data to us?
            </Link>
            <Link
              href="#who-can-access"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Who can gain access to your personal data and why?
            </Link>
            <Link
              href="#where-processed"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Where are your personal data processed?
            </Link>
            <Link
              href="#your-rights"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              What rights do you have in relation to our processing of your
              personal data?
            </Link>
            <Link
              href="#virtual-currency"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Virtual currency
            </Link>
            <Link
              href="#detailed-description"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Detailed description on how we process your personal data
            </Link>
            <Link
              href="#analytics-tracking"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Analytics and tracking technologies
            </Link>
            <Link
              href="#automated-decisions"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Automated decision-making
            </Link>
            <Link
              href="#account-deletion"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Account deletion and data retention
            </Link>
            <Link
              href="#business-transfers"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Business transfers
            </Link>
            <Link
              href="#data-breach"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Data breach procedures
            </Link>
            <Link
              href="#cookies"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Cookies and similar technologies
            </Link>
            <Link
              href="#balancing-of-interests"
              sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
            >
              Balancing of interests assessments
            </Link>
          </Box>
        </Paper>

        {/* Section: Age requirement */}
        <Section id="age-requirement" title="Age requirement">
          <Paragraph>
            You must be at least 13 years of age to use {AppName}, in
            accordance with Swedish data protection legislation. If you are
            under 18 years of age, you must have your parent or legal
            guardian's permission to access and use the service. Please note
            that registration requires Swedish BankID, which may have its own
            age requirements. We do not knowingly collect personal data from
            children under 13. If we become aware that we have collected
            personal data from a child under 13, we will take steps to delete
            that information.
          </Paragraph>
        </Section>

        {/* Section: From where */}
        <Section
          id="from-where"
          title="From where do we collect your personal data and are you required to provide personal data to us?"
        >
          <Paragraph>
            We collect your personal data directly from you, for example when
            you register an account and answer our profiling questions.
          </Paragraph>

          <Paragraph>
            When you register an account, we collect identity information
            through Swedish BankID, including your full name, social security
            number (personnummer), and date of birth. Your social security
            number is required for secure identity verification and is
            necessary under Swedish law for processing Swish payments. We also
            collect your email address, phone number, and postal code during
            the registration process.
          </Paragraph>

          <Paragraph>
            We automatically collect certain technical data from your device,
            including your IP address, device model and type, operating system
            version, app version, timezone, advertising identifier, and country
            of origin. This data is collected through our app and is used for
            service delivery, fraud prevention, and analytics purposes.
          </Paragraph>

          <Paragraph>
            When you use our cashback service, we collect data about your
            clicks and transactions through our affiliate network partners.
            This includes click timestamps, the store visited, and transaction
            details provided by the affiliate networks.
          </Paragraph>

          <Paragraph>
            In some of our profiling questions you can choose to share sensitive
            personal data (e.g. data about your health) with us. Answering these
            questions is optional and we will process the data you share with us
            only if you give your explicit consent.
          </Paragraph>

          <Paragraph>
            Generally, you are free to choose if you want to provide your
            personal data to us. It is however in some instances necessary for
            you to provide personal data to us, e.g. to register an account.
            What exact personal data we require from you can be found in the
            tables below in relation to the legal bases "fulfilment of contract"
            and "legal obligation". The data we require from you is never
            sensitive data.
          </Paragraph>

          <Paragraph>
            If you don't provide us with certain requested personal data, you
            will not be able to participate in the surveys or games we provide
            or create and use an account. Furthermore, we will not be able to
            comply with bookkeeping and accounting law and handle possible legal
            claims.
          </Paragraph>
        </Section>

        {/* Section: Who can access */}
        <Section
          id="who-can-access"
          title="Who can gain access to your personal data and why?"
        >
          <Paragraph>
            Your personal data is primarily processed by Flow Group AB under the
            PollFlow project. However, in certain instances, we share your
            personal data with third parties in accordance with below.
          </Paragraph>

          <Paragraph>
            If you want to know more about who we share your personal data with,
            please feel free to contact us. Our contact details can be found in
            the beginning of this privacy policy.
          </Paragraph>

          <Paragraph>
            No matter the purpose for our processing of your personal data, we
            will share your personal data with our IT-suppliers who will process
            these on our behalf and on our instructions in order to ensure good
            and secure IT-operations. We only share your personal data with our
            IT-suppliers if it is necessary in order for them to fulfil their
            obligations towards us according to the contract that we have with
            them.
          </Paragraph>

          <SubSection title="If you participate in surveys">
            <BulletList
              items={[
                "In order to provide you with surveys that are relevant for you, we share your personal data with our survey partners who match your profile to available surveys. Our partners act as intermediating parties between us and the companies looking for participants in surveys by matching your profile to the needs of the survey companies.",
                "Any information you provide directly within a survey is processed by the third-party survey provider, not by SveaPanelen. We do not have access to your individual survey responses. The survey provider is a separate data controller for the data you provide within their surveys.",
              ]}
            />
          </SubSection>

          <SubSection title="If you use our cashback service">
            <BulletList
              items={[
                "In order to track your purchases and attribute cashback, we share data with our affiliate network partners. These networks process click and transaction data to verify purchases and calculate commissions.",
                "Each store you shop at through our cashback service is subject to its own terms and conditions. We are not a party to the agreement between you and the store. The store is a separate data controller for data you provide during your purchase.",
              ]}
            />
          </SubSection>

          <SubSection title="If you use mobile game offers">
            <BulletList
              items={[
                "In order to provide mobile game offers and verify completion of offer requirements, we share data with our game offer partners. These partners receive your device identifier, advertising ID, IP address, and information about your progress in the offered games.",
              ]}
            />
          </SubSection>

          <SubSection title="If you withdraw your earnings via Swish">
            <BulletList
              items={[
                "In order to process your Swish withdrawal, we share your full name, social security number, Swish phone number, and withdrawal amount with our payment processing service to complete the transaction.",
              ]}
            />
          </SubSection>
        </Section>

        {/* Section: Where processed */}
        <Section
          id="where-processed"
          title="Where are your personal data processed?"
        >
          <Paragraph>
            We, as well as our processors, mainly process your personal data
            within EU/EEA. When we process your personal data outside of the
            EU/EEA we do so because our partner, which help us match your profile
            to surveys you find interesting and relevant, will store your
            personal data outside of the EU/EEA.
          </Paragraph>

          <Paragraph>
            Some of our affiliate network partners and game offer providers may
            also process data outside of the EU/EEA.
          </Paragraph>

          <Paragraph>
            When we transfer your personal data outside of the EU/EEA, we do so
            based on either a decision from the Commission, standard contractual
            clauses or other appropriate safeguards as required by applicable
            data protection legislation.
          </Paragraph>

          <Paragraph>
            If you want to know more about who we share your personal data with,
            please feel free to contact us. Our contact details can be found in
            the beginning of this privacy policy.
          </Paragraph>
        </Section>

        {/* Section: Your rights */}
        <Section
          id="your-rights"
          title="What rights do you have in relation to our processing of your personal data?"
        >
          <Paragraph>
            According to applicable data protection legislation, depending on
            the circumstances, you are entitled to a number of different rights
            which are set out below.
          </Paragraph>

          <Paragraph mb={3}>
            If you have any questions regarding these rights or if you want to
            use any of your rights, you are welcome to contact us. Our contact
            details can be found in the beginning of this privacy policy.
          </Paragraph>

          <SubSection title="Right to information and access">
            <Paragraph>
              You have the right to obtain a confirmation on whether we process
              your personal data. If we process your personal data, you also
              have a right to receive information about how we process the
              personal data and to receive a copy of your personal data.
            </Paragraph>
          </SubSection>

          <SubSection title="Right to rectification">
            <Paragraph>
              You have a right to have inaccurate personal data corrected and to
              have incomplete personal data completed.
            </Paragraph>
          </SubSection>

          <SubSection title='Right to erasure ("right to be forgotten") and restriction of processing'>
            <Paragraph>
              You have the right to have your personal data erased in certain
              instances. This is the case e.g. when the personal data is no
              longer necessary for the purposes for which it was collected or
              otherwise processed and where we process your personal data on the
              basis of our legitimate interest and we find, following your
              objection (see below under Right to object), that we do not have
              an overriding interest in continuing to process it.
            </Paragraph>
            <Paragraph>
              You also have a right to request that we restrict our processing
              of your personal data. For example, when you question the accuracy
              of the personal data, when you have objected to our processing of
              your personal data based upon our legitimate interest, or where
              the processing is unlawful, and you oppose to the erasure of your
              personal data and instead want us to restrict our processing.
            </Paragraph>
          </SubSection>

          <SubSection title="Right to data portability">
            <Paragraph>
              In certain instances, you have a right to be provided with such
              personal data (concerning you) that you have provided to us, in a
              structured, commonly used and machine-readable format. You also
              have a right to in certain instances have such personal data
              transferred to another controller, where technically feasible.
            </Paragraph>
          </SubSection>

          <SubSection title="Right to object">
            <Paragraph>
              You have the right to object to our processing of your personal
              data if we use it for marketing purposes.
            </Paragraph>
            <Paragraph>
              You also have a right to object to our processing of your personal
              data when the processing is based on the legal basis "legitimate
              interest". The situations when we base our processing on our
              legitimate interest are stated in the below charts and you can
              read more about our balancing of interest assessments in the end
              of this privacy policy. In some instances, we may continue to
              process your personal data even if you have objected to our
              processing. This can be the case if we can show compelling
              legitimate reasons for the processing that outweigh your interests
              or if it is for the purpose of establishing, exercising or
              defending against legal claims.
            </Paragraph>
          </SubSection>

          <SubSection title="Right to withdraw consent">
            <Paragraph>
              You have the right to withdraw a given consent at any time. The
              withdrawal will not affect the lawfulness of processing based on
              your consent before the withdrawal.
            </Paragraph>
          </SubSection>

          <SubSection title="Right to lodge a complaint to a supervisory authority">
            <Paragraph>
              You have the right to lodge a complaint to a supervisory authority
              concerning our processing of your personal data.
            </Paragraph>
            <Paragraph>
              Such a complaint can be filed with the authority in the EU/EEA
              member state where you live, work or where the alleged
              infringement of applicable data protection legislation has
              occurred. In Sweden, the supervisory authority is The Swedish Data
              Protection Authority.
            </Paragraph>
          </SubSection>
        </Section>

        {/* Section: Virtual currency */}
        <Section id="virtual-currency" title="Virtual currency">
          <Paragraph>
            All balances, earnings, and amounts displayed within the {AppName}{" "}
            app represent virtual currency. Although values may be displayed
            using the denomination "SEK" or "kr" for ease of understanding, all
            in-app balances constitute virtual points without monetary value
            until a withdrawal is successfully completed via Swish. Virtual
            currency cannot be transferred between users, exchanged outside of
            the app, or considered as stored monetary value. We reserve the
            right to adjust conversion rates and virtual currency balances in
            accordance with our terms of service.
          </Paragraph>

          <Paragraph>
            This includes virtual currency used in our skill-based quiz games,
            where users can wager virtual points against other users. These
            wagers do not constitute real-money gambling, as the wagered amounts
            are virtual currency without monetary value.
          </Paragraph>
        </Section>

        {/* Section: Detailed description */}
        <Section
          id="detailed-description"
          title="Detailed description on how we process your personal data"
        >
          <Paragraph mb={3}>
            The below chart describes in detail why we process your personal
            data, which personal data we process, the lawful basis for the
            processing and for how long we process your personal data.
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
            If you register an account and become an {AppName} user
          </Typography>

          <DataCard
            title="To administer your account"
            processing={[
              "To create and enable you to securely use your account, including to communicate with you regarding your account",
              "To give you the benefits of having an account, including e.g. enable you to manage your settings and gain access to your survey history",
              "To keep track of the points you receive from various completed surveys",
              `To calculate your ranking compared to other ${AppName} users based on your points`,
            ]}
            personalData={{
              label: "Information you provide to us and information collected via BankID, e.g.:",
              items: [
                "Name (collected via BankID)",
                "Social security number (collected via BankID)",
                "Date of birth (collected via BankID)",
                "Contact information (email)",
                "Phone number (Swish number)",
                "Postal code and city",
                "Gender",
                "The number of surveys you have completed and points you have collected",
                "Other information you choose to provide to us, such as street address",
              ],
            }}
            legalBasis={[
              {
                basis: "Performance of contract",
                description: `The processing is necessary for us to fulfil the contract concerning your registration at ${AppName}.`,
              },
              {
                basis: "Legitimate interest",
                description:
                  "It is not necessary for you to provide us information about your street address to fulfil any contract. This information is instead processed on the basis of our legitimate interest to process your personal data in order to administer your account.",
              },
            ]}
            storagePeriod={`We will store your personal data until you choose to delete your account at ${AppName}.`}
          />

          <DataCard
            title="To administer your account — Referrals"
            processing={[
              `To keep track of when you have referred a friend to ${AppName} and how many points they have collected in order to reward you with extra points`,
            ]}
            personalData={{
              items: [
                "The points you collect",
                "Name of the friend you have referred",
                "The number of points your friend has claimed",
              ],
            }}
            legalBasis={[
              {
                basis: "Legitimate interest",
                description: `Our legitimate interest to process your personal data to reward you with the extra points for recruiting one of your friends to ${AppName}.`,
              },
              {
                basis: "",
                description: `If you are the referred friend and register an account, we will process your personal data based on the performance of contract, please see above.`,
              },
            ]}
            storagePeriod={`We will store your personal data until you choose to delete your account at ${AppName}.`}
          />

          <DataCard
            title="To administer your profile"
            processing={[
              "To ask you questions in order to create a profile for you that can be matched to relevant surveys",
              "To give you surveys that are matched to your interests and persona",
            ]}
            personalData={{
              label: "Information you provide to us, e.g.:",
              items: [
                "Information about your household, education and occupation, car, food and beverages, hobbies and interests, electronics, computer and video gaming, media, travel and what research surveys you are willing to participate in",
                "Information about your ethnicity, smoking and tobacco habits, healthcare and eventual children",
              ],
            }}
            legalBasis={[
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
            ]}
            storagePeriod='We will store your personal data until you choose to delete your account or until you change your answers to "I prefer not to declare this". We will stop storing your sensitive personal data immediately if you withdraw your consent.'
            notes={[
              "Note that it is optional to answer these questions and that you choose what information you want to share with us.",
            ]}
          />

          <DataCard
            title="To send you notifications"
            processing={[
              "To send you push notifications about new surveys, cashback offers, game rewards, and other service updates",
              "To send you email notifications about your account and available opportunities",
              "To send you SMS notifications when applicable",
            ]}
            personalData={{
              items: [
                "Device push notification token",
                "Email address",
                "Phone number",
                "Your notification preferences (push, email, SMS)",
              ],
            }}
            legalBasis={[
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
            ]}
            storagePeriod="We will store your notification token until you choose to delete your account or disable notifications. Notification history is retained until account deletion."
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
            If you participate in the surveys we provide
          </Typography>

          <DataCard
            title="To enable your profile to be matched with relevant surveys"
            processing={[
              "To enable your profile to be matched with surveys you find relevant and interesting we share information with our partners",
              "Our partner matches your profile to companies that have surveys both within the EU and outside of EU",
            ]}
            personalData={{
              label: "Information you provide to us, e.g.:",
              items: [
                "Name",
                "Contact information (email)",
                "Postal code and city",
                "Gender",
                "Date of birth",
                "The number of surveys you have completed and points you have collected",
                "Other information you choose to provide to us, such as street address and phone number",
                "Other information from the profiling questions you have chosen to answer",
                "Other information that might have technical administration purposes such as IP address or country location",
              ],
            }}
            legalBasis={[
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
            ]}
            storagePeriod={'We will store your personal data for survey matching purposes until you choose to delete your account. This is essential for providing you with targeted and relevant survey opportunities. We will stop storing your sensitive personal data immediately when you withdraw your consent or change your answers to "I prefer not to declare this".'}
          />

          <DataCard
            title="To provide surveys"
            processing={[
              "To provide you with surveys that you can participate in",
              "To award you points for each survey you partake in",
            ]}
            personalData={{
              label: "Information you provide to us, e.g.:",
              items: [
                "Name",
                "Contact information (email)",
                "Postal code and city",
                "Gender",
                "Date of birth",
                "Other information you choose to provide to us, such as street address and phone number",
                "The number of surveys you have completed and points you have collected",
                "Information you have provided to us through your profile",
              ],
            }}
            legalBasis={[
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to provide you with surveys that you can participate in.",
              },
            ]}
            storagePeriod="We will store your personal data until you choose to delete your account."
            notes={[
              "Note that we provide the opportunity for you to participate in surveys, but the actual surveys are managed by third parties. Any information you provide directly within a survey (your survey responses) is processed by the third-party survey provider and not by SveaPanelen. We do not have access to your individual survey responses. If you choose to state your name or any other information about yourself in a survey, the survey company might be able to tie your answers to you as a person. In such cases, the survey company is a separate data controller. If you want to know more about how they process your data you can contact the relevant company.",
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
            If you use our cashback service
          </Typography>

          <DataCard
            title="To provide cashback for online shopping"
            processing={[
              "To track your clicks when you visit a store through our app and attribute any resulting purchases to your account",
              "To calculate and credit cashback based on your verified purchases",
              "To display pending and approved cashback balances in your account",
              "To verify and validate transactions with our affiliate network partners",
              "To reject or reverse cashback earnings in cases of returned, cancelled, or manipulated orders",
            ]}
            personalData={{
              label: "Information collected through our service and affiliate partners:",
              items: [
                "Click data (timestamp, store visited, IP address, device information, referrer URL)",
                "Transaction data received from affiliate networks (order value, commission, currency, transaction date, validation status)",
                "Store and product category information",
                "Decline reasons for rejected transactions",
              ],
            }}
            legalBasis={[
              {
                basis: "Performance of contract",
                description: `The processing is necessary for us to fulfil the contract concerning your use of the cashback service within ${AppName}.`,
              },
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process transaction data to verify purchases, detect fraud, and prevent manipulation of cashback earnings.",
              },
            ]}
            storagePeriod="We will store your cashback transaction data until you choose to delete your account. Transaction records may be retained longer where required for bookkeeping and accounting obligations."
            notes={[
              "Cashback is calculated on the order value excluding VAT, taxes, and shipping costs, and is rounded down to the nearest whole number. Cashback rates are set by the individual stores and may vary.",
              "Modified, cancelled, or returned orders do not generate cashback. If cashback has already been credited for a transaction that is subsequently returned or reversed, we reserve the right to deduct the corresponding amount from your balance.",
              "We reserve the right to reject or reverse cashback earnings in cases of suspected fraud, manipulation, or violation of store terms. This includes but is not limited to: use of unauthorized discount codes, splitting purchases to maximize cashback, or any other form of abuse.",
              "Each store is subject to its own terms and conditions. We are not a party to the purchase agreement between you and the store, and we are not responsible for the store's products, services, or campaigns.",
              "Cashback tracking requires that you access the store through our app. Purchases made directly on a store's website or app without clicking through our service cannot be tracked or credited.",
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
            If you use mobile game offers or play quiz games
          </Typography>

          <DataCard
            title="To provide mobile game offers"
            processing={[
              "To display available mobile game offers that you can complete for rewards",
              "To track your installation and progress in offered games",
              "To verify completion of offer requirements and credit rewards to your account",
            ]}
            personalData={{
              label: "Information collected through our game offer partners:",
              items: [
                "Device identifier and advertising ID",
                "App installation status and progress events",
                "IP address and country of origin",
                "Device type and operating system",
                "Reward levels achieved and amounts earned",
              ],
            }}
            legalBasis={[
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to provide you with mobile game offers, verify completion of offer requirements, and credit rewards to your account.",
              },
            ]}
            storagePeriod="We will store your game offer data until you choose to delete your account."
            notes={[
              "Mobile game offers are provided through third-party partners. When you install and interact with an offered game, these partners collect data about your device and in-game activity to verify offer completion. These partners act as separate data controllers for the data they collect through their SDKs.",
            ]}
          />

          <DataCard
            title="To provide skill-based quiz games"
            processing={[
              "To provide you with quiz games where you can play against other users",
              "To match you with opponents and manage game sessions",
              "To calculate scores based on correct answers and response time",
              "To process virtual currency wagers and payouts for each game",
              "To calculate your ranking compared to other players",
            ]}
            personalData={{
              items: [
                "Name and profile avatar",
                "Quiz answers and response times",
                "Virtual currency balance and wager amounts",
                "Win/loss record and ranking",
                "Duel credits balance",
              ],
            }}
            legalBasis={[
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to allow you to play skill-based quiz games, compete against other users, and manage virtual currency wagers and payouts.",
              },
            ]}
            storagePeriod="We will store your personal data until you choose to delete your account."
            notes={[
              "Quiz games involve wagering virtual currency (displayed as SEK) against other users. These wagers are made with virtual points that have no monetary value. Game outcomes are determined by skill (knowledge and response speed), not by chance.",
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
            If you withdraw your earnings
          </Typography>

          <DataCard
            title="To administer withdrawal of your virtual currency via Swish"
            processing={[
              "To convert your virtual currency balance into a Swish payment",
              "To process and send the Swish payment to your registered phone number",
              "To keep track of your withdrawal history and payment status",
            ]}
            personalData={{
              label: "Information you provide to us, e.g.:",
              items: [
                "Name",
                "Social security number",
                "Swish phone number",
                "Withdrawal amount",
                "Payment status and transaction reference",
              ],
            }}
            legalBasis={[
              {
                basis: "Performance of contract",
                description: `The processing is necessary for us to fulfil the contract concerning your membership in ${AppName} which means you receive points that can be withdrawn as Swish payments in exchange for participating in surveys and other activities.`,
              },
            ]}
            storagePeriod="We will store your withdrawal data until you choose to delete your account. Transaction records may be retained longer where required for bookkeeping and accounting obligations."
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
            If you interact with us on social media
          </Typography>

          <DataCard
            title="To communicate with you on social media"
            processing={[
              "To communicate with you on our social media account (Facebook), e.g. if you communicates with us on our page",
            ]}
            personalData={{
              items: [
                "Information from your profile on the social media in question (user name and any picture you have chosen for your account)",
                "Information which you provide on our page",
              ],
            }}
            legalBasis={[
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to communicate with you on our social media platform.",
              },
            ]}
            storagePeriod="Your personal data will be removed if you ask us to remove it or if you yourself delete the content, but we will otherwise store the personal data on the social media platform until further notice."
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
            Other processing activities
          </Typography>

          <DataCard
            title="To provide customer service"
            processing={[
              "Answer and administer customer service matters",
            ]}
            personalData={{
              items: [
                "Name",
                "Contact information you provide in our contact",
                "Other information you provide regarding the matter, e.g. a problem with a function",
              ],
            }}
            legalBasis={[
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to answer and administer customer service matters.",
              },
            ]}
            storagePeriod="We will store your personal data until the account is removed."
          />

          <DataCard
            title="To improve our services"
            processing={[
              "To improve our services and website's functions based on your feedback",
            ]}
            personalData={{
              label: "Information you provide to us, e.g.:",
              items: [
                "Name",
                "Contact details (e-mail)",
                "Other information you provide to us when sending us feedback",
              ],
            }}
            legalBasis={[
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to handle your feedback and improve our services.",
              },
            ]}
            storagePeriod="We will store your personal data until account is removed"
          />

          <DataCard
            title="To detect and prevent fraud"
            processing={[
              "To verify your identity and prevent fraudulent account creation",
              "To check your IP address against known proxies, VPNs, and suspicious sources",
              "To monitor for suspicious patterns of activity such as manipulation of cashback, surveys, or game offers",
              "To enforce country restrictions and verify your geographic location",
            ]}
            personalData={{
              items: [
                "IP address",
                "Device identifier and advertising ID",
                "Country and geographic location data",
                "Proxy and VPN detection results",
                "Login history and activity patterns",
                "Transaction and earnings history",
              ],
            }}
            legalBasis={[
              {
                basis: "Legitimate interest",
                description:
                  "Our legitimate interest to process your personal data to detect and prevent fraud, protect the integrity of our services, and ensure fair use for all users.",
              },
            ]}
            storagePeriod="We will store fraud prevention data until you choose to delete your account. IP and proxy check logs may be retained for up to 12 months for security purposes."
          />

          <DataCard
            title="To handle any claims and rights"
            processing={[
              "Handle any consumer rights such as your right to make complaints",
              "Defend ourselves against claims and complaints",
              "Initiate any claims",
            ]}
            personalData={{
              items: [
                "Name",
                "Contact details you have chosen to use, e.g. email address and/or phone number",
                "Information from our communication with you in relation to the claim, e.g. information about the relevant booking or information about your stay",
              ],
            }}
            legalBasis={[
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
            ]}
            storagePeriod="We will store your personal data until we have processed the complaint, until we have handled the right or for the duration of the dispute."
          />

          <DataCard
            title="To comply with bookkeeping and accounting legislation"
            processing={[
              "Store information in bookkeeping and accounting",
            ]}
            personalData={{
              items: [
                "Name",
                "History regarding withdrawals and payments made",
                "Other information that constitutes accounting records",
              ],
            }}
            legalBasis={[
              {
                basis: "Legal obligation",
                description:
                  "The processing is necessary to comply with legal obligations to which we are subject, i.e. bookkeeping and accounting legislation.",
              },
            ]}
            storagePeriod="We will store your personal data until and including the seventh year after the end of the calendar year for the fiscal year to which the personal data relates."
          />
        </Section>

        {/* Section: Analytics and tracking */}
        <Section
          id="analytics-tracking"
          title="Analytics and tracking technologies"
        >
          <Paragraph>
            We use the following analytics and tracking services to improve our
            service, measure performance, and understand how users interact with
            our app:
          </Paragraph>

          <SubSection title="App analytics">
            <Paragraph>
              We use third-party analytics services to track app usage events,
              screen views, and user engagement. These services collect device
              information, app usage data, and custom events that we define.
              Analytics data helps us understand how our app is used and
              improve our services.
            </Paragraph>
          </SubSection>

          <SubSection title="Advertising and attribution">
            <Paragraph>
              We use third-party SDKs for conversion attribution and event
              tracking. These SDKs may collect data about your app activity
              including registration, purchases, and engagement events. This
              data may be used by third-party advertising platforms in
              accordance with their respective privacy policies.
            </Paragraph>
          </SubSection>

          <SubSection title="Deep linking and referral attribution">
            <Paragraph>
              We use third-party deep linking services for referral
              attribution. These services collect data about how you arrived at
              our app, including referring links, click timestamps, and device
              information. This is used to attribute referrals and measure
              marketing effectiveness.
            </Paragraph>
          </SubSection>

          <SubSection title="Error monitoring">
            <Paragraph>
              We use third-party error monitoring services to track and resolve
              technical issues. These services collect technical error logs,
              stack traces, and limited device information when errors occur in
              the app. This is used solely for identifying and fixing technical
              issues.
            </Paragraph>
          </SubSection>

          <SubSection title="App Tracking Transparency (iOS)">
            <Paragraph>
              On iOS devices, we request your permission to track your activity
              across other companies' apps and websites through Apple's App
              Tracking Transparency framework. You can grant or deny this
              permission, and you can change your choice at any time in your
              device settings. If you deny tracking, we will not share your
              device's advertising identifier with third parties.
            </Paragraph>
          </SubSection>

          <SubSection title="Browser extension">
            <Paragraph>
              If you use our Safari browser extension for cashback tracking,
              authentication data is shared between the app and the extension
              via a secure iOS App Group. This is necessary for the extension to
              attribute your purchases to your {AppName} account. No additional
              personal data is collected through the extension beyond what is
              described in this privacy policy.
            </Paragraph>
          </SubSection>

          <SubSection title="Do Not Track">
            <Paragraph>
              Our service does not currently respond to "Do Not Track" browser
              signals. However, you can control tracking through your device
              settings, including the App Tracking Transparency prompt on iOS.
            </Paragraph>
          </SubSection>
        </Section>

        {/* Section: Automated decision-making */}
        <Section
          id="automated-decisions"
          title="Automated decision-making"
        >
          <Paragraph>
            We use automated processing to match your profile with relevant
            surveys. This matching is based on the demographic and profiling
            information you have provided, such as age, gender, location,
            interests, and other profile attributes. The outcome of this
            automated matching determines which surveys are shown to you. This
            processing does not produce legal effects or similarly significant
            effects on you — it only affects which survey opportunities are
            displayed to you.
          </Paragraph>

          <Paragraph>
            We also use automated processing for fraud detection, including
            checking IP addresses against known proxy and VPN databases and
            monitoring activity patterns for suspicious behaviour. In some
            cases, this automated processing may result in restrictions on your
            account. Under GDPR Article 22, you have the right not to be
            subject to a decision based solely on automated processing that
            produces legal or similarly significant effects on you. If you
            believe such a decision has been made about you, you have the right
            to obtain human intervention, express your point of view, and
            contest the decision by contacting our Data Protection Officer.
          </Paragraph>
        </Section>

        {/* Section: Account deletion */}
        <Section
          id="account-deletion"
          title="Account deletion and data retention"
        >
          <Paragraph>
            When you delete your account, we take the following steps to protect
            your privacy:
          </Paragraph>

          <BulletList
            items={[
              "Your personal identification data (name, email, social security number, phone number, postal code) is scrambled and anonymized so that it can no longer be linked to you as a person.",
              "Your profiling answers and active game data are permanently deleted.",
              "Your data is deleted from our third-party survey partners where technically possible.",
              "Your push notification tokens are permanently deleted.",
              "Your notification preferences are disabled.",
            ]}
          />

          <Paragraph>
            Please note that certain anonymized records are retained even after
            account deletion for the following purposes:
          </Paragraph>

          <BulletList
            items={[
              "Survey completion records, cashback transactions, withdrawal history, and game completion records are retained in anonymized form for bookkeeping, accounting, and fraud prevention purposes.",
              "We are legally required to retain certain financial records for up to seven years after the end of the relevant fiscal year, in accordance with Swedish bookkeeping and accounting legislation.",
            ]}
          />

          <Paragraph>
            After anonymization, the retained records cannot be linked back to
            you as an identifiable person.
          </Paragraph>
        </Section>

        {/* Section: Business transfers */}
        <Section id="business-transfers" title="Business transfers">
          <Paragraph>
            If Flow Group AB or its assets are acquired by or merged with
            another company, or in the unlikely event that we go out of business
            or enter bankruptcy, personal data may be among the assets
            transferred to the acquiring party. In such a case, you will be
            notified before your personal data is transferred and becomes
            subject to a different privacy policy. The acquiring party will be
            required to continue to process your personal data in accordance
            with applicable data protection legislation.
          </Paragraph>
        </Section>

        {/* Section: Data breach */}
        <Section id="data-breach" title="Data breach procedures">
          <Paragraph>
            In the event of a personal data breach that is likely to result in a
            risk to your rights and freedoms, we will notify the Swedish Data
            Protection Authority (IMY) without undue delay and no later than 72
            hours after becoming aware of the breach, in accordance with GDPR
            Article 33. If the breach is likely to result in a high risk to your
            rights and freedoms, we will also notify you directly without undue
            delay, in accordance with GDPR Article 34.
          </Paragraph>
        </Section>

        {/* Section: Cookies */}
        <Section id="cookies" title="Cookies and similar technologies">
          <Paragraph>
            When you use our app and related services (such as our Safari
            browser extension for cashback), we and our partners may use cookies
            and similar tracking technologies to enable essential functionality,
            measure performance, and attribute transactions.
          </Paragraph>

          <SubSection title="Essential cookies">
            <Paragraph>
              These are necessary for the service to function and include
              session management, authentication tokens, and security tokens
              (e.g. CSRF protection). These cannot be disabled.
            </Paragraph>
          </SubSection>

          <SubSection title="Analytics cookies">
            <Paragraph>
              We use analytics cookies and SDKs to understand how users interact
              with our service, measure feature usage, and improve the user
              experience. These are activated based on your consent.
            </Paragraph>
          </SubSection>

          <SubSection title="Advertising and attribution cookies">
            <Paragraph>
              We use advertising SDKs and attribution tools to measure the
              effectiveness of marketing campaigns and attribute app installs
              and registrations. On iOS, these are subject to your App Tracking
              Transparency choice.
            </Paragraph>
          </SubSection>

          <SubSection title="Affiliate tracking cookies">
            <Paragraph>
              When you use our cashback service, tracking technology is placed
              on your device to document your transaction and attribute your
              purchase. This is necessary for the cashback service to function.
              The tracking is initiated when you click through to a store via
              our service and is used solely for cashback attribution.
            </Paragraph>
          </SubSection>

          <Paragraph>
            You can manage your cookie preferences through your device or
            browser settings. Please note that disabling certain cookies may
            affect the functionality of our services, particularly cashback
            tracking.
          </Paragraph>
        </Section>

        {/* Section: Balancing of interests */}
        <Section
          id="balancing-of-interests"
          title="Balancing of interests assessments"
        >
          <Paragraph>
            As we state above, for some purposes, we process your personal data
            based upon our "legitimate interest". By carrying out a balancing of
            interests assessment concerning our processing of your personal
            data, we have concluded that our legitimate interest for the
            processing outweighs your interests or rights which require the
            protection of your personal data.
          </Paragraph>

          <Paragraph>
            Below is a summary of the key balancing assessments we have
            conducted:
          </Paragraph>

          <BulletList
            items={[
              "Profile administration and survey matching: We have a strong interest in providing you with relevant surveys based on your profile. The data processed is information you have voluntarily chosen to provide, and the impact on your privacy is limited since the processing primarily benefits you through more relevant survey opportunities.",
              "Referral tracking: We have an interest in rewarding users who refer friends. Only minimal data is processed (names and points), and the processing directly benefits both the referrer and the referred user.",
              "Fraud detection: We have a strong interest in protecting the integrity of our platform for all users. The data processed (IP addresses, activity patterns) is necessary to identify and prevent abuse. The impact on legitimate users is minimal as the monitoring is automated and only results in action when suspicious patterns are detected.",
              "Cashback transaction verification: We have an interest in verifying that cashback transactions are legitimate. Transaction data is processed to prevent manipulation and ensure fair use. This protects both us and other users from the consequences of fraudulent activity.",
              "Service improvement: We have an interest in improving our services based on user feedback. The data processed is information voluntarily provided to us, and the processing benefits all users through an improved service.",
              "Customer service: We have an interest in providing effective support. The data processed is information you provide when contacting us, and the processing directly benefits you.",
            ]}
          />

          <Paragraph>
            If you want more information in relation to our balancing of
            interests assessments, please do not hesitate to contact us. Our
            contact details can be found in the beginning of this privacy
            policy.
          </Paragraph>
        </Section>

        {/* Section: DPO */}
        <Section id="dpo" title="Data Protection Officer">
          <Paragraph>
            Our Data Protection Officer is Oliver Weitman, who can be reached
            at oliver@pollflow.io for any questions or concerns regarding the
            processing of your personal data.
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
          This privacy policy was last updated on 2026-04-01. Originally
          established by Flow Group AB on 2021-08-18.
        </Typography>
      </Container>
    </ThemeProvider>
  );
};

export default TermsPage;
