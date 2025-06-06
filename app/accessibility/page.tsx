import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Accessibility | InsideOut",
  description: "Learn about our commitment to accessibility and our efforts to make InsideOut inclusive for everyone",
}

export default function AccessibilityPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-4xl font-display font-bold mb-8">Accessibility Statement</h1>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p>Last Updated: March 17, 2025</p>

        <h2>Our Commitment</h2>
        <p>
          At InsideOut, we are committed to ensuring that our website is accessible to everyone, including individuals
          with disabilities. We strive to provide a website that is designed, developed, and maintained in accordance
          with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
        </p>

        <h2>Our Efforts</h2>
        <p>To meet our commitment to accessibility, we are continually working to improve our website by:</p>
        <ul>
          <li>Following WCAG 2.1 Level AA guidelines</li>
          <li>Using semantic HTML to structure our content</li>
          <li>Providing alternative text for all images</li>
          <li>Ensuring sufficient color contrast</li>
          <li>Making our website navigable by keyboard</li>
          <li>Providing captions and transcripts for videos</li>
          <li>Regularly testing our website for accessibility</li>
        </ul>

        <h2>Accessibility Features</h2>
        <p>We have implemented the following features to enhance accessibility:</p>
        <ul>
          <li>Skip navigation links</li>
          <li>Clear and consistent navigation</li>
          <li>Resizable text</li>
          <li>Keyboard navigation</li>
          <li>Alternative text for images</li>
          <li>Descriptive link text</li>
          <li>Proper heading structure</li>
          <li>Sufficient color contrast</li>
        </ul>

        <h2>Known Limitations</h2>
        <p>
          Despite our best efforts to ensure accessibility of our website, there may be some limitations. Please contact
          us if you observe an accessibility issue.
        </p>

        <h2>Feedback</h2>
        <p>
          We welcome your feedback on the accessibility of our website. Please let us know if you encounter any
          accessibility barriers.
        </p>

        <h2>Contact Us</h2>
        <p>If you have any questions or concerns about the accessibility of our website, please contact us at:</p>
        <p>
          Email: accessibility@insideout.example
          <br />
          Address: 123 Inclusive Street, San Francisco, CA 94103, United States
        </p>
      </div>
    </div>
  )
}

