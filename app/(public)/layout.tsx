import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SubscriptionPopup } from '@/components/ui/SubscriptionPopup';
import { MaintenanceBanner } from '@/components/layout/MaintenanceBanner';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch programs for dynamic Navbar routing
  const dbPrograms = await prisma.program.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' }
  });
  console.log("Layout fetched dbPrograms count:", dbPrograms.length);

  // Build the dynamic programs menu
  const programsMenu = [
    {
      label: 'PhD Programs',
      href: '/academics/phd',
      children: dbPrograms
        .filter(p => p.level === 'phd')
        .map(p => ({ label: p.title, href: `/academics/phd/${p.slug}` })),
    },
    {
      label: 'Honorary Programs',
      href: '/academics/honorary',
      children: dbPrograms
        .filter(p => p.level === 'honorary')
        .map(p => ({ label: p.title, href: `/academics/honorary/${p.slug}` })),
    },
    {
      label: "Master's Programs",
      href: '/academics/masters',
      children: dbPrograms
        .filter(p => p.level === 'masters')
        .map(p => ({ label: p.title, href: `/academics/masters/${p.slug}` })),
    },
    {
      label: "Bachelor's Programs",
      href: '/academics/bachelors',
      children: dbPrograms
        .filter(p => p.level === 'bachelors')
        .map(p => ({ label: p.title, href: `/academics/bachelors/${p.slug}` })),
    },
    {
      label: 'Certifications',
      href: '/certifications',
      children: null,
    },
    {
      label: 'Student Records & Verification',
      href: '/student-verification',
      children: null,
    },
    {
      label: 'View All Programs →',
      href: '/academics',
      children: null,
      highlight: true,
    },
  ];

  return (
    <>
      <MaintenanceBanner />
      <Navbar programsMenu={programsMenu} />
      <main id="main-content">{children}</main>
      <Footer />
      <SubscriptionPopup />
    </>
  );
}
