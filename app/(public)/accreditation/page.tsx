'use client';

import { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';

type AccreditationType = {
  id: string;
  name: string;
  fullName: string;
  logo: string;
  description: string;
  certificateUrl?: string | null;
};

const ACCREDITATIONS: AccreditationType[] = [
  {
    id: 'qahe',
    name: 'QAHE',
    fullName: 'International Association for Quality Assurance in Pre-Tertiary & Higher Education',
    logo: '/images/logos/qahe.jpeg',
    description: 'EU American University holds accreditation from QAHE, a globally recognized organization promoting academic quality and institutional excellence. This accreditation affirms our commitment to high educational standards, measurable student learning outcomes, and continuous improvement across all programs.',
    certificateUrl: '/images/qahe.jpg',
  },
  {
    id: 'eahea',
    name: 'EAHEA',
    fullName: 'European Association for Higher Education Advancement',
    logo: '/images/logos/eahea.png',
    description: 'Recognized by EAHEA, EU American University demonstrates strong academic quality, industry relevance, and continuous institutional improvement aligned with internationally respected standards.',
    certificateUrl: '/images/eahea.png',
  },
  {
    id: 'acbsp',
    name: 'ACBSP',
    fullName: 'Accreditation Council for Business Schools and Programs',
    logo: '/images/logos/acbsp.png',
    description: 'EU American University holds ACBSP Candidate for Accreditation status. Founded in 1988 and recognized by CHEA, ACBSP supports over 1,100 member campuses globally in advancing quality business education.',
    certificateUrl: null,
  },
  {
    id: 'iacbe',
    name: 'IACBE',
    fullName: 'International Accreditation Council for Business Education',
    logo: '/images/logos/iacbe.jpeg',
    description: 'IACBE recognizes EU American University for excellence in business and management education, evaluating programs on outcomes-based effectiveness, innovation, ethical leadership, and measurable student achievement.',
    certificateUrl: '/images/iacbe.jpg',
  },
  {
    id: 'athea',
    name: 'ATHEA',
    fullName: 'Association for Transnational Higher Education Accreditation',
    logo: '/images/logos/athea.jpeg',
    description: 'Through ATHEA recognition, EU American University demonstrates commitment to quality teaching, research governance, and academic best practices that align with international higher education standards.',
    certificateUrl: '/images/athea.png',
  },
  {
    id: 'accreditat',
    name: 'ACCREDITAT',
    fullName: 'ACCREDITAT International Quality Assurance',
    logo: '/images/logos/accreditat.png',
    description: 'ACCREDITAT recognition affirms EU American University\'s adherence to internationally benchmarked standards covering academic quality, student support services, and strategic institutional development.',
    certificateUrl: '/images/accreditat.png',
  },
  {
    id: 'unesco',
    name: 'UNESCO',
    fullName: 'United Nations Educational, Scientific and Cultural Organization',
    logo: '/images/logos/unesco.png',
    description: 'EU American University supports the educational values and global vision of UNESCO, promoting intercultural understanding, lifelong learning, ethical leadership, and knowledge-sharing worldwide.',
    certificateUrl: null,
  },
  {
    id: 'acics',
    name: 'ACICS',
    fullName: 'Accrediting Council for Independent Colleges and Schools',
    logo: '/images/logos/acics.jpeg',
    description: 'Through ACICS association, EU American University upholds standards of academic integrity, student achievement, and operational effectiveness that prepare graduates for a competitive global workforce.',
    certificateUrl: null,
  },
];

function AccreditationCard({ acc }: { acc: AccreditationType }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isPDF = acc.certificateUrl?.toLowerCase().endsWith('.pdf');

  return (
    <>
      <div style={{
        background: '#FFF', borderRadius: 12, border: '1px solid #E2E8F0',
        padding: '28px', borderTop: '4px solid #1B3A6B',
        display: 'flex', flexDirection: 'column', gap: 16,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(27,58,107,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <div style={{ width: 52, height: 52, background: '#F0F4FF', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0, overflow: 'hidden', padding: acc.logo.startsWith('/') ? '4px' : '0' }}>
            {acc.logo.startsWith('/') ? (
              <img src={acc.logo} alt={`${acc.name} logo`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              acc.logo
            )}
          </div>
          <div>
            <h3 style={{ color: '#1B3A6B', fontWeight: 800, fontSize: 18, margin: '0 0 4px' }}>{acc.name}</h3>
            <p style={{ color: '#64748B', fontSize: 11.5, margin: 0, lineHeight: 1.4 }}>{acc.fullName}</p>
          </div>
        </div>

        <div style={{ height: 1, background: '#F1F5F9' }} />
        <p style={{ color: '#374151', fontSize: 14, lineHeight: 1.75, margin: 0, flex: 1 }}>{acc.description}</p>

        {/* Certificate Action */}
        <div style={{ marginTop: 'auto' }}>
          {acc.certificateUrl && !imgError ? (
            isPDF ? (
              // PDF → new tab
              <a href={acc.certificateUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#1B3A6B', color: '#FFF', borderRadius: 7, fontWeight: 700, fontSize: 13.5, textDecoration: 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0F2347'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1B3A6B'}>
                📄 View Certificate
              </a>
            ) : (
              // Image → lightbox modal
              <button onClick={() => setModalOpen(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#1B3A6B', color: '#FFF', borderRadius: 7, fontWeight: 700, fontSize: 13.5, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0F2347'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1B3A6B'}>
                🏅 View Certificate
              </button>
            )
          ) : (
            // Missing / broken image
            <button onClick={(e) => e.preventDefault()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#1B3A6B', color: '#FFF', borderRadius: 7, fontWeight: 700, fontSize: 13.5, border: 'none', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0F2347'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1B3A6B'}>
              🏅 View Certificate
            </button>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: 20, cursor: 'pointer' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', maxWidth: '88vw', maxHeight: '88vh', cursor: 'default' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={acc.certificateUrl!}
              alt={`${acc.name} Accreditation Certificate`}
              onError={() => { setImgError(true); setModalOpen(false); }}
              style={{ maxWidth: '100%', maxHeight: '82vh', objectFit: 'contain', borderRadius: 8, boxShadow: '0 24px 64px rgba(0,0,0,0.6)', display: 'block' }}
            />
            {/* Close */}
            <button onClick={() => setModalOpen(false)}
              style={{ position: 'absolute', top: -16, right: -16, width: 36, height: 36, background: '#FFF', border: 'none', borderRadius: '50%', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.3)', fontWeight: 700 }}>
              ✕
            </button>
            {/* Download */}
            <a href={acc.certificateUrl!} download target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', textAlign: 'center', marginTop: 16, padding: '9px 24px', background: '#E09900', color: '#FFF', borderRadius: 7, fontWeight: 700, fontSize: 13.5, textDecoration: 'none', width: 'fit-content', margin: '12px auto 0' }}>
              ⬇ Download Certificate
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default function AccreditationPage() {
  return (
    <>
      <PageHero
        label="QUALITY ASSURANCE"
        title="Accreditations & Recognitions"
        description="EU American University is recognized and accredited by leading international quality assurance organizations, affirming our commitment to academic excellence worldwide."
      />

      <section className="section-padding bg-background-subtle">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {ACCREDITATIONS.map((acc) => (
              <AccreditationCard key={acc.id} acc={acc} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
