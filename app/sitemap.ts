import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.euamericanuniversity.us';

  const staticPages = [
    '',
    '/about',
    '/academics',
    '/academics/bachelors',
    '/academics/bachelors/bba',
    '/academics/bachelors/bpa',
    '/academics/bachelors/bsw',
    '/academics/masters',
    '/academics/masters/mba',
    '/academics/masters/mpa',
    '/academics/masters/msw',
    '/academics/honorary',
    '/admissions',
    '/admissions/apply',
    '/admissions/requirements',
    '/admissions/scholarships',
    '/accreditation',
    '/alumni',
    '/campus-life',
    '/certifications',
    '/contact',
    '/events',
    '/faq',
    '/gallery',
    '/honorary-doctorate',
    '/news',
    '/notices',
    '/placements',
    '/research',
    '/student-verification',
    '/testimonials',
    '/verify-certificate',
    '/privacy',
    '/terms',
    '/refund-policy',
    '/cookie-policy',
  ];

  return staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path.startsWith('/academics') ? 0.9 : path === '/certifications' ? 0.85 : 0.7,
  }));
}
