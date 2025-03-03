
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface VerificationEmailProps {
  email: string;
  verificationUrl: string;
}

export const VerificationEmail = ({
  email,
  verificationUrl,
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address for StaffMD</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Welcome to StaffMD!</Heading>
        <Text style={text}>
          Please verify your email address ({email}) by clicking the button below:
        </Text>
        <Link
          href={verificationUrl}
          target="_blank"
          style={{
            ...button,
            display: 'inline-block',
            marginBottom: '16px',
          }}
        >
          Verify Email Address
        </Link>
        <Text style={{ ...text, marginBottom: '14px' }}>
          If you didn't create an account with StaffMD, you can safely ignore this email.
        </Text>
        <Text style={footer}>
          &copy; {new Date().getFullYear()} StaffMD. All rights reserved.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default VerificationEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#2563eb',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '12px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
}

const footer = {
  color: '#898989',
  fontSize: '12px',
  lineHeight: '22px',
  marginTop: '24px',
  textAlign: 'center' as const,
}
