import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'

export const metadata = {
  title: 'Honorary Doctorate (Honoris Causa) | EU American University',
  description: 'The EU American University Honorary Doctorate recognizes extraordinary individuals for lifelong contributions to their field and society.',
}

export default function HonoraryDoctoratePage() {
  return (
    <>
      <PageHero
        label="HONORARY PROGRAMS"
        title="Honorary Doctorate (Honoris Causa)"
        description="Recognizing extraordinary individuals for exceptional contributions to society, leadership, and their field of expertise."
      />

      <section style={{ padding: '72px 0', background: '#FFF' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          
          {/* Overview */}
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: '#E09900' }} />
              <span style={{ color: '#E09900', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>OVERVIEW</span>
            </div>
            <h2 style={{ color: '#0F1C35', fontSize: 28, fontWeight: 800, marginBottom: 20 }}>What is an Honorary Doctorate?</h2>
            <p style={{ color: '#374151', fontSize: 15.5, lineHeight: 1.8, marginBottom: 16 }}>
              An Honorary Doctorate (Honoris Causa) is the highest form of recognition that EU American University bestows upon individuals who have made extraordinary and lasting contributions to their profession, community, or humanity at large. Unlike earned academic degrees, the honorary doctorate is a mark of esteem and distinction conferred by the university&apos;s academic council.
            </p>
            <p style={{ color: '#374151', fontSize: 15.5, lineHeight: 1.8 }}>
              Recipients are distinguished leaders, pioneers, and visionaries whose work has transcended their fields and inspired others across the globe. This recognition celebrates a life&apos;s work and affirms the impact that individuals can have when they pursue their calling with dedication and integrity.
            </p>
          </div>

          {/* Eligibility */}
          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '36px', marginBottom: 40, border: '1px solid #E2E8F0' }}>
            <h2 style={{ color: '#0F1C35', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Eligibility Criteria</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {[
                'Demonstrated extraordinary achievement in a professional, academic, or humanitarian field',
                'Significant and lasting positive impact on communities, industries, or global society',
                'A career or body of work that serves as an inspiration and model for others',
                'A record of ethical leadership and integrity throughout their professional life',
                'Recognition or standing acknowledged at a national or international level',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 22, height: 22, background: '#E09900', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <span style={{ color: '#FFF', fontWeight: 800, fontSize: 12 }}>✓</span>
                  </div>
                  <p style={{ color: '#374151', fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ color: '#0F1C35', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>What&apos;s Included</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {[
                { icon: '📜', title: 'Official Certificate', desc: 'A beautifully designed, seal-embossed honorary doctorate certificate' },
                { icon: '📧', title: 'Official Letter', desc: 'A formal letter of conferral from the university chancellor' },
                { icon: '🌐', title: 'Alumni Listing', desc: 'Recognition on the official EU American University honorary alumni page' },
                { icon: '🔒', title: 'Digital Verification', desc: 'A unique verification ID allowing global employers to authenticate your award' },
              ].map(item => (
                <div key={item.title} style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: 10, padding: '22px 18px', borderTop: '3px solid #E09900' }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
                  <h3 style={{ fontWeight: 700, color: '#0F1C35', fontSize: 14.5, marginBottom: 6 }}>{item.title}</h3>
                  <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg, #0F2347, #1B3A6B)', borderRadius: 14, padding: '44px 40px', textAlign: 'center' }}>
            <h2 style={{ color: '#FFF', fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Ready to Apply?</h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 15, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
              Begin your Honorary Doctorate application. Our admissions team reviews applications on a rolling basis.
            </p>
            <Link href="/admissions/apply?program=honorary-doctorate" style={{ display: 'inline-block', padding: '14px 32px', background: '#E09900', color: '#FFF', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Apply for Honorary Doctorate
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
