"use client";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  Box,
  Link,
} from "@mui/material";
import { useSearchParams } from "next/navigation";

const TermsPage = () => {
  const AppName = "SveaPanelen";

  const searchParams = useSearchParams();

  const showLayout = searchParams.get("showLayout") || "true";

  const SupportEmail = "hello@pollapp.io";

  return (
    <div>
      <Container maxWidth="lg">
        <Box my={4}>
          <Typography variant="h2" component="h1" gutterBottom>
            Privacy Policy
          </Typography>

          <Typography paragraph>
            Flow Group AB, a Swedish company with company organization number
            559183-6027 ("Flow Group", "{AppName}", "we", "our" or "us"), is
            responsible for the processing of your personal data as described
            below. This privacy policy concerns you who register an account and
            become an {AppName} user.
          </Typography>

          <Typography paragraph>
            {AppName}, a platform built by Flow Group, is a company based in
            Sweden with organization number 559183-6027
          </Typography>

          <Typography paragraph>
            We care about and value your privacy. Through this privacy policy we
            therefore wish to provide you with information on how we process
            your personal data as well as what rights you have in relation to
            our processing of your personal data.
          </Typography>

          <Typography variant="h6" gutterBottom>
            We process your personal data for the following general purposes:
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary={
                  "To create and administer your account at " + AppName + ";"
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  "To create and administer your profile at " + AppName + ";"
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="To match your profile with surveys that are relevant for you;" />
            </ListItem>
            <ListItem>
              <ListItemText primary="To provide surveys" />
            </ListItem>
            <ListItem>
              <ListItemText primary="To administer your withdrawal of points for gift cards or digital payment processors;" />
            </ListItem>
            <ListItem>
              <ListItemText primary="To provide customer service and improve our website by analyzing feedback;" />
            </ListItem>
            <ListItem>
              <ListItemText primary="To administer your interactions with us on our social media account; and" />
            </ListItem>
            <ListItem>
              <ListItemText primary="to comply with our legal obligations and handle possible legal claims." />
            </ListItem>
          </List>

          <Typography paragraph>
            Below you can read more about how we process your personal data.
            Should you have any questions regarding our processing of your
            personal data, or if you wish to exercise any of your rights under
            data protection legislation, please contact us via our email address
            {SupportEmail}. Our postal address is Flow Group AB Stora Tomegatan
            21, 223 51, Lund.
          </Typography>

          <Typography variant="h4" gutterBottom>
            Table of Contents
          </Typography>

          <List>
            <ListItem>
              <Link href="#from-where">
                From where do we collect your personal data and are you required
                to provide personal data to us?
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#who-can-access">
                Who can gain access to your personal data and why?
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#where-processed">
                Where are your personal data processed?
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#your-rights">
                What rights do you have in relation to our processing of your
                personal data?
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#detailed-description">
                Detailed description on how we process your personal data
              </Link>
            </ListItem>
            <ListItem>
              <Link href="#balancing-of-interests">
                Balancing of interests assessments
              </Link>
            </ListItem>
          </List>

          <Typography variant="h4" id="from-where" gutterBottom>
            From where do we collect your personal data and are you required to
            provide personal data to us?
          </Typography>

          <Typography paragraph>
            We collect your personal data directly from you, for example when
            you register an account and answer our profiling questions.
          </Typography>

          <Typography paragraph>
            In some of our profiling questions you can choose to share sensitive
            personal data (e.g. data about your health) with us. Answering these
            questions is optional and we will process the data you share with us
            only if you give your explicit consent.
          </Typography>

          <Typography paragraph>
            Generally, you are free to choose if you want to provide your
            personal data to us. It is however in some instances necessary for
            you to provide personal data to us, e.g. to register an account.
            What exact personal data we require from you can be found in the
            tables below in relation to the legal bases "fulfilment of contract"
            and "legal obligation". The data we require from you is never
            sensitive data.
          </Typography>

          <Typography paragraph>
            If you don't provide us with certain requested personal data, you
            will not be able to participate in the surveys or games we provide
            or create and use an account. Furthermore, we will not be able to
            comply with bookkeeping and accounting law and handle possible legal
            claims.
          </Typography>

          <Typography variant="h4" id="who-can-access" gutterBottom>
            Who can gain access to your personal data and why?
          </Typography>

          <Typography paragraph>
            Your personal data is primarily processed by Flow Group AB under the
            name Panel Evolution. However, in certain instances, we share your
            personal data with third parties in accordance with below.
          </Typography>

          <Typography paragraph>
            If you want to know more about who we share your personal data with,
            please feel free to contact us. Our contact details can be found in
            the beginning of this privacy policy.
          </Typography>

          <Typography paragraph>
            No matter the purpose for our processing of your personal data, we
            will share your personal data with our IT-suppliers who will process
            these on our behalf and on our instructions in order to ensure good
            and secure IT-operations. We only share your personal data with our
            IT-suppliers if it is necessary in order for them to fulfil their
            obligations towards us according to the contract that we have with
            them.
          </Typography>

          <Typography variant="h5" gutterBottom>
            If you participate in surveys
          </Typography>

          <List>
            <ListItem>
              <ListItemText primary="In order to provide you with surveys that is relevant for you, we share your personal data with our partners who provide the surveys. Our partners act as intermediating parties between us and the companies looking for participants in surveys by matching your profile to the needs of the survey companies." />
            </ListItem>
            <ListItem>
              <ListItemText primary="In order to administer your withdrawal of points in PayPal money, we will share information about your payment with PayPal. PayPal will process your data as a controller, meaning they are responsible for their own processing activities." />
            </ListItem>
          </List>

          <Typography variant="h4" id="where-processed" gutterBottom>
            Where are your personal data processed?
          </Typography>

          <Typography paragraph>
            We, as well as our processors, mainly process your personal data
            within EU/EEA. When we process your personal data outside of the
            EU/EEA we do so because our partner, which help us match your
            profile to surveys you find interesting and relevant, will store
            your personal data outside of the EU/EEA.
          </Typography>

          <Typography paragraph>
            When we transfer your personal data outside of the EU/EEA, we do so
            based on either a decision from the Commission, standard contractual
            clauses or Privacy Shield.
          </Typography>

          <Typography paragraph>
            If you want to know more about who we share your personal data with,
            please feel free to contact us. Our contact details can be found in
            the beginning of this privacy policy.
          </Typography>

          <Typography variant="h4" id="your-rights" gutterBottom>
            What rights do you have in relation to our processing of your
            personal data?
          </Typography>

          <Typography paragraph>
            According to applicable data protection legislation, depending on
            the circumstances, you are entitled to a number of different rights
            which are set out below.
          </Typography>

          <Typography paragraph>
            If you have any questions regarding these rights or if you want to
            use any of your rights, you are welcome to contact us. Our contact
            details can be found in the beginning of this privacy policy.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Right to information and access
          </Typography>

          <Typography paragraph>
            You have the right to obtain a confirmation on whether we process
            your personal data. If we process your personal data, you also have
            a right to receive information about how we process the personal
            data and to receive a copy of your personal data.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Right to rectification
          </Typography>

          <Typography paragraph>
            You have a right to have inaccurate personal data corrected and to
            have incomplete personal data completed.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Right to erasure ("right to be forgotten") and restriction of
            processing
          </Typography>

          <Typography paragraph>
            You have the right to have your personal data erased in certain
            instances. This is the case e.g. when the personal data is no longer
            necessary for the purposes for which it was collected or otherwise
            processed and where we process your personal data on the basis of
            our legitimate interest and we find, following your objection (see
            below under Right to object), that we do not have an overriding
            interest in continuing to process it.
          </Typography>

          <Typography paragraph>
            You also have a right to request that we restrict our processing of
            your personal data. For example, when you question the accuracy of
            the personal data, when you have objected to our processing of your
            personal data based upon our legitimate interest, or where the
            processing is unlawful, and you oppose to the erasure of your
            personal data and instead want us to restrict our processing.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Right to data portability
          </Typography>

          <Typography paragraph>
            In certain instances, you have a right to be provided with such
            personal data (concerning you) that you have provided to us, in a
            structured, commonly used and machine-readable format. You also have
            a right to in certain instances have such personal data transferred
            to another controller, where technically feasible.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Right to object
          </Typography>

          <Typography paragraph>
            You have the right to object to our processing of your personal data
            if we use it for marketing purposes.
          </Typography>

          <Typography paragraph>
            You also have a right to object to our processing of your personal
            data when the processing is based on the legal basis "legitimate
            interest". The situations when we base our processing on our
            legitimate interest are stated in the below charts and you can read
            more about our balancing of interest assessments in the end of this
            privacy policy. In some instances, we may continue to process your
            personal data even if you have objected to our processing. This can
            be the case if we can show compelling legitimate reasons for the
            processing that outweigh your interests or if it is for the purpose
            of establishing, exercising or defending against legal claims.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Right to withdraw consent
          </Typography>

          <Typography paragraph>
            You have the right to withdraw a given consent at any time. The
            withdrawal will not affect the lawfulness of processing based on
            your consent before the withdrawal.
          </Typography>

          <Typography variant="h5" gutterBottom>
            Right to lodge a complaint to a supervisory authority
          </Typography>

          <Typography paragraph>
            You have the right to lodge a complaint to a supervisory authority
            concerning our processing of your personal data.
          </Typography>

          <Typography paragraph>
            Such a complaint can be filed with the authority in the EU/EEA
            member state where you live, work or where the alleged infringement
            of applicable data protection legislation has occurred. In Sweden,
            the supervisory authority is The Swedish Data Protection Authority.
          </Typography>

          <Typography variant="h4" id="detailed-description" gutterBottom>
            Detailed description on how we process your personal data
          </Typography>

          <Typography paragraph>
            The below chart describes in detail why we process your personal
            data, which personal data we process, the lawful basis for the
            processing and for how long we process your personal data.
          </Typography>

          <Typography variant="h5" gutterBottom>
            If you register an account and become an {AppName} user
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="h6">
                      To administer your account
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>What processing we perform</TableCell>
                  <TableCell>What personal data we process</TableCell>
                  <TableCell>Our lawful basis for the processing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="To create and enable you to securely use your account, including to communicate with you regarding your account" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To give you the benefits of having an account, including e.g. enable you to manage your settings and gain access to your survey history" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To keep track of the points you receive from various completed surveys" />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary={
                            "To calculate your ranking compared to other " +
                            AppName +
                            " users based on your points"
                          }
                        />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Information you provide to us, e.g.:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Name" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Contact information (email)" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Postal code and city" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Gender" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Date of birth" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="The number of surveys you have completed and points you have collected" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Social security number, if provided by the user" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Other information you choose to provide to us, such as street address and phone number" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Performance of contract
                    </Typography>
                    <Typography paragraph>
                      The processing is necessary for us to fulfil the contract
                      concerning your registration at {AppName}.
                    </Typography>
                    <Typography variant="subtitle2">
                      Legitimate interest
                    </Typography>
                    <Typography paragraph>
                      It is not necessary for you to provide us information
                      about your street address and phone number to fulfil any
                      contract. This information is instead processed on the
                      basis of our legitimate interest to process your personal
                      data in order to administer your account.
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={
                            "To keep track of when you have referred a friend to " +
                            AppName +
                            " and how many points they have collected in order to reward you with extra points"
                          }
                        />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="The points you collect" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Name of the friend you have referred" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="The number of points your friend has claimed" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Legitimate interest
                    </Typography>
                    <Typography paragraph>
                      Our legitimate interest to process your personal data to
                      reward you with the extra points for recruiting one of
                      your friends to {AppName}.
                    </Typography>
                    <Typography paragraph>
                      If you are the referred friend and register an account, we
                      will process your personal data based on the performance
                      of contract, please see above.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" mt={2} mb={4}>
            Storage period: We will store your personal data until you choose to
            delete your account at {AppName}.
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="h6">
                      To administer your profile
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>What processing we perform</TableCell>
                  <TableCell>What personal data we process</TableCell>
                  <TableCell>Our lawful basis for the processing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="To ask you questions in order to create a profile for you that can be matched to relevant surveys" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To give you surveys that are matched to your interests and persona" />
                      </ListItem>
                    </List>
                    <Typography variant="body2">
                      Note that it is optional to answer these questions and
                      that you choose what information you want to share with
                      us.
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Information you provide to us, e.g.:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Information about your household, education and occupation, car, food and beverages, hobbies and interests, electronics, computer and video gaming, media, travel and what research surveys you are willing to participate in" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Information about your ethnicity, smoking and tobacco habits, healthcare and eventual children" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Legitimate interest
                    </Typography>
                    <Typography paragraph>
                      Our legitimate interest to process your personal data that
                      you choose to give us to be able to create and administer
                      your profile.
                    </Typography>
                    <Typography variant="subtitle2">
                      Explicit consent
                    </Typography>
                    <Typography paragraph>
                      Sensitive information will be processed based on your
                      explicit consent. You can withdraw such consent at any
                      time. You can also change some of the answers you have
                      given to "I prefer not to declare this".
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" mt={2} mb={4}>
            Storage period: We will store your personal data until you choose to
            delete your account or until you change your answers to "I prefer
            not to declare this". We will stop storing your sensitive personal
            data immediately if you withdraw your consent.
          </Typography>

          <Typography variant="h5" gutterBottom>
            If you participate in the surveys and/or games we provide
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="h6">
                      To enable your profile to be matched with relevant surveys
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>What processing we perform</TableCell>
                  <TableCell>What personal data we process</TableCell>
                  <TableCell>Our lawful basis for the processing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="To enable your profile to be matched with surveys you find relevant and interesting we share information with our partners" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Our partner matches your profile to companies that have surveys both within the EU and outside of EU" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Information you provide to us, e.g.:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Name" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Contact information (email)" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Postal code and city" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Gender" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Date of birth" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="The number of surveys you have completed and points you have collected" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Other information you choose to provide to us, such as street address and phone number" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Other information from the profiling questions you have chosen to answer" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Other information that might have technical administration purposes such as IP address or country location" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Legitimate interest
                    </Typography>
                    <Typography paragraph>
                      Our legitimate interest to process your personal data to
                      enable your profile to be match with surveys you find
                      relevant and interesting.
                    </Typography>
                    <Typography variant="subtitle2">
                      Explicit consent
                    </Typography>
                    <Typography paragraph>
                      Sensitive information will be processed based on your
                      explicit consent. You can withdraw such consent at any
                      time. You can also change some of the answers you have
                      given to "I prefer not to declare this".
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" mt={2} mb={4}>
            Storage period: We will process your personal data until the
            matching is done. We will stop storing your sensitive personal data
            immediately when you withdraw your consent or change your answers to
            "I prefer not to declare this".
          </Typography>

          {/* Table for "To provide surveys" */}
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="h6">To provide surveys</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>What processing we perform</TableCell>
                  <TableCell>What personal data we process</TableCell>
                  <TableCell>Our lawful basis for the processing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="To provide you with surveys that you can participate in" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To award you points for each survey you partake in" />
                      </ListItem>
                    </List>
                    <Typography variant="body2">
                      Note that we provide the opportunity for you to
                      participate in surveys, but the actual surveys are managed
                      by third parties. If you choose to state your name or any
                      other information about yourself in a survey, the survey
                      company might be able to tie your answers to you as a
                      person. In such cases, the survey company will become a
                      controller. If you want to know more about how they
                      process your data you can contact the relevant company.
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Information you provide to us, e.g.:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Name" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Contact information (email)" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Postal code and city" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Gender" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Date of birth" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Other information you choose to provide to us, such as street address and phone number" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="The number of surveys you have completed and points you have collected" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Information you have provided to us through your profile" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Legitimate interest
                    </Typography>
                    <Typography paragraph>
                      Our legitimate interest to process your personal data to
                      provide you with surveys that you can participate in.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" mt={2} mb={4}>
            Storage period: We will process your personal data until the survey
            is finalized.
          </Typography>

          {/* Table for "To provide games" */}
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="h6">To provide games</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>What processing we perform</TableCell>
                  <TableCell>What personal data we process</TableCell>
                  <TableCell>Our lawful basis for the processing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="To provide you with games that you can play" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To calculate your points after each game you win or lose" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To calculate your ranking compared to other players" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Information you provide to us, e.g.:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Name" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="The number of points you have collected" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="The number of points you win or lose when playing the games" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Legitimate interest
                    </Typography>
                    <Typography paragraph>
                      Our legitimate interest to process your personal data to
                      allow you to play games that we provide, get the chance to
                      win extra points and see how you rank in comparison to
                      other users.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" mt={2} mb={4}>
            Storage period: We will store your personal data until you choose to
            delete your account.
          </Typography>

          {/* Table for "To administer withdrawal of your points in exchange for gift cards" */}
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="h6">
                      To administer withdrawal of your points in exchange for
                      gift cards
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>What processing we perform</TableCell>
                  <TableCell>What personal data we process</TableCell>
                  <TableCell>Our lawful basis for the processing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="To turn the points you have received into gift cards" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To send you the gift card" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Information you provide to us, e.g.:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Name" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Contact information (email)" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="The number of surveys you have completed and points you have collected" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Information about what gift card you choose" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Performance of contract
                    </Typography>
                    <Typography paragraph>
                      The processing is necessary for us to fulfil the contract
                      concerning your membership in {AppName} which means you
                      receive points that can be withdrawn as gift cards in
                      exchange for participating in surveys.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" mt={2} mb={4}>
            Storage period: We will process your personal data until the
            withdrawal is finalized.
          </Typography>

          {/* Table for "To administer withdrawal of your points in exchange for online payment processors" */}
          <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>
                    <Typography variant="h6">
                      To administer withdrawal of your points in exchange for
                      online payment processors
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>What processing we perform</TableCell>
                  <TableCell>What personal data we process</TableCell>
                  <TableCell>Our lawful basis for the processing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <List>
                      <ListItem>
                        <ListItemText primary="To turn the points you have received into digital currency" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="To send you the payment reward" />
                      </ListItem>
                    </List>
                    <Typography variant="body2">
                      Note that in order to turn your points into PayPal money
                      we share your personal data with PayPal. If you want more
                      information on how PayPal processes your data you can
                      contact PayPal.
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Information you provide to us, e.g.:
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText primary="Name" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Contact information (email)" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="The number of surveys you have completed and points you have collected" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Information about what gift card you choose" />
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      Performance of contract
                    </Typography>
                    <Typography paragraph>
                      The processing is necessary for us to fulfil the contract
                      concerning your membership in {AppName} which means you
                      receive points that can be withdrawn as PayPal money in
                      exchange for participating in surveys.
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" mt={2} mb={4}>
            Storage period: We will store your personal data until the
            withdrawal is finalized.
          </Typography>

          <Box my={4}>
            <Typography variant="h5" gutterBottom>
              If you interact with us on social media
            </Typography>

            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="h6">
                        To communicate with you on social media
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>What processing we perform</TableCell>
                    <TableCell>What personal data we process</TableCell>
                    <TableCell>Our lawful basis for the processing</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <List>
                        <ListItem>
                          <ListItemText primary="To communicate with you on our social media account (Facebook), e.g. if you communicates with us on our page" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell>
                      <List>
                        <ListItem>
                          <ListItemText primary="Information from your profile on the social media in question (user name and any picture you have chosen for your account)" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Information which you provide on our page" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        Legitimate interest
                      </Typography>
                      <Typography paragraph>
                        Our legitimate interest to process your personal data to
                        communicate with you on our social media platform.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body2" mt={2} mb={4}>
              Storage period: Your personal data will be removed if you ask us
              to remove it or if you yourself delete the content, but we will
              otherwise store the personal data on the social media platform
              until further notice.
            </Typography>

            <Typography variant="h5" gutterBottom>
              Other processing activities
            </Typography>

            {/* Table for "To provide customer service" */}
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="h6">
                        To provide customer service
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>What processing we perform</TableCell>
                    <TableCell>What personal data we process</TableCell>
                    <TableCell>Our lawful basis for the processing</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <List>
                        <ListItem>
                          <ListItemText primary="Answer and administer customer service matters" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell>
                      <List>
                        <ListItem>
                          <ListItemText primary="Name" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Contact information you provide in our contact" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Other information you provide regarding the matter, e.g. a problem with a function" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        Legitimate interest
                      </Typography>
                      <Typography paragraph>
                        Our legitimate interest to process your personal data to
                        answer and administer customer service matters.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body2" mt={2} mb={4}>
              Storage period: We will store your personal data until the account
              is removed.
            </Typography>

            {/* Table for "To improve our services" */}
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="h6">
                        To improve our services
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>What processing we perform</TableCell>
                    <TableCell>What personal data we process</TableCell>
                    <TableCell>Our lawful basis for the processing</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <List>
                        <ListItem>
                          <ListItemText primary="To improve our services and website's functions based on your feedback" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        Information you provide to us, e.g.:
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemText primary="Name" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Contact details (e-mail)" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Other information you provide to us when sending us feedback" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        Legitimate interest
                      </Typography>
                      <Typography paragraph>
                        Our legitimate interest to process your personal data to
                        handle your feedback and improve our services.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body2" mt={2} mb={4}>
              Storage period: We will store your personal data until account is
              removed
            </Typography>

            {/* Table for "To handle any claims and rights" */}
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="h6">
                        To handle any claims and rights
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>What processing we perform</TableCell>
                    <TableCell>What personal data we process</TableCell>
                    <TableCell>Our lawful basis for the processing</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <List>
                        <ListItem>
                          <ListItemText primary="Handle any consumer rights such as your right to make complaints" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Defend ourselves against claims and complaints" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Initiate any claims" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell>
                      <List>
                        <ListItem>
                          <ListItemText primary="Name" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Contact details you have chosen to use, e.g. email address and/or phone number" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Information from our communication with you in relation to the claim, e.g. information about the relevant booking or information about your stay" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        Legal obligation
                      </Typography>
                      <Typography paragraph>
                        The processing is necessary to comply with legal
                        obligations to which we are subject, i.e. comply with a
                        legal obligation that we are subject to.
                      </Typography>
                      <Typography variant="subtitle2">
                        Legitimate interest
                      </Typography>
                      <Typography paragraph>
                        Our legitimate interest to process your personal data to
                        defend ourselves against a possible legal claim and to
                        initiate any claim.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body2" mt={2} mb={4}>
              Storage period: We will store your personal data until we have
              processed the complaint, until we have handled the right or for
              the duration of the dispute.
            </Typography>

            {/* Table for "To comply with bookkeeping and accounting legislation" */}
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3}>
                      <Typography variant="h6">
                        To comply with bookkeeping and accounting legislation
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>What processing we perform</TableCell>
                    <TableCell>What personal data we process</TableCell>
                    <TableCell>Our lawful basis for the processing</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <List>
                        <ListItem>
                          <ListItemText primary="Store information in bookkeeping and accounting" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell>
                      <List>
                        <ListItem>
                          <ListItemText primary="Name" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="History regarding withdrawals and payments made" />
                        </ListItem>
                        <ListItem>
                          <ListItemText primary="Other information that constitutes accounting records" />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        Legal obligation
                      </Typography>
                      <Typography paragraph>
                        The processing is necessary to comply with legal
                        obligations to which we are subject, i.e. bookkeeping
                        and accounting legislation.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography variant="body2" mt={2} mb={4}>
              Storage period: We will store your personal data until and
              including the seventh year after the end of the calendar year for
              the fiscal year to which the personal data relates.
            </Typography>

            {/* ... (rest of the content remains the same) ... */}
          </Box>

          <Typography variant="h4" id="balancing-of-interests" gutterBottom>
            Balancing of interests assessments
          </Typography>

          <Typography paragraph>
            As we state above, for some purposes, we process your personal data
            based upon our "legitimate interest". By carrying out a balancing of
            interests assessment concerning our processing of your personal
            data, we have concluded that our legitimate interest for the
            processing outweighs your interests or rights which require the
            protection of your personal data.
          </Typography>

          <Typography paragraph>
            If you want more information in relation to our balancing of
            interests assessments, please do not hesitate to contact us. Our
            contact details can be found in the beginning of this privacy
            policy.
          </Typography>

          <Typography variant="body2" align="center" mt={4}>
            This privacy policy was established by Flow Group AB on 2021-08-18.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default TermsPage;
