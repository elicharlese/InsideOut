import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | InsideOut",
  description: "Learn how InsideOut collects, uses, and protects your personal information",
}

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>Last Updated: March 17, 2025</p>

        <h2>1. Introduction</h2>
        <p>
          At InsideOut, we respect your privacy and are committed to protecting your personal information. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or
          use our services.
        </p>
        <p>
          Please read this Privacy Policy carefully. By accessing or using our platform, you acknowledge that you have
          read, understood, and agree to be bound by all the terms of this Privacy Policy.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect several types of information from and about users of our platform, including:</p>
        <h3>2.1 Personal Information</h3>
        <p>
          Personal information is information that identifies you as an individual. We may collect the following
          personal information:
        </p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Postal address</li>
          <li>Phone number</li>
          <li>Date of birth</li>
          <li>Payment information</li>
          <li>Account credentials</li>
        </ul>

        <h3>2.2 Non-Personal Information</h3>
        <p>We may also collect non-personal information about you, including:</p>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>IP address</li>
          <li>Device information</li>
          <li>Usage data</li>
          <li>Cookies and similar technologies</li>
        </ul>

        <h2>3. How We Collect Information</h2>
        <p>We collect information in several ways:</p>
        <ul>
          <li>
            Directly from you when you provide it to us (e.g., when you register for an account, make a purchase, or
            contact us)
          </li>
          <li>Automatically as you navigate through our platform (e.g., through cookies and similar technologies)</li>
          <li>From third parties, such as our business partners and service providers</li>
        </ul>

        <h2>4. How We Use Your Information</h2>
        <p>We may use the information we collect for various purposes, including:</p>
        <ul>
          <li>Providing and maintaining our platform</li>
          <li>Processing and fulfilling your orders</li>
          <li>Managing your account</li>
          <li>Sending you order confirmations and updates</li>
          <li>Responding to your inquiries and requests</li>
          <li>Sending you marketing communications (with your consent)</li>
          <li>Improving our platform and services</li>
          <li>Conducting research and analysis</li>
          <li>Protecting our rights and preventing fraud</li>
          <li>Complying with legal obligations</li>
        </ul>

        <h2>5. How We Share Your Information</h2>
        <p>We may share your information with:</p>
        <ul>
          <li>Service providers who perform services on our behalf</li>
          <li>Business partners with whom we jointly offer products or services</li>
          <li>Affiliates and subsidiaries</li>
          <li>Third parties in connection with a business transaction (e.g., merger, acquisition, or sale)</li>
          <li>Law enforcement or other governmental authorities as required by law or to protect our rights</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>

        <h2>6. Your Choices</h2>
        <p>You have certain choices regarding how we use and share your information:</p>
        <ul>
          <li>You can update or correct your account information at any time</li>
          <li>You can opt out of receiving marketing communications from us</li>
          <li>You can choose whether to allow cookies through your browser settings</li>
          <li>You can request access to, correction of, or deletion of your personal information</li>
        </ul>

        <h2>7. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information from
          unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the
          Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>8. Children's Privacy</h2>
        <p>
          Our platform is not intended for children under the age of 13, and we do not knowingly collect personal
          information from children under 13. If we learn that we have collected personal information from a child under
          13, we will promptly delete that information.
        </p>

        <h2>9. International Data Transfers</h2>
        <p>
          Your information may be transferred to, and maintained on, computers located outside of your state, province,
          country, or other governmental jurisdiction where the data protection laws may differ from those in your
          jurisdiction. If you are located outside the United States and choose to provide information to us, please
          note that we transfer the information to the United States and process it there.
        </p>

        <h2>10. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
          Policy periodically for any changes.
        </p>

        <h2>11. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
        <p>
          Email: privacy@insideout.example
          <br />
          Address: 123 Inclusive Street, San Francisco, CA 94103, United States
        </p>
      </div>
    </div>
  )
}

