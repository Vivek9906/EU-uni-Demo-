import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Global Partners | EU American University',
  description:
    'Join our growing network of 75+ partner institutions across 6 continents. We offer flexible partnership models with proven revenue growth and dedicated support.',
};

const PARTNERS = [
  // Asia-Pacific Region
  { region: 'Asia-Pacific Region', name: 'Elite Learning Institute', address: 'Bangkok, Thailand' },
  { region: 'Asia-Pacific Region', name: 'Pacific Education Solutions', address: 'Singapore' },
  { region: 'Asia-Pacific Region', name: 'Innovation Academy Manila', address: 'Philippines' },
  { region: 'Asia-Pacific Region', name: 'Gulf Excellence Academy', address: 'Dubai, UAE' },
  // Europe Region
  { region: 'Europe Region', name: 'Iberian Education Network', address: 'Madrid, Spain' },
  { region: 'Europe Region', name: 'Continental Education Hub', address: 'Berlin, Germany' },
  { region: 'Europe Region', name: 'Franco-European Alliance', address: 'Paris, France' },
  { region: 'Europe Region', name: 'Qualify Learn', address: 'United Kingdom' },
  // Americas Region
  { region: 'Americas Region', name: 'North American Education Alliance', address: 'Toronto, Canada' },
  { region: 'Americas Region', name: 'Pan-American Executive Institute', address: 'Mexico City, Mexico' },
  { region: 'Americas Region', name: 'South American Learning Network', address: 'São Paulo, Brazil' },
  // Africa Region
  { region: 'Africa Region', name: 'African Excellence Institute', address: 'Cape Town, South Africa' },
  { region: 'Africa Region', name: 'Continental Learning Hub', address: 'Nairobi, Kenya' },
  { region: 'Africa Region', name: 'West Africa Education Network', address: 'Accra, Ghana' },
];

const BENEFITS = [
  {
    icon: '🏆',
    title: 'Internationally Recognized',
    desc: 'Access to our accredited degree programs and professional credentials trusted worldwide.',
  },
  {
    icon: '💻',
    title: 'Flexible Delivery',
    desc: 'Choose from online, blended, and in-person delivery models to match your market needs.',
  },
  {
    icon: '📚',
    title: 'Customizable Curriculum',
    desc: "Adapt our programs to your region's requirements and student needs.",
  },
  {
    icon: '🤝',
    title: 'Dedicated Support',
    desc: 'Assigned partnership manager for implementation, marketing, and ongoing support.',
  },
  {
    icon: '📈',
    title: 'Revenue Growth',
    desc: 'Competitive revenue sharing models (30-40%) with proven ROI for partners.',
  },
  {
    icon: '🌍',
    title: 'Global Network',
    desc: 'Access to our international partner ecosystem and student recruitment network.',
  },
];

export default function GlobalPartnersPage() {
  const regionsObj: Record<string, typeof PARTNERS> = {};
  PARTNERS.forEach((p) => {
    if (!regionsObj[p.region]) regionsObj[p.region] = [];
    regionsObj[p.region].push(p);
  });
  const partnerRegions = Object.entries(regionsObj).map(([region, partners]) => ({ region, partners }));

  return (
    <>
      <PageHero
        label="PARTNERING WITH EU AMERICAN UNIVERSITY"
        title="Building Global Educational Excellence Together"
        description="Join our growing network of 75+ partner institutions across 6 continents. We offer flexible partnership models with proven revenue growth and dedicated support."
      />

      {/* Why Partner With Us */}
      <section className="section-padding bg-background-subtle">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mb-4">
              Why Partner With Us?
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Our Partnership Model provides comprehensive support and proven benefits for our global partners.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-background-card rounded-card border border-border p-6 shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-[3px]"
                style={{ borderTop: '4px solid #E09900' }}
              >
                <div className="text-[28px] mb-3">{b.icon}</div>
                <h3 className="font-heading font-extrabold text-[16px] text-foreground mb-2">
                  ✓ {b.title}
                </h3>
                <p className="text-foreground-secondary text-[14px] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Our Global Partner Network */}
      <section className="section-padding bg-background-subtle">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mb-4">
              Our Global Partner Network
            </h2>
          </div>

          {partnerRegions.map((region) => (
            <div key={region.region} className="mb-12">
              <h2
                className="font-heading text-[19px] font-extrabold mb-6 pb-2.5 inline-block"
                style={{
                  color: '#1B3A6B',
                  borderBottom: '2px solid #E09900',
                }}
              >
                {region.region}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {region.partners.map((partner) => (
                  <div
                    key={partner.name}
                    className="bg-background-card rounded-[10px] border border-border p-5 shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-[3px]"
                    style={{ borderLeft: '4px solid #1B3A6B' }}
                  >
                    <p className="font-extrabold text-[15px] text-foreground mb-2">
                      {partner.name}
                    </p>
                    <p className="text-[13.5px] text-foreground-secondary flex items-start gap-1.5">
                      <span className="mt-0.5">📍</span> {partner.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Start Your Partnership Journey */}
      <section className="section-padding bg-background-subtle">
        <div className="container-main">
          <div className="bg-[#1B3A6B] text-white rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto border border-white/10 shadow-lg">
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold mb-4 text-white">
              Start Your Partnership Journey
            </h2>
            <p className="text-white/90 text-[16px] mb-10 max-w-2xl mx-auto leading-relaxed">
              Interested in partnering with EU American University? Contact our partnerships team for a personalized consultation regarding any of our partnership models.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              <div className="bg-white/10 rounded-xl p-5 md:p-6 border border-white/20 backdrop-blur-sm flex items-center gap-5 shadow-sm text-left">
                <div className="text-4xl">📧</div>
                <div>
                  <p className="text-white/70 text-sm font-medium mb-1">Email Us</p>
                  <a href="mailto:info@euamericanuniversity.us" className="text-white font-bold hover:text-[#E09900] transition-colors text-[17px] md:text-lg underline decoration-white/30 underline-offset-2">
                    info@euamericanuniversity.us
                  </a>
                  <p className="text-white/70 text-xs mt-1.5 font-medium">Response Time: 24 hours</p>
                </div>
              </div>
            </div>

            <div>
              <Link
                href="/partner-with-us#application-form"
                className="bg-[#E09900] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#c28400] transition-all inline-flex items-center gap-2 text-[16px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
              >
                Schedule a Consultation →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
