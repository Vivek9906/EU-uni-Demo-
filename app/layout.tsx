import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EU American University',
  description: 'A leader\'s choice in education',
  keywords: [
    'EU American University',
    'EUAU',
    'MBA online',
    'Honorary Doctorate',
    'Professional Certifications',
    'BPA degree',
    'MSW online',
    'European university',
    'Business Administration',
    'Public Administration',
    'Social Work',
    'International University',
    'Online MBA',
  ],
  authors: [{ name: 'EU American University' }],
  creator: 'EU American University',
  publisher: 'EU American University',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'EU American University',
    title: 'EU American University',
    description: 'A leader\'s choice in education',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EU American University',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EU American University',
    description: 'A leader\'s choice in education',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${openSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'EU American University',
              alternateName: 'EUAU',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
              description:
                'EU American University offers globally recognized programs in Business Administration, Public Administration, Social Work, Honorary Doctorate, and Professional Certifications.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '11 rue Magdebourg',
                addressLocality: 'Paris',
                addressCountry: 'France',
                postalCode: '75016',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+33-1-89-37-00-04',
                contactType: 'admissions',
                email: 'info@euamericanuniversity.us',
              },
              sameAs: [
                'https://eu-uni-demo.vercel.app',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
