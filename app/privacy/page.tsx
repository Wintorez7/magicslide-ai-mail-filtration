"use client";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6 text-gray-700 leading-relaxed">

          <p>
            Welcome to <strong>MagicSlide – AI Email Filtration Tool</strong>.
            Your privacy is important to us. This Privacy Policy explains what information
            we collect, how we use it, and how we protect it.
          </p>

          <h2 className="text-xl font-semibold">Information We Collect</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Email content you provide for filtration (processed temporarily).</li>
            <li>User inputs such as categories and filter options.</li>
            <li>Basic system logs and analytics for improving app performance.</li>
          </ul>

          <h2 className="text-xl font-semibold">How We Use Your Information</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>To analyze and categorize email content.</li>
            <li>To improve filtering accuracy and user experience.</li>
            <li>To ensure smooth app performance and security.</li>
          </ul>

          <h2 className="text-xl font-semibold">What We Do NOT Do</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>We do not permanently store your email content.</li>
            <li>We do not sell your data.</li>
            <li>We do not use your data for advertising.</li>
          </ul>

          <h2 className="text-xl font-semibold">Third-Party Services</h2>
          <p>
            MagicSlide uses trusted third-party services including:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Google OAuth</strong> for user login/authentication.</li>
            <li><strong>Supabase</strong> for backend database operations.</li>
            <li><strong>Google Gemini API</strong> to process email categorization.</li>
          </ul>

          <h2 className="text-xl font-semibold">Data Security</h2>
          <p>
            We use industry-standard security measures such as HTTPS encryption,
            secure API communication, and protected storage to safeguard all user data.
          </p>

          <h2 className="text-xl font-semibold">Your Choices</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>You may stop using the app at any time.</li>
            <li>You may request deletion of your account or stored data.</li>
          </ul>

          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p>
            For any privacy-related queries, you can reach us at:  
            <span className="font-semibold"> liordx76@gmail.com </span>
          </p>

        </div>
      </div>
    </div>
  );
}
