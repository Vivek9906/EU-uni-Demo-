export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Refund Policy for EU American University',
};

export default async function RefundPolicyPage() {
  const legalPage = await prisma.legalPage.findUnique({
    where: { slug: 'refund-policy' },
  });

  return (
    <section className="section-padding bg-background-subtle min-h-[80vh]">
      <div className="container-main max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">
            {legalPage?.title || 'Refund Policy'}
          </h1>
          
          <div className="prose prose-blue max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground-secondary">
            {legalPage && legalPage.content !== 'This is managed via the admin CMS. Content is rendered from the /refund-policy page component.' ? (
              <div dangerouslySetInnerHTML={{ __html: legalPage.content }} />
            ) : (
              <>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                
                <h2>1. General Refund Guidelines</h2>
                <p>EU American University is committed to fair and transparent financial policies. Refunds are processed according to the timeline and conditions outlined below. All refund requests must be submitted in writing to the Finance Office.</p>
                
                <h2>2. Application and Registration Fees</h2>
                <p>Application fees and initial registration fees are non-refundable under any circumstances, as they cover the administrative costs of processing applications and establishing student records.</p>
                
                <h2>3. Tuition Refund Schedule</h2>
                <p>For students who withdraw from a program, tuition refunds are calculated based on the following schedule:</p>
                <ul>
                  <li><strong>Within 14 days of enrollment (and before accessing course materials):</strong> 100% refund of tuition paid.</li>
                  <li><strong>Within 30 days of enrollment:</strong> 50% refund of tuition paid.</li>
                  <li><strong>After 30 days of enrollment:</strong> No refund available.</li>
                </ul>
                
                <h2>4. Processing Time</h2>
                <p>Approved refunds are typically processed within 30 business days and are returned via the original method of payment.</p>
                
                <h2>5. Contact</h2>
                <p>For questions regarding refunds, please contact <a href="mailto:finance@euamericanuniversity.edu">finance@euamericanuniversity.edu</a>.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
