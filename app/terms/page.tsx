import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | InsideOut",
  description: "Read the terms and conditions for using InsideOut's platform and services",
}

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>Last Updated: March 17, 2025</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to InsideOut. These Terms of Service ("Terms") govern your use of our website, products, and services.
          By accessing or using InsideOut, you agree to be bound by these Terms. If you do not agree to these Terms,
          please do not use our platform.
        </p>

        <h2>2. Definitions</h2>
        <p>
          "InsideOut," "we," "us," and "our" refer to InsideOut and its subsidiaries and affiliates. "Platform" refers
          to our website, mobile applications, and other online services. "User," "you," and "your" refer to individuals
          who use our Platform. "Content" refers to all text, images, videos, and other materials available on our
          Platform. "Products" refers to physical goods available for purchase on our Platform. "Services" refers to
          services offered through our Platform, including but not limited to therapy, healthcare, and legal support.
        </p>

        <h2>3. Account Registration</h2>
        <p>
          To access certain features of our Platform, you may need to create an account. You are responsible for
          maintaining the confidentiality of your account credentials and for all activities that occur under your
          account. You agree to provide accurate and complete information when creating your account and to update your
          information as necessary.
        </p>

        <h2>4. User Conduct</h2>
        <p>You agree to use our Platform in compliance with all applicable laws and regulations. You agree not to:</p>
        <ul>
          <li>Use our Platform for any illegal purpose</li>
          <li>Violate the rights of others, including intellectual property rights</li>
          <li>Harass, abuse, or harm another person</li>
          <li>Impersonate another person or entity</li>
          <li>Interfere with the operation of our Platform</li>
          <li>Attempt to gain unauthorized access to our Platform or systems</li>
        </ul>

        <h2>5. Products and Services</h2>
        <p>
          We strive to provide accurate descriptions of our Products and Services. However, we do not warrant that
          Product descriptions or other Content on our Platform are accurate, complete, reliable, current, or
          error-free.
        </p>
        <p>
          Prices for our Products and Services are subject to change without notice. We reserve the right to discontinue
          any Product or Service at any time.
        </p>

        <h2>6. Purchases and Payments</h2>
        <p>
          When you make a purchase through our Platform, you agree to provide accurate and complete payment information.
          You authorize us to charge your payment method for the total amount of your purchase, including any applicable
          taxes and fees.
        </p>
        <p>
          All sales are final, except as specified in our Return Policy. We reserve the right to refuse or cancel any
          order for any reason, including but not limited to product or service availability, errors in product or
          service descriptions or prices, or suspected fraud.
        </p>

        <h2>7. Intellectual Property</h2>
        <p>
          All Content on our Platform, including but not limited to text, graphics, logos, images, and software, is the
          property of InsideOut or its licensors and is protected by copyright, trademark, and other intellectual
          property laws.
        </p>
        <p>
          You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
          republish, download, store, or transmit any Content on our Platform without our express written consent.
        </p>

        <h2>8. Privacy</h2>
        <p>
          Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and
          disclose information about you.
        </p>

        <h2>9. Disclaimer of Warranties</h2>
        <p>
          OUR PLATFORM, PRODUCTS, AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY
          KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          IN NO EVENT SHALL INSIDEOUT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
          DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR IN CONNECTION WITH OUR
          PLATFORM, PRODUCTS, OR SERVICES, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE,
          EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>

        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify, defend, and hold harmless InsideOut and its officers, directors, employees, agents,
          and affiliates from and against any and all claims, liabilities, damages, losses, costs, expenses, or fees
          (including reasonable attorneys' fees) arising from or relating to your use of our Platform or violation of
          these Terms.
        </p>

        <h2>12. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting
          the updated Terms on our Platform and updating the "Last Updated" date. Your continued use of our Platform
          after such changes constitutes your acceptance of the updated Terms.
        </p>

        <h2>13. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of California, without
          giving effect to any principles of conflicts of law.
        </p>

        <h2>14. Contact Information</h2>
        <p>If you have any questions or concerns about these Terms, please contact us at legal@insideout.example.</p>
      </div>
    </div>
  )
}

