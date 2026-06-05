import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accreditations & Recognitions',
  description:
    'EU American University is recognized and accredited by leading international quality assurance organizations, affirming our commitment to academic excellence worldwide.',
};

export default function AccreditationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
