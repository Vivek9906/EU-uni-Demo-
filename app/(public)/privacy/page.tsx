import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'AMU Privacy Policy — how we collect, use, and protect your personal data.' };

export default function PrivacyPage() {
  return (
    <section className="section-padding">
      <div className="container-main max-w-3xl">
        <h1 className="text-4xl font-heading font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-foreground-secondary space-y-6 text-sm leading-relaxed">
          <p className="text-foreground-muted text-xs">Last updated: January 1, 2025</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">1. Information We Collect</h2>
          <p>American Management University (&quot;AMU&quot;, &quot;we&quot;, &quot;us&quot;) collects personal information that you voluntarily provide when applying for programs, contacting us, or using our services. This may include your name, email address, phone number, date of birth, nationality, passport details, educational background, employment history, and statement of purpose.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">2. How We Use Your Information</h2>
          <p>We use your personal information to: process your application; communicate regarding your application status; issue certificates and academic records; respond to inquiries; send relevant academic communications; comply with legal obligations; and improve our services.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">3. Data Protection</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. All data is stored securely using encrypted databases and transmitted via TLS/SSL encryption.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">4. Data Retention</h2>
          <p>We retain personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. Academic records and certificates are retained indefinitely to support alumni verification services.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">5. Your Rights</h2>
          <p>Under applicable data protection laws (including GDPR), you have the right to access, rectify, erase, restrict processing, and port your personal data. To exercise these rights, contact our Data Protection Officer at privacy@amu.edu.eu.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">6. Cookies</h2>
          <p>Our website uses essential cookies necessary for site functionality and security. We do not use third-party tracking cookies unless you provide explicit consent.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">7. Third-Party Services</h2>
          <p>We may share limited data with third-party service providers who assist us in operating our website, processing applications, and sending communications. These providers are contractually bound to protect your data.</p>

          <h2 className="font-heading text-xl font-bold text-foreground mt-8">8. Contact</h2>
          <p>For privacy-related inquiries, please contact us at:<br />Email: privacy@amu.edu.eu<br />Address: 11 rue Magdebourg, Paris, France 75016</p>
        </div>
      </div>
    </section>
  );
}
