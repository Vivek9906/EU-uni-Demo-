export const CONTACT = {
  email:         'info@euamericanuniversity.us',
  emailNoReply:  'noreply@euamericanuniversity.us',
  emailAdmin:    'admin@euamericanuniversity.us',
  phone:         '+33 1 89 37 00 04',
  addresses: {
    copenhagen: {
      line1:   'Rued Langgaards Vej 7',
      line2:   '4300 Copenhagen S',
      country: 'Denmark',
      flag:    '🇩🇰',
    },
    austin: {
      line1:   'Suite 2.408, 1616 Guadalupe Street',
      line2:   'Austin, TX 78701',
      country: 'United States',
      flag:    '🇺🇸',
    },
    malaysia: {
      line1:   'Blok C, Kompleks Kelana Centre Point',
      line2:   'Jalan SS7/14, Kelana Jaya, 47301 Petaling Jaya, Selangor',
      country: 'Malaysia',
      flag:    '🇲🇾',
    },
  },
  social: {
    facebook:  '',   // Fill from admin settings
    twitter:   '',
    linkedin:  '',
    instagram: '',
    // YouTube intentionally excluded per client
  },
}

export const UNIVERSITY = {
  name:      'EU American University',
  shortName: 'EUAU',
  tagline:   "A Leader's Choice in Education",
  founded:   1924,
  siteUrl:   process.env.NEXT_PUBLIC_SITE_URL ?? 'https://euamericanuniversity.us',
}
