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
  title: {
    default: 'EU American University | Globally Recognized Education',
    template: '%s | EU American University',
  },
  description: 'EU American University (EUAU) is a premier international institution offering globally accredited degree programs including MBA, BBA, MSW, BPA, and Honorary Doctorates. Join our worldwide network of leaders and advance your career today.',
  keywords: [
    'EU American University',
    'EUAU',
    'online degree programs',
    'MBA online',
    'Honorary Doctorate',
    'Professional Certifications',
    'BBA degree',
    'BPA degree',
    'MSW online',
    'European university',
    'American university',
    'Business Administration',
    'Public Administration',
    'Social Work',
    'International University',
    'Online MBA',
    'globally accredited university',
    'higher education',
    'distance learning',
  ],
  authors: [{ name: 'EU American University', url: 'https://euamericanuniversity.us' }],
  creator: 'EU American University',
  publisher: 'EU American University',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://euamericanuniversity.us'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'EU American University',
    title: 'EU American University | Globally Recognized Education',
    description: 'Empowering global leaders with accredited degree programs in Business, Public Administration, Social Work, and more. Apply today.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EU American University - The New Generation of Global Education',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EU American University | Globally Recognized Education',
    description: 'Empowering global leaders with accredited degree programs in Business, Public Administration, Social Work, and more. Apply today.',
    images: ['/og-image.png'],
    creator: '@EUAU', 
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'education',
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
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://euamericanuniversity.us',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://euamericanuniversity.us'}/logo.png`,
              image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://euamericanuniversity.us'}/og-image.png`,
              description: 'EU American University (EUAU) is a premier international institution offering globally accredited degree programs including MBA, BBA, MSW, BPA, and Honorary Doctorates.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '11 rue Magdebourg',
                addressLocality: 'Paris',
                addressCountry: 'France',
                postalCode: '75016',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-505-520-3303',
                contactType: 'Admissions and Student Support',
                areaServed: 'Worldwide',
                availableLanguage: ['English'],
                url: 'https://euamericanuniversity.us',
                email: 'info@euamericanuniversity.us',
              },
              sameAs: [
                'https://eu-uni-demo.vercel.app',
                'https://www.linkedin.com/school/eu-american-university/',
                'https://www.facebook.com/euamericanuniversity/',
                'https://twitter.com/EUAU'
              ],
              offers: {
                '@type': 'Offer',
                category: 'Educational Programs',
                description: 'Undergraduate, Graduate, and Doctoral degree programs.',
              }
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
