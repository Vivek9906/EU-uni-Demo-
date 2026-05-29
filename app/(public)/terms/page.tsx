import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Use', description: 'EU American University Terms of Use governing access to the website and services.' };

export default function TermsPage() {
  return (
    <section className="section-padding">
      <div className="container-main max-w-3xl">
        <h1 className="text-4xl font-heading font-bold mb-8">Terms of Use</h1>
        <div className="prose prose-lg text-foreground-secondary space-y-6 text-sm leading-relaxed">
          <p className="text-foreground-muted text-xs">Last updated: January 1, 2025</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">1. Acceptance of Terms</h2>
          <p>By accessing and using the EU American University (&quot;EUAU&quot;) website, you agree to be bound by these Terms of Use. If you do not agree, please discontinue use of this website.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">2. Use of Website</h2>
          <p>You may use this website for lawful purposes only. You agree not to: attempt to gain unauthorized access to any part of the website; use automated tools to scrape or extract data; submit false or misleading information in any form; or engage in any activity that may harm the website or its users.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">3. Application Accuracy</h2>
          <p>By submitting an application to EUAU, you certify that all information provided is accurate and complete. EUAU reserves the right to revoke any offer of admission or issued certificate if information is found to be fraudulent or materially inaccurate.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">4. Intellectual Property</h2>
          <p>All content on this website — including text, graphics, logos, and design — is the property of EUAU and is protected by international copyright and trademark laws. Unauthorized reproduction is prohibited.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">5. Certificate Verification</h2>
          <p>EUAU provides an online certificate verification service. The program name displayed on the certificate is exactly as submitted during the application process. EUAU is not responsible for errors caused by applicant input.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">6. Limitation of Liability</h2>
          <p>EUAU provides this website on an &quot;as is&quot; basis. We do not warrant that the website will be error-free or uninterrupted. EUAU shall not be liable for any indirect, incidental, or consequential damages arising from use of the website.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">7. Governing Law</h2>
          <p>These terms are governed by the laws of France. Any disputes shall be subject to the exclusive jurisdiction of the courts of Paris.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">8. Contact</h2>
          <p>For legal inquiries, contact us at:<br />Email: legal@euamericanuniversity.us<br />Address: 11 rue Magdebourg, Paris, France 75016</p>
        </div>
      </div>
    </section>
  );
}
