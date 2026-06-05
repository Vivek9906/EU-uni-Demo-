import { PageHero } from '@/components/ui/PageHero'
import Link from 'next/link'

export const metadata = {
  title: 'Honorary Professorship | EU American University',
  description: 'The EU American University Honorary Professorship recognizes distinguished scholars and educators for exceptional academic and professional contributions.',
}

export default function HonoraryProfessorshipPage() {
  return (
    <>
      <PageHero
        label="HONORARY PROGRAMS"
        title="Honorary Professorship"
        description="Recognizing distinguished scholars, educators, and thought leaders whose contributions to academia and professional fields are exceptional."
      />

      <section style={{ padding: '72px 0', background: '#FFF' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          
          <div style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 28, height: 2, background: '#E09900' }} />
              <span style={{ color: '#E09900', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>OVERVIEW</span>
            </div>
            <h2 style={{ color: '#0F1C35', fontSize: 28, fontWeight: 800, marginBottom: 20 }}>What is an Honorary Professorship?</h2>
            <p style={{ color: '#374151', fontSize: 15.5, lineHeight: 1.8, marginBottom: 16 }}>
              The Honorary Professorship is conferred by EU American University upon distinguished individuals who have made significant contributions to academic knowledge, professional practice, or public discourse. This title recognizes individuals whose expertise, scholarship, and standing in their field place them among the foremost authorities of their generation.
            </p>
            <p style={{ color: '#374151', fontSize: 15.5, lineHeight: 1.8 }}>
              Honorary Professors are invited to be associated with the university&apos;s academic community, lending their reputation and expertise to advance the institution&apos;s educational mission and global standing.
            </p>
          </div>

          <div style={{ background: '#F8FAFC', borderRadius: 12, padding: '36px', marginBottom: 40, border: '1px solid #E2E8F0' }}>
            <h2 style={{ color: '#0F1C35', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>Eligibility Criteria</h2>
            <div style={{ display: 'grid', gap: 14 }}>
              {[
                'Recognised authority or expert in an academic discipline, professional field, or public service',
                'Substantial body of published work, research, or practice that has influenced the field',
                'Active engagement with education, mentorship, or the advancement of knowledge',
                'International recognition through awards, appointments, or peer acknowledgment',
                'Alignment with EU American University values of excellence, integrity, and global impact',
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

          <div style={{ background: 'linear-gradient(135deg, #0F2347, #1B3A6B)', borderRadius: 14, padding: '44px 40px', textAlign: 'center' }}>
            <h2 style={{ color: '#FFF', fontSize: 26, fontWeight: 800, marginBottom: 12 }}>Apply for Honorary Professorship</h2>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 15, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
              Nominations and self-applications are accepted year-round and reviewed by the Academic Council.
            </p>
            <Link href="/admissions/apply?program=honorary-professorship" style={{ display: 'inline-block', padding: '14px 32px', background: '#E09900', color: '#FFF', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Apply for Honorary Professorship
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
