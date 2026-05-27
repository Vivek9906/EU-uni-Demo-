import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'American Management University — A Leader\'s Choice in Education',
    template: '%s | American Management University',
  },
  description:
    'American Management University — A prestigious international institution offering MBA, Honorary Doctorate, and Professorship programs. Shaping global leaders since 1924.',
  keywords: [
    'American Management University',
    'AMU',
    'MBA',
    'Honorary Doctorate',
    'Professorship',
    'Business Administration',
    'International University',
    'Online MBA',
    'European University',
  ],
  authors: [{ name: 'American Management University' }],
  creator: 'American Management University',
  publisher: 'American Management University',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'American Management University',
    title: 'American Management University — A Leader\'s Choice in Education',
    description:
      'A prestigious international institution offering MBA, Honorary Doctorate, and Professorship programs. Shaping global leaders since 1924.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'American Management University Campus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'American Management University',
    description:
      'A prestigious international institution offering MBA, Honorary Doctorate, and Professorship programs.',
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
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'American Management University',
              alternateName: 'AMU',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/logo.png`,
              description:
                'A prestigious international institution offering MBA, Honorary Doctorate, and Professorship programs.',
              foundingDate: '1924',
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
                email: 'info@amu.edu.eu',
              },
              sameAs: [
                'https://facebook.com/amuuniversity',
                'https://twitter.com/amuuniversity',
                'https://linkedin.com/school/amuuniversity',
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
