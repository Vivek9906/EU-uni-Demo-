import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'

export const metadata = {
  title: 'Alumni Network | EU American University',
  description: 'Join the EU American University global alumni network. Connect with thousands of graduates making an impact across 100+ countries in business, leadership, research, and public service.',
  keywords: ['EU American University alumni', 'university alumni network', 'EUAU graduates', 'honorary doctorate alumni'],
  openGraph: {
    title: 'Alumni Network | EU American University',
    description: 'Connect with thousands of EU American University graduates making an impact across the globe.',
    type: 'website',
  },
}

const ALUMNI_STATS = [
  { value: '15,000+', label: 'Global Alumni' },
  { value: '100+',    label: 'Countries Represented' },
  { value: '95%',     label: 'Employment Rate' },
  { value: '500+',    label: 'Corporate Leaders' },
]

const NOTABLE_ALUMNI = [
  { name: 'Dr. Sarah Mitchell', title: 'CEO, Global Sustainability Fund', program: 'Honorary Doctorate, 2023', country: '🇬🇧 United Kingdom' },
  { name: 'Prof. James Okoye',  title: 'Director, African Development Institute', program: 'Honorary Professorship, 2022', country: '🇳🇬 Nigeria' },
  { name: 'Maria Fernandez',    title: 'VP Operations, Pan-American Corp', program: 'MBA, 2021', country: '🇲🇽 Mexico' },
  { name: 'Dr. Leila Hassan',   title: 'Head of Sustainability, EU Council', program: 'MSW, 2020', country: '🇩🇪 Germany' },
  { name: 'Thomas Eriksson',    title: 'Managing Director, Nordic Capital', program: 'MBA, 2022', country: '🇸🇪 Sweden' },
  { name: 'Amara Diallo',       title: 'Founder, West Africa EdTech', program: 'BBA, 2021', country: '🇬🇭 Ghana' },
]

const ALUMNI_BENEFITS = [
  { icon: '🤝', title: 'Global Network Access', desc: 'Connect with 15,000+ alumni across 100+ countries through our exclusive alumni platform and annual events.' },
  { icon: '📚', title: 'Lifelong Learning', desc: 'Access alumni discounts on continuing education programs, workshops, and certification courses.' },
  { icon: '💼', title: 'Career Services', desc: 'Exclusive access to the EUAU Career Portal with curated job postings from our global corporate partners.' },
  { icon: '🏆', title: 'Alumni Recognition', desc: 'Be featured on the EUAU Alumni Wall of Excellence and recognized at our annual Convocation Gala.' },
  { icon: '📰', title: 'Alumni Newsletter', desc: 'Monthly digest featuring alumni success stories, university news, and upcoming events worldwide.' },
  { icon: '🎤', title: 'Speaking Opportunities', desc: 'Represent EUAU at conferences, guest lecture opportunities, and industry panels globally.' },
]

export default function AlumniPage() {
  return (
    <>
      <PageHero
        label="ALUMNI COMMUNITY"
        title="Our Global Alumni Network"
        description="Join thousands of EU American University graduates who are shaping industries, driving innovation, and creating impact across 100+ countries."
      />

      {/* Stats */}
      <section style={{ padding: '56px 0', background: '#1B3A6B' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {ALUMNI_STATS.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 34, fontWeight: 800, color: '#E09900', marginBottom: 6 }}>{s.value}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Alumni */}
      <section style={{ padding: '72px 0', background: '#FFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 2, background: '#E09900' }} />
              <span style={{ color: '#E09900', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>DISTINGUISHED GRADUATES</span>
              <div style={{ width: 28, height: 2, background: '#E09900' }} />
            </div>
            <h2 style={{ color: '#0F1C35', fontSize: 30, fontWeight: 800, margin: 0 }}>Notable Alumni</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NOTABLE_ALUMNI.map(a => (
              <div key={a.name} style={{ background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', padding: '24px', borderLeft: '4px solid #1B3A6B' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 46, height: 46, background: '#1B3A6B', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E09900', fontWeight: 800, fontSize: 16, flexShrink: 0 }}>
                    {a.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p style={{ fontWeight: 800, color: '#0F1C35', margin: '0 0 2px', fontSize: 15 }}>{a.name}</p>
                    <p style={{ color: '#64748B', fontSize: 12.5, margin: 0 }}>{a.country}</p>
                  </div>
                </div>
                <p style={{ color: '#374151', fontSize: 14, margin: '0 0 8px', fontWeight: 600 }}>{a.title}</p>
                <span style={{ fontSize: 12, color: '#E09900', fontWeight: 700, background: '#FFF8E6', padding: '3px 10px', borderRadius: 20 }}>
                  {a.program}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '72px 0', background: '#F7F8FA' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ color: '#0F1C35', fontSize: 30, fontWeight: 800, margin: '0 0 12px' }}>Alumni Benefits</h2>
            <p style={{ color: '#64748B', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>
              Your graduation is just the beginning. EUAU alumni enjoy exclusive benefits for life.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ALUMNI_BENEFITS.map(b => (
              <div key={b.title} style={{ background: '#FFF', borderRadius: 12, border: '1px solid #E2E8F0', padding: '26px', borderTop: '3px solid #E09900' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{b.icon}</div>
                <h3 style={{ fontWeight: 800, color: '#0F1C35', fontSize: 15.5, margin: '0 0 10px' }}>{b.title}</h3>
                <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0F2347, #1B3A6B)', padding: '72px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ color: '#FFF', fontSize: 30, fontWeight: 800, marginBottom: 14 }}>Join the Alumni Network</h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, marginBottom: 32, lineHeight: 1.65 }}>
            Are you an EU American University graduate? Register to access exclusive alumni resources, events, and the global community.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/admissions/apply" style={{ padding: '14px 30px', background: '#E09900', color: '#FFF', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Register as Alumni
            </Link>
            <Link href="/contact" style={{ padding: '14px 30px', background: 'transparent', color: '#FFF', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Contact Alumni Office
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
