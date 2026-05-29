import React from 'react';
import Link from 'next/link';

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHero({ label, title, description, subtitle, breadcrumbs }: PageHeroProps) {
  const bodyText = description ?? subtitle;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F2347 0%, #1B3A6B 55%, #2C5282 100%)',
        padding: '56px 0 52px',
      }}
    >
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-[280px] w-[280px] rounded-full"
        style={{ background: 'rgba(224, 153, 0, 0.06)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 left-[30%] h-[180px] w-[180px] rounded-full"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-3 flex flex-wrap items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-white/45 hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <React.Fragment key={`${crumb.label}-${crumb.href ?? 'current'}`}>
                <span className="text-white/30">›</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="text-white/45 hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {label && (
          <div className="mb-3 flex items-center gap-2">
            <div className="h-[3px] w-7 shrink-0 rounded-full bg-[#E09900]" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: '#E09900' }}
            >
              {label}
            </span>
          </div>
        )}

        <h1
          className="mb-4 max-w-3xl text-balance text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold leading-[1.18]"
          style={{ color: '#FFFFFF', textShadow: 'none' }}
        >
          {title}
        </h1>

        {bodyText && (
          <p
            className="max-w-2xl text-base font-normal leading-[1.68] md:text-lg"
            style={{ color: 'rgba(255, 255, 255, 0.78)' }}
          >
            {bodyText}
          </p>
        )}
      </div>
    </section>
  );
}
