import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { prisma } from '@/lib/db'

export const metadata: Metadata = {
  title: 'Our Partners',
  description:
    'EU American University collaborates with leading educational institutions and organizations across 4 continents, bringing world-class education closer to learners everywhere.',
};

export const dynamic = 'force-dynamic';

const getPartners = async () => {
  return prisma.partner.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });
};

const STATS = [
  { value: '15+', label: 'Global Partners' },
  { value: '4', label: 'Continents' },
  { value: '10+', label: 'Countries' },
];

export default async function OurPartnersPage() {
  const partnersData = await getPartners()

  // Group partners by region
  const regionsObj: Record<string, typeof partnersData> = {}
  partnersData.forEach(p => {
    if (!regionsObj[p.region]) regionsObj[p.region] = []
    regionsObj[p.region].push(p)
  })

  const partnerRegions = Object.entries(regionsObj).map(([region, partners]) => ({ region, partners }))

  return (
    <>
      <PageHero
        label="GLOBAL NETWORK"
        title="Our Global Partner Network"
        description="EU American University collaborates with leading educational institutions and organizations across 4 continents, bringing world-class education closer to learners everywhere."
      />

      <section className="section-padding bg-background-subtle">
        <div className="container-main">
          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-background-card rounded-card border border-border p-6 text-center"
              >
                <div
                  className="text-[32px] font-extrabold mb-1.5"
                  style={{ color: '#E09900' }}
                >
                  {s.value}
                </div>
                <div className="text-[13px] text-foreground-secondary font-semibold">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Partner regions */}
          {partnerRegions.map((region) => (
            <div key={region.region} className="mb-12">
              <h2
                className="font-heading text-[17px] font-extrabold mb-5 pb-2.5 inline-block"
                style={{
                  color: '#1B3A6B',
                  borderBottom: '2px solid #E09900',
                }}
              >
                {region.region}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {region.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="bg-background-card rounded-[10px] border border-border p-5 shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-[3px]"
                    style={{ borderLeft: '4px solid #1B3A6B' }}
                  >
                    <p className="font-extrabold text-sm text-foreground mb-1.5">
                      {partner.name}
                    </p>
                    <p className="text-[13px] text-foreground-secondary flex items-center gap-1.5">
                      📍 {partner.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-foreground-secondary text-base mb-5">
              Interested in joining our global partner network?
            </p>
            <Link
              href="/partner-with-us"
              className="btn-primary inline-block"
            >
              Partner With Us →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
