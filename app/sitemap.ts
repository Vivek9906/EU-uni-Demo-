import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amu.edu.eu';

  const staticPages = [
    '',
    '/about',
    '/academics',
    '/academics/bachelors',
    '/academics/masters',
    '/academics/phd',
    '/admissions',
    '/admissions/apply',
    '/admissions/requirements',
    '/admissions/scholarships',
    '/admissions/financial-aid',
    '/accreditation',
    '/alumni',
    '/campus-life',
    '/contact',
    '/events',
    '/faq',
    '/faculty',
    '/gallery',
    '/honorary-doctorate',
    '/news',
    '/notices',
    '/placements',
    '/research',
    '/testimonials',
    '/verify-certificate',
    '/privacy',
    '/terms',
  ];

  return staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path.startsWith('/academics') ? 0.9 : 0.7,
  }));
}
