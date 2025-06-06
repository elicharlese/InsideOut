import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | InsideOut",
  description: "Learn about how InsideOut uses cookies and similar technologies",
}

export default function CookiePolicyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Cookie Policy</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>Last Updated: March 17, 2025</p>

        <h2>1. Introduction</h2>
        <p>
          This Cookie Policy explains how InsideOut uses cookies and similar technologies to recognize you when you
          visit our website. It explains what these technologies are and why we use them, as well as your rights to
          control our use of them.
        </p>

        <h2>2. What are Cookies?</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. They
          are widely used to make websites work, or work more efficiently, as well as to provide information to the
          owners of the site.
        </p>

        <h2>3. How We Use Cookies</h2>
        <p>We use cookies for various purposes, including:</p>
        <ul>
          <li>To enable certain functions of our platform</li>
          <li>To provide analytics</li>
          <li>To store your preferences</li>
          <li>To enable advertisement delivery, including behavioral advertising</li>
        </ul>

        <h2>4. Types of Cookies We Use</h2>
        <p>We use the following types of cookies:</p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> These cookies are necessary for our website to function properly. They
            enable you to navigate our website and use its features.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> These cookies allow us to analyze how users interact with our website,
            so we can improve its performance and design.
          </li>
          <li>
            <strong>Preference Cookies:</strong> These cookies allow our website to remember your preferences, such as
            language or region.
          </li>
          <li>
            <strong>Advertising Cookies:</strong> These cookies are used to deliver advertisements that are relevant to
            you and your interests.
          </li>
        </ul>

        <h2>5. Third-Party Cookies</h2>
        <p>
          In addition to our own cookies, we may also use third-party cookies to report usage statistics of the Service,
          deliver advertisements on and through the Service, and so on.
        </p>

        <h2>6. Your Choices</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by
          adjusting the settings in your web browser.
        </p>
        <p>
          Please note that if you choose to reject cookies, you may not be able to use certain features of our website.
        </p>

        <h2>7. More Information</h2>
        <p>
          To find out more about cookies, including how to see what cookies have been set and how to manage and delete
          them, visit allaboutcookies.org.
        </p>

        <h2>8. Changes to This Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie
          Policy on this page and updating the "Last Updated" date. You are advised to review this Cookie Policy
          periodically for any changes.
        </p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions or concerns about our use of cookies, please contact us at:</p>
        <p>
          Email: privacy@insideout.example
          <br />
          Address: 123 Inclusive Street, San Francisco, CA 94103, United States
        </p>
      </div>
    </div>
  )
}

