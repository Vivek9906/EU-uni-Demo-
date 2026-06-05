export const PROGRAMS = {
  phd: [
    {
      title:       'Doctor of Philosophy (PhD)',
      slug:        'doctor-of-philosophy',
      level:       'phd' as const,
      href:        '/academics/phd/doctor-of-philosophy',
      description: 'An internationally recognized doctoral program for scholars who wish to advance their field through independent research and academic inquiry.',
    },
  ],
  honorary: [
    {
      title:       'Honorary Doctorate (Honoris Causa)',
      slug:        'honorary-doctorate',
      level:       'honorary' as const,
      href:        '/academics/honorary/honorary-doctorate',
      description: 'Conferred upon exceptional individuals whose lifelong contributions have significantly advanced their field and inspired others globally.',
    },
    {
      title:       'Honorary Professorship',
      slug:        'honorary-professorship',
      level:       'honorary' as const,
      href:        '/academics/honorary/honorary-professorship',
      description: 'Recognizes distinguished educators and scholars whose academic contributions merit the highest institutional recognition.',
    },
  ],
  masters: [
    { title: 'Master of Business Administration (MBA)', slug: 'mba', level: 'masters' as const, href: '/academics/masters/mba' },
    { title: 'Master of Public Administration (MPA)',   slug: 'mpa', level: 'masters' as const, href: '/academics/masters/mpa' },
    { title: 'Master of Social Work (MSW)',             slug: 'msw', level: 'masters' as const, href: '/academics/masters/msw' },
  ],
  bachelors: [
    { title: 'Bachelor of Business Administration (BBA)', slug: 'bba', level: 'bachelors' as const, href: '/academics/bachelors/bba' },
    { title: 'Bachelor of Public Administration (BPA)',   slug: 'bpa', level: 'bachelors' as const, href: '/academics/bachelors/bpa' },
    { title: 'Bachelor of Social Work (BSW)',             slug: 'bsw', level: 'bachelors' as const, href: '/academics/bachelors/bsw' },
  ],
}

// Ordered per client requirement: PhD first, Bachelor's last
export const PROGRAMS_ORDERED = [
  ...PROGRAMS.phd,
  ...PROGRAMS.honorary,
  ...PROGRAMS.masters,
  ...PROGRAMS.bachelors,
]

export const PROGRAMS_BY_LEVEL = PROGRAMS
