import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SubscriptionPopup } from '@/components/ui/SubscriptionPopup';
import { MaintenanceBanner } from '@/components/layout/MaintenanceBanner';
import { PROGRAMS } from '@/lib/programs';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Build the dynamic programs menu from static data (no database query)
  const programsMenu = [
    {
      label: 'PhD Programs',
      href: '/academics/phd',
      children: PROGRAMS.phd.map(p => ({ label: p.title, href: `/academics/phd/${p.slug}` })),
    },
    {
      label: 'Honorary Programs',
      href: '/academics/honorary',
      children: PROGRAMS.honorary.map(p => ({ label: p.title, href: `/academics/honorary/${p.slug}` })),
    },
    {
      label: "Master's Programs",
      href: '/academics/masters',
      children: PROGRAMS.masters.map(p => ({ label: p.title, href: `/academics/masters/${p.slug}` })),
    },
    {
      label: "Bachelor's Programs",
      href: '/academics/bachelors',
      children: PROGRAMS.bachelors.map(p => ({ label: p.title, href: `/academics/bachelors/${p.slug}` })),
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
      <main id="main-content" className="pt-16 lg:pt-20">{children}</main>
      <Footer />
      <SubscriptionPopup />
    </>
  );
}
