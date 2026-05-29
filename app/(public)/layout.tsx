import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SubscriptionPopup } from '@/components/ui/SubscriptionPopup';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <SubscriptionPopup />
    </>
  );
}
