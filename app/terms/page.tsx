"use client";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">

          <p>
            Welcome to <strong>MagicSlide – AI Email Filtration Tool</strong>.  
            By using this application, you agree to the Terms of Service stated below.
            Please read them carefully before using the platform.
          </p>

          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using MagicSlide, you confirm that you accept these Terms
            and agree to comply with them. If you do not agree, please stop using the service.
          </p>

          <h2 className="text-xl font-semibold">2. Use of the Service</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>You may use the app only for lawful purposes.</li>
            <li>You agree not to upload harmful, illegal, or offensive content.</li>
            <li>You agree not to attempt to hack, disrupt, or misuse the platform.</li>
          </ul>

          <h2 className="text-xl font-semibold">3. AI-Generated Output</h2>
          <p>
            MagicSlide uses AI (Gemini API) to analyze and categorize emails.
            While we aim for high accuracy, AI outputs may contain errors.
            Users should verify the results before taking any important action.
          </p>

          <h2 className="text-xl font-semibold">4. Accounts & Authentication</h2>
          <p>
            When logging in with Google OAuth, you are responsible for maintaining 
            the confidentiality of your account. Any actions taken under your 
            account are your responsibility.
          </p>

          <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
          <p>
            MagicSlide is not liable for:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Loss of data</li>
            <li>Incorrect or misleading AI output</li>
            <li>Service downtime or interruptions</li>
            <li>Errors caused by third-party APIs or services</li>
          </ul>
          <p>
            You use the service at your own risk.
          </p>

          <h2 className="text-xl font-semibold">6. Modifications to the Service</h2>
          <p>
            We may update, change, or discontinue parts of the service at any time.
            Continued use after updates means you accept the new terms.
          </p>

          <h2 className="text-xl font-semibold">7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate access if a user violates 
            these Terms or misuses the platform.
          </p>

          <h2 className="text-xl font-semibold">8. Governing Law</h2>
          <p>
            These terms are governed by and interpreted in accordance with the 
            laws of India. Any disputes will be handled under Indian jurisdiction.
          </p>

          <h2 className="text-xl font-semibold">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, contact us at:  
            <span className="font-semibold"> support@magicslide.com </span>
          </p>

        </div>
      </div>
    </div>
  );
}
