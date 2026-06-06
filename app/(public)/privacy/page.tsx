export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for EU American University',
};

export default async function PrivacyPage() {
  // Try to fetch from DB first
  const legalPage = await prisma.legalPage.findUnique({
    where: { slug: 'privacy' },
  });

  return (
    <section className="section-padding bg-background-subtle min-h-[80vh]">
      <div className="container-main max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">
            {legalPage?.title || 'Privacy Policy'}
          </h1>
          
          <div className="prose prose-blue max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground-secondary">
            {legalPage && legalPage.content !== 'This is managed via the admin CMS. Content is rendered from the /privacy page component.' ? (
              <div dangerouslySetInnerHTML={{ __html: legalPage.content }} />
            ) : (
              // Hardcoded fallback per spec
              <>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                
                <h2>1. Information We Collect</h2>
                <p>EU American University collects information you provide directly to us, including when you apply for admission, register for courses, create an account, or contact us. This may include:</p>
                <ul>
                  <li>Personal details (name, date of birth, nationality)</li>
                  <li>Contact information (email, phone, address)</li>
                  <li>Academic and professional history</li>
                  <li>Financial information for payment processing</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process admissions applications and enrollment</li>
                  <li>Deliver educational programs and services</li>
                  <li>Communicate important administrative updates</li>
                  <li>Comply with legal and accreditation requirements</li>
                </ul>

                <h2>3. Information Sharing</h2>
                <p>We do not sell your personal information. We may share your information with:</p>
                <ul>
                  <li>Service providers acting on our behalf (e.g., payment processors, learning management systems)</li>
                  <li>Accreditation bodies and regulatory authorities as required</li>
                  <li>Other institutions for credit transfer (only with your explicit consent)</li>
                </ul>

                <h2>4. Data Security</h2>
                <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
                
                <h2>5. Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us at: <a href="mailto:info@euamericanuniversity.us">info@euamericanuniversity.us</a></p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
