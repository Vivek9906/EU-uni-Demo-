import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Super Admin User
  const hashedPassword = await bcrypt.hash('ChangeMe@123!', 12);
  await prisma.adminUser.upsert({
    where: { email: 'admin@amu.edu.eu' },
    update: {},
    create: {
      email: 'admin@amu.edu.eu',
      password: hashedPassword,
      name: 'Super Administrator',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin user created');

  // 2. Faculty Members
  const facultyData = [
    {
      name: 'Dr. Eleanor Whitfield',
      designation: 'Professor & Dean of Business',
      department: 'Business Administration',
      specialization: 'Strategic Management & Corporate Governance',
      bio: 'Dr. Eleanor Whitfield brings over 25 years of academic and industry experience in strategic management. She has served as a consultant to Fortune 500 companies and has published extensively in leading journals including the Harvard Business Review and the Academy of Management Journal. Her research focuses on corporate governance, stakeholder theory, and sustainable business practices. Dr. Whitfield holds a PhD from the London School of Economics and has been recognized with numerous teaching excellence awards.',
      email: 'e.whitfield@amu.edu.eu',
      publications: [
        'Corporate Governance in the Digital Age (2024)',
        'Stakeholder Theory Revisited (2023)',
        'Sustainable Business Practices: A Framework (2022)',
      ],
      order: 1,
    },
    {
      name: 'Prof. Marcus Chen',
      designation: 'Associate Professor of Finance',
      department: 'Business Administration',
      specialization: 'International Finance & Risk Management',
      bio: 'Professor Marcus Chen is a distinguished scholar in international finance with a career spanning two decades. He previously held positions at INSEAD and the National University of Singapore. His research on emerging market risk assessment has been widely cited, and he serves on the editorial boards of several financial journals. Prof. Chen regularly advises multinational corporations on cross-border investment strategies and financial risk mitigation.',
      email: 'm.chen@amu.edu.eu',
      publications: [
        'Emerging Market Risk Assessment Models (2024)',
        'Cross-Border Investment Strategies (2023)',
        'Financial Innovation in Southeast Asia (2022)',
      ],
      order: 2,
    },
    {
      name: 'Dr. Amara Okonkwo',
      designation: 'Professor of Leadership Studies',
      department: 'Leadership & Management',
      specialization: 'Organizational Behavior & Leadership Development',
      bio: 'Dr. Amara Okonkwo is an internationally recognized authority on leadership development and organizational behavior. With a PhD from Yale University, she has dedicated her career to understanding how leaders can drive transformative change within organizations. Her groundbreaking research on adaptive leadership in multicultural environments has been featured in The Economist and the Financial Times. Dr. Okonkwo has coached senior executives at organizations including the World Bank and the United Nations.',
      email: 'a.okonkwo@amu.edu.eu',
      publications: [
        'Adaptive Leadership in Multicultural Organizations (2024)',
        'The Future of Work: Leadership Perspectives (2023)',
        'Emotional Intelligence and Executive Performance (2021)',
      ],
      order: 3,
    },
    {
      name: 'Dr. Heinrich Müller',
      designation: 'Professor of Economics',
      department: 'Business Administration',
      specialization: 'Macroeconomics & Public Policy',
      bio: 'Dr. Heinrich Müller is a distinguished economist who previously served as an economic advisor to the European Commission. With over 20 years of experience in policy research and academic instruction, he brings a unique perspective that bridges theoretical economics with real-world policy challenges. His work on fiscal policy in the European Union has influenced key economic decisions at the continental level. Dr. Müller holds degrees from the University of Munich and MIT.',
      email: 'h.muller@amu.edu.eu',
      publications: [
        'Fiscal Policy in the EU: Challenges and Opportunities (2024)',
        'Economic Recovery Post-Pandemic: Lessons Learned (2023)',
        'Public Policy and Economic Growth (2022)',
      ],
      order: 4,
    },
    {
      name: 'Dr. Sophia Laurent',
      designation: 'Associate Professor of Marketing',
      department: 'Business Administration',
      specialization: 'Digital Marketing & Consumer Behavior',
      bio: 'Dr. Sophia Laurent is a leading researcher in digital marketing and consumer psychology. Prior to her academic career, she spent a decade as a marketing executive at L\'Oréal and Google. Her research explores how digital transformation is reshaping consumer behavior and brand strategy. Dr. Laurent has received the European Marketing Academy Best Paper Award and serves as a consultant to several global brands on digital strategy.',
      email: 's.laurent@amu.edu.eu',
      publications: [
        'Digital Marketing Transformation: A Global Perspective (2024)',
        'Consumer Behavior in the Age of AI (2023)',
        'Brand Strategy in the Social Media Era (2022)',
      ],
      order: 5,
    },
  ];

  for (const faculty of facultyData) {
    await prisma.faculty.create({ data: faculty });
  }
  console.log('✅ Faculty members created');

  // 3. News Articles
  const newsData = [
    {
      title: 'AMU Launches New Partnership with European Business Schools Network',
      slug: 'amu-european-partnership-2025',
      content: `<p>American Management University is proud to announce a groundbreaking partnership with the European Business Schools Network (EBSN), bringing together leading institutions from across the continent to foster academic collaboration and student exchange opportunities.</p>
<p>This strategic alliance will enable AMU students to access a network of over 50 partner institutions across Europe, providing unparalleled opportunities for international exposure and cross-cultural learning. The partnership includes joint research initiatives, faculty exchange programs, and collaborative curriculum development.</p>
<p>"This partnership represents a significant milestone in our mission to provide globally relevant education," said the AMU Chancellor. "Our students will now have access to an even broader network of academic resources and professional connections."</p>
<p>The agreement was signed during a ceremony at AMU's Paris headquarters, attended by representatives from 15 European business schools. Programs under this partnership are expected to begin in the Fall 2025 semester.</p>`,
      excerpt: 'AMU partners with the European Business Schools Network to offer expanded international opportunities for students and faculty.',
      category: 'Partnerships',
      author: 'AMU Communications',
      isPublished: true,
      publishedAt: new Date('2025-03-15'),
    },
    {
      title: 'AMU Ranked Among Top 10 for Management Programs in Europe',
      slug: 'amu-top-10-management-ranking',
      content: `<p>American Management University has been ranked among the top 10 institutions for management and leadership programs in Europe by a leading international education ranking body. This recognition reflects AMU's commitment to academic excellence and its impact on the global business education landscape.</p>
<p>The ranking evaluated institutions based on several key criteria, including program quality, faculty expertise, graduate employability, international diversity, and research output. AMU scored particularly high in international diversity and graduate outcomes.</p>
<p>"This ranking is a testament to the hard work of our faculty, staff, and students," remarked the Vice Chancellor. "We are committed to continuously improving our programs and providing our students with the skills they need to succeed in a rapidly changing global economy."</p>
<p>AMU's MBA program was specifically highlighted for its innovative curriculum that combines traditional business fundamentals with cutting-edge topics such as digital transformation, sustainable leadership, and global strategy.</p>`,
      excerpt: 'AMU earns a place among Europe\'s top 10 institutions for management and leadership education.',
      category: 'Rankings',
      author: 'AMU Communications',
      isPublished: true,
      publishedAt: new Date('2025-02-20'),
    },
    {
      title: 'Honorary Doctorate Recipients Make Global Impact in 2025',
      slug: 'honorary-doctorate-global-impact-2025',
      content: `<p>American Management University celebrates the remarkable achievements of its 2025 Honorary Doctorate recipients, who continue to make significant contributions to business, education, and community development worldwide.</p>
<p>This year's cohort of honorary doctorate recipients includes distinguished leaders from over 30 countries, representing diverse fields including entrepreneurship, nonprofit leadership, public administration, and academic research. Their collective impact spans community development projects, educational initiatives, and innovative business ventures.</p>
<p>"Our honorary doctorate program recognizes individuals who have demonstrated exceptional leadership and made meaningful contributions to their communities and professions," explained the Dean of Academic Affairs. "These recipients exemplify the values of excellence, integrity, and service that AMU stands for."</p>
<p>The university encourages qualified candidates to explore the Honorary Doctorate program and join a growing network of distinguished global leaders.</p>`,
      excerpt: 'AMU\'s 2025 Honorary Doctorate recipients demonstrate the program\'s global reach and impact across 30+ countries.',
      category: 'Awards',
      author: 'AMU Communications',
      isPublished: true,
      publishedAt: new Date('2025-01-10'),
    },
  ];

  for (const news of newsData) {
    await prisma.news.create({ data: news });
  }
  console.log('✅ News articles created');

  // 4. Events
  const eventsData = [
    {
      title: 'AMU Commencement Ceremony 2027',
      slug: 'commencement-ceremony-2027',
      description: `Join us for the American Management University Commencement Ceremony 2027, a celebration of academic achievement and the culmination of years of dedication and hard work. This prestigious event will honor our graduating class, including recipients of Bachelor's, Master's, and Doctoral degrees, as well as Honorary Doctorate and Professorship recipients.

The ceremony will feature keynote addresses from distinguished leaders in business and education, the conferral of degrees, and special recognition of outstanding academic achievement. Family, friends, faculty, and alumni are all welcome to attend this momentous occasion.

Formal academic attire is required for all graduates. Reception to follow the ceremony.`,
      date: new Date('2027-06-15T10:00:00'),
      endDate: new Date('2027-06-15T14:00:00'),
      venue: 'AMU Grand Hall, 11 rue Magdebourg, Paris, France 75016',
      category: 'Ceremony',
      isPublished: true,
    },
    {
      title: 'International Leadership Summit 2025',
      slug: 'international-leadership-summit-2025',
      description: `American Management University presents the International Leadership Summit 2025, bringing together thought leaders, executives, and academics from around the world to explore the future of leadership in a rapidly evolving global landscape.

This two-day summit will feature panel discussions, keynote presentations, and interactive workshops covering topics such as digital transformation, sustainable business practices, cross-cultural leadership, and the role of AI in management. Participants will have the opportunity to network with peers and gain actionable insights for their leadership journey.

Early registration is recommended as spaces are limited.`,
      date: new Date('2025-09-20T09:00:00'),
      endDate: new Date('2025-09-21T17:00:00'),
      venue: 'AMU Conference Center, Paris, France',
      category: 'Conference',
      isPublished: true,
    },
  ];

  for (const event of eventsData) {
    await prisma.event.create({ data: event });
  }
  console.log('✅ Events created');

  // 5. FAQ Items
  const faqData = [
    // Admissions
    { question: 'What are the admission requirements for the MBA program?', answer: 'Applicants must hold a recognized bachelor\'s degree from an accredited institution. Professional experience is valued but not mandatory for the Bachelor\'s level MBA. For the Master\'s level MBA, a minimum of 2 years of professional experience is preferred. All applicants must submit a completed application form, official transcripts, a statement of purpose, and a current CV/resume.', category: 'Admissions', order: 1 },
    { question: 'How do I apply to AMU?', answer: 'You can apply online through our application portal at /admissions/apply. Complete all required sections of the application form, upload supporting documents, and submit. You will receive a confirmation email with your unique Application Reference Number (format: AMU-2025-XXXXX) once your application is successfully submitted.', category: 'Admissions', order: 2 },
    { question: 'What is the application deadline?', answer: 'AMU operates on a rolling admissions basis, meaning applications are reviewed as they are received. However, we recommend applying at least 8 weeks before your intended start date to allow sufficient time for processing. Specific scholarship deadlines may apply — please check the Scholarships page for details.', category: 'Admissions', order: 3 },
    { question: 'Can international students apply?', answer: 'Absolutely. AMU welcomes students from all countries and backgrounds. We have students from over 100 countries. International applicants follow the same application process. Our admissions team is experienced in evaluating international credentials and can guide you through the process.', category: 'Admissions', order: 4 },
    { question: 'Are there scholarships available?', answer: 'Yes, AMU offers several scholarship opportunities including merit-based scholarships, need-based financial aid, and special scholarships for international students. Visit our Scholarships page for detailed eligibility criteria and application instructions.', category: 'Admissions', order: 5 },
    // Programs
    { question: 'What programs does AMU offer?', answer: 'AMU offers MBA programs at both the Bachelor\'s and Master\'s level, as well as doctoral-level programs including the Honorary Doctorate and Honorary Professorship. Each program is designed to provide practical, career-relevant education with a global perspective.', category: 'Programs', order: 1 },
    { question: 'What is the difference between the Bachelor\'s and Master\'s MBA?', answer: 'The Bachelor\'s MBA (BBA) provides foundational business education covering core management disciplines. The Master\'s MBA builds on this foundation with advanced coursework in strategic leadership, global business strategy, and specialized electives. The Master\'s program is designed for professionals seeking to advance into senior leadership roles.', category: 'Programs', order: 2 },
    { question: 'What is an Honorary Doctorate?', answer: 'An Honorary Doctorate (Honoris Causa) is a prestigious academic recognition awarded to individuals who have demonstrated exceptional achievement and significant contributions to their field, community, or society at large. It recognizes a lifetime of professional excellence and service. The program name submitted during application is exactly what appears on your certificate.', category: 'Programs', order: 3 },
    { question: 'What is an Honorary Professorship?', answer: 'An Honorary Professorship is an academic distinction that recognizes individuals who have made outstanding contributions to education, research, or their professional field. Recipients gain the academic title and are listed among AMU\'s distinguished faculty. This recognition is awarded based on merit and professional accomplishment.', category: 'Programs', order: 4 },
    { question: 'Are programs available online?', answer: 'Yes, AMU offers flexible delivery modes including fully online, hybrid, and on-campus options. Our online programs use state-of-the-art learning platforms that provide interactive coursework, virtual collaboration tools, and access to digital libraries. Students can choose the mode that best fits their schedule and learning preferences.', category: 'Programs', order: 5 },
    // Fees
    { question: 'What are the tuition fees?', answer: 'Tuition fees vary by program and delivery mode. Please contact our admissions office at admissions@amu.edu.eu for the current fee schedule. AMU strives to make quality education accessible and offers various financial aid options.', category: 'Fees', order: 1 },
    { question: 'Are there payment plans available?', answer: 'Yes, AMU offers flexible payment plans that allow students to spread their tuition payments over the duration of their program. Installment options are available. Please contact the finance office for details on available payment arrangements.', category: 'Fees', order: 2 },
    { question: 'What does tuition include?', answer: 'Tuition covers all academic instruction, access to online learning platforms, digital library resources, academic support services, and the issuance of official academic credentials upon completion. Some programs may have additional fees for specific materials or services.', category: 'Fees', order: 3 },
    { question: 'Are there any additional fees?', answer: 'Additional fees may apply for application processing, transcript requests, certificate reissuance, and certain specialized course materials. All applicable fees are disclosed during the admissions process. There are no hidden charges.', category: 'Fees', order: 4 },
    { question: 'Can I get a refund if I withdraw?', answer: 'AMU has a structured refund policy that varies based on the timing of withdrawal. Full details of the refund policy are provided in the student handbook and enrollment agreement. We encourage students to review these terms carefully before enrollment.', category: 'Fees', order: 5 },
    // Campus Life
    { question: 'Where is AMU located?', answer: 'AMU\'s global headquarters and main campus are located at 11 rue Magdebourg, Paris, France 75016. We also have a US regional contact office in Upland, California and a learning site in Manila, Philippines. Our online programs are accessible from anywhere in the world.', category: 'Campus Life', order: 1 },
    { question: 'Is there housing available for students?', answer: 'AMU can assist students attending on-campus programs with finding suitable housing near our Paris campus. We partner with local housing providers and can provide recommendations for student-friendly accommodations in the Paris area.', category: 'Campus Life', order: 2 },
    { question: 'What student support services are available?', answer: 'AMU provides comprehensive student support including academic advising, career counseling, library access, technical support for online learners, and an international student services office. Our goal is to ensure every student has the resources they need to succeed.', category: 'Campus Life', order: 3 },
    { question: 'Are there networking opportunities?', answer: 'AMU offers extensive networking opportunities through alumni events, industry conferences, guest speaker series, and our global alumni network spanning 100+ countries. Our International Leadership Summit and Commencement Ceremony are flagship networking events.', category: 'Campus Life', order: 4 },
    { question: 'How do I connect with other students?', answer: 'Students can connect through our online learning platform, virtual student lounges, alumni network events, and social media communities. AMU fosters a strong sense of community among its diverse international student body.', category: 'Campus Life', order: 5 },
    // Certificates
    { question: 'How can I verify my certificate?', answer: 'Certificates can be verified online through our Certificate Verification page at /verify-certificate. Enter your Certificate ID or Reference Number to instantly verify the authenticity and details of any AMU-issued certificate.', category: 'Certificates', order: 1 },
    { question: 'What appears on the certificate?', answer: 'The certificate displays the exact program name as submitted during the application process. This is clearly stated during application — the program name you select is precisely what will be printed on your official certificate. Please ensure accuracy during application.', category: 'Certificates', order: 2 },
    { question: 'How long does it take to receive my certificate?', answer: 'Certificates are typically issued within 4-6 weeks after the completion of all program requirements and approval by the academic board. Digital copies may be provided earlier. Expedited processing is available upon request.', category: 'Certificates', order: 3 },
    { question: 'Can I request a replacement certificate?', answer: 'Yes, replacement certificates can be requested through the Student Records office. A processing fee may apply. Please contact records@amu.edu.eu with your student ID and program details to initiate a replacement request.', category: 'Certificates', order: 4 },
    { question: 'Is my AMU degree recognized internationally?', answer: 'AMU is accredited by recognized accreditation bodies and operates with authorization in France. Our degrees are recognized in many countries. AMU is a member of ACBSP, IACBE, and ASIC UK, and holds IARC and QAHE accreditation. We recommend checking with your specific country\'s credential evaluation body for detailed recognition information.', category: 'Certificates', order: 5 },
  ];

  for (const faq of faqData) {
    await prisma.fAQ.create({ data: { ...faq, isActive: true } });
  }
  console.log('✅ FAQ items created');

  // 6. Testimonials
  const testimonialData = [
    {
      name: 'Dr. James Okoye',
      program: 'Honorary Doctorate in Business Leadership',
      content: 'Receiving the Honorary Doctorate from American Management University was a defining moment in my career. The recognition validated decades of work in community development across West Africa. AMU\'s commitment to recognizing global leaders who make a difference is truly commendable. I am proud to be part of this distinguished alumni network.',
      isApproved: true,
    },
    {
      name: 'Maria Fernandez',
      program: 'Master of Business Administration (MBA)',
      content: 'The MBA program at AMU transformed my approach to business leadership. The flexible online format allowed me to continue working while pursuing my degree, and the curriculum was directly applicable to my role as a marketing director. The faculty brought real-world experience into every lecture, and the global network of peers I built has been invaluable.',
      isApproved: true,
    },
    {
      name: 'Prof. Ahmed Al-Rashid',
      program: 'Honorary Professorship',
      content: 'Being awarded an Honorary Professorship by AMU was an incredible honor that recognized my contributions to education in the Middle East. The process was thorough and professional, and the certificate proudly hangs in my office. AMU\'s dedication to academic excellence and global recognition of achievement sets it apart from other institutions.',
      isApproved: true,
    },
  ];

  for (const testimonial of testimonialData) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log('✅ Testimonials created');

  // 7. Scholarships
  const scholarshipData = [
    {
      name: 'AMU Merit Excellence Scholarship',
      type: 'merit',
      amount: 'Up to 50% tuition reduction',
      eligibility: 'Available to students with outstanding academic records and professional achievements. Applicants must demonstrate a GPA equivalent of 3.5 or above and provide evidence of leadership or community involvement.',
      description: 'The Merit Excellence Scholarship rewards outstanding academic achievement and leadership potential. Recipients are selected based on their academic records, professional accomplishments, and commitment to making a positive impact in their communities.',
      deadline: new Date('2025-12-31'),
      isActive: true,
    },
    {
      name: 'Global Leaders Financial Aid Grant',
      type: 'need',
      amount: 'Up to 40% tuition assistance',
      eligibility: 'Available to students from developing nations or those demonstrating financial need. Applicants must submit documentation of financial circumstances and maintain satisfactory academic progress.',
      description: 'The Global Leaders Grant provides financial assistance to talented students who face economic barriers to accessing quality higher education. AMU believes that financial circumstances should not prevent motivated individuals from achieving their academic goals.',
      deadline: new Date('2025-11-30'),
      isActive: true,
    },
    {
      name: 'International Diversity Scholarship',
      type: 'international',
      amount: 'Up to 30% tuition reduction',
      eligibility: 'Available to international students from underrepresented regions. Priority given to applicants from countries with limited access to business education. Must demonstrate commitment to applying education for community benefit.',
      description: 'The International Diversity Scholarship promotes AMU\'s mission of providing globally accessible education by reducing barriers for students from underrepresented regions. This scholarship celebrates the diversity that enriches our academic community.',
      deadline: new Date('2026-03-31'),
      isActive: true,
    },
  ];

  for (const scholarship of scholarshipData) {
    await prisma.scholarship.create({ data: scholarship });
  }
  console.log('✅ Scholarships created');

  // 8. Notices
  const noticeData = [
    {
      title: 'Fall 2025 Enrollment Now Open',
      content: 'Applications for the Fall 2025 semester are now being accepted across all programs. Prospective students are encouraged to submit their applications early to ensure timely processing. Visit the Admissions page to begin your application.',
      category: 'academic',
      isActive: true,
    },
    {
      title: 'Updated Academic Calendar 2025-2026',
      content: 'The academic calendar for the 2025-2026 academic year has been published. Key dates include the Fall semester start on September 15, 2025, and the Spring semester start on February 1, 2026. Please review the full calendar for important deadlines and holidays.',
      category: 'academic',
      isActive: true,
    },
    {
      title: 'Library Database Access Expanded',
      content: 'AMU has expanded its digital library resources with access to three new academic databases including JSTOR, ProQuest, and Emerald Insight. All enrolled students can access these resources through the online portal using their student credentials.',
      category: 'admin',
      isActive: true,
    },
    {
      title: 'Commencement 2027 Registration Opens Soon',
      content: 'Eligible graduates planning to participate in the Commencement Ceremony 2027 should begin their registration process. Detailed instructions will be sent to qualifying students via email. The ceremony is scheduled for June 15, 2027, at AMU Grand Hall, Paris.',
      category: 'general',
      isActive: true,
    },
    {
      title: 'Scholarship Application Deadline Reminder',
      content: 'Students interested in the AMU Merit Excellence Scholarship are reminded that the application deadline is December 31, 2025. Ensure all required documents are submitted before the deadline. Late applications will not be considered.',
      category: 'academic',
      isActive: true,
    },
  ];

  for (const notice of noticeData) {
    await prisma.notice.create({ data: notice });
  }
  console.log('✅ Notices created');

  // 9. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'site_settings' },
    update: {},
    create: {
      id: 'site_settings',
      data: {
        siteName: 'American Management University',
        tagline: 'A leader\'s choice in education',
        contactEmail: 'info@amu.edu.eu',
        contactPhone: '+33 1 89 37 00 04',
        address: '11 rue Magdebourg, Paris, France 75016',
        socialMedia: {
          facebook: 'https://facebook.com/amuuniversity',
          twitter: 'https://twitter.com/amuuniversity',
          linkedin: 'https://linkedin.com/school/amuuniversity',
          instagram: 'https://instagram.com/amuuniversity',
          youtube: 'https://youtube.com/amuuniversity',
        },
        seoDefaults: {
          titleTemplate: '%s | American Management University',
          defaultDescription: 'American Management University — A prestigious international institution offering MBA, Honorary Doctorate, and Professorship programs. Shaping global leaders since 1924.',
        },
        maintenanceMode: false,
      },
    },
  });
  console.log('✅ Site settings created');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
