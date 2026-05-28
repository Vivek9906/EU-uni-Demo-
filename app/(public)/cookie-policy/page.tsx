import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy for EU American University',
};

export default async function CookiePolicyPage() {
  const legalPage = await prisma.legalPage.findUnique({
    where: { slug: 'cookie-policy' },
  });

  return (
    <section className="section-padding bg-background-subtle min-h-[80vh]">
      <div className="container-main max-w-3xl">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">
            {legalPage?.title || 'Cookie Policy'}
          </h1>
          
          <div className="prose prose-blue max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-foreground-secondary">
            {legalPage && legalPage.content !== 'This is managed via the admin CMS. Content is rendered from the /cookie-policy page component.' ? (
              <div dangerouslySetInnerHTML={{ __html: legalPage.content }} />
            ) : (
              <>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                
                <h2>1. What Are Cookies</h2>
                <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.</p>
                
                <h2>2. How We Use Cookies</h2>
                <p>EU American University uses cookies to:</p>
                <ul>
                  <li>Understand and save user preferences for future visits</li>
                  <li>Compile aggregate data about site traffic and site interactions to offer better site experiences in the future</li>
                  <li>Keep track of whether you are logged in to our student portal</li>
                </ul>
                
                <h2>3. Types of Cookies We Use</h2>
                <p><strong>Essential Cookies:</strong> Required for the operation of our website, including logging into secure areas.</p>
                <p><strong>Analytical/Performance Cookies:</strong> Allow us to recognize and count the number of visitors and see how visitors move around our website.</p>
                
                <h2>4. Managing Cookies</h2>
                <p>You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings. However, if you turn cookies off, some features that make your site experience more efficient may not function properly.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
