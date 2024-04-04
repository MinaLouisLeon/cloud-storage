import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
interface EmailTemplateProps {
  userName: string;
  downloadUrl: string;
  filename: string;
  emailFrom: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  userName,downloadUrl,filename,emailFrom
}) => (
  <Html>
    <Head />
    <Preview>File Shared by {userName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>File ({filename}) is Shared By {emailFrom} </Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <a style={link} href={downloadUrl}>
              👉 Click here to download 👈
            </a>
          </Text>
          {/* <Text style={paragraph}>
            If you didn't request this, please ignore this email.
          </Text> */}
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- Cloud Storage
        </Text>
        <Hr style={hr} />
        {/* <Img
          src={`${baseUrl}/static/raycast-logo.png`}
          width={32}
          height={32}
          style={{
            WebkitFilter: "grayscale(100%)",
            filter: "grayscale(100%)",
            margin: "20px 0",
          }}
        /> */}
        {/* <Text style={footer}>Raycast Technologies Inc.</Text>
        <Text style={footer}>
          2093 Philadelphia Pike #3222, Claymont, DE 19703
        </Text> */}
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};