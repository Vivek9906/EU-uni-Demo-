import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SubscriptionPopup } from '@/components/ui/SubscriptionPopup';
import { MaintenanceBanner } from '@/components/layout/MaintenanceBanner';

export const dynamic = 'force-dynamic';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MaintenanceBanner />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <SubscriptionPopup />
    </>
  );
}
