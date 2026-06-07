import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.siteSettings.deleteMany();
  await prisma.legalPage.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.event.deleteMany();
  await prisma.news.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.student.deleteMany();
  await prisma.program.deleteMany();
  await prisma.adminUser.deleteMany();

  // 1. Super Admin User
  const hashedPassword = await bcrypt.hash('Admin@EU2025!', 12);
  await prisma.adminUser.upsert({
    where: { email: 'info@euamericanuniversity.us' },
    update: {},
    create: {
      email: 'info@euamericanuniversity.us',
      password: hashedPassword,
      name: 'Super Administrator',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin user created');

  // 2. Students (for verification demo)
  const studentsData = [
    {
      enrollmentId: 'EUAU-2024-00001',
      fullName: 'Sarah Mitchell',
      email: 'sarah.mitchell@example.com',
      programName: 'Master of Business Administration',
      programLevel: 'masters',
      enrollmentYear: 2024,
      expectedCompletion: '2026',
      status: 'enrolled',
      isPubliclyVisible: true,
    },
    {
      enrollmentId: 'EUAU-2024-00002',
      fullName: 'James Okoye',
      email: 'james.okoye@example.com',
      programName: 'Honorary Doctorate (Honoris Causa)',
      programLevel: 'honorary',
      enrollmentYear: 2024,
      status: 'graduated',
      isPubliclyVisible: true,
    },
    {
      enrollmentId: 'EUAU-2023-00145',
      fullName: 'Maria Fernandez',
      email: 'maria.fernandez@example.com',
      programName: 'Bachelor of Business Administration',
      programLevel: 'bachelors',
      enrollmentYear: 2023,
      expectedCompletion: '2027',
      status: 'enrolled',
      isPubliclyVisible: true,
    },
  ];

  for (const student of studentsData) {
    await prisma.student.upsert({
      where: { enrollmentId: student.enrollmentId },
      update: {},
      create: student,
    });
  }
  console.log('✅ Students created');

  // 3. Certifications (all 30 + 1 bundle)
  const certificationsData = [
    // Bundle
    { slug: 'complete-professional-bundle', title: 'The Complete Professional Certification Bundle', category: 'bundle', description: 'Master all 25 professional domains in one comprehensive package. The most recognized certification collection offered by EU American University, covering technology, business, engineering, research, and personal development.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80', isBundle: true, order: 0 },
    // Technology & IT
    { slug: 'certified-ai-specialist', title: 'Certified Artificial Intelligence Specialist', category: 'technology', description: 'Gain advanced expertise in artificial intelligence systems, machine learning algorithms, and neural network design. This certification prepares professionals to lead AI-driven projects across industries.', imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', order: 1 },
    { slug: 'certified-advanced-data-science-expert', title: 'Certified Advanced Data Science Expert', category: 'technology', description: 'Master advanced data analytics, statistical modeling, and big data technologies. Graduates of this program are equipped to make data-driven decisions at the enterprise level.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', order: 2 },
    { slug: 'certified-data-science-practitioner', title: 'Certified Data Science Practitioner', category: 'technology', description: 'Build a strong foundation in data science fundamentals including Python programming, data visualization, and predictive modeling for business applications.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', order: 3 },
    { slug: 'certified-cloud-computing-specialist', title: 'Certified Cloud Computing Specialist', category: 'technology', description: 'Develop proficiency in cloud architecture, deployment strategies, and multi-cloud management across AWS, Azure, and Google Cloud platforms.', imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80', order: 4 },
    { slug: 'certified-blockchain-specialist', title: 'Certified Blockchain Specialist', category: 'technology', description: 'Understand distributed ledger technology, smart contracts, and decentralized applications. This certification covers blockchain architecture and its real-world applications.', imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80', order: 5 },
    { slug: 'certified-advanced-blockchain-developer', title: 'Certified Advanced Blockchain Developer', category: 'technology', description: 'Take your blockchain skills further with advanced smart contract development, DeFi protocols, and enterprise blockchain solutions across multiple chains.', imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80', order: 6 },
    { slug: 'certified-iot-specialist', title: 'Certified Internet of Things Specialist', category: 'technology', description: 'Learn to design, deploy, and manage IoT ecosystems including sensor networks, edge computing, and connected device security for modern enterprises.', imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80', order: 7 },
    { slug: 'certified-cyber-defense-specialist', title: 'Certified Cyber Defense Specialist', category: 'technology', description: 'Protect organizational assets with advanced cybersecurity techniques including threat detection, incident response, and security operations center management.', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80', order: 8 },
    { slug: 'certified-cyber-law-policy-expert', title: 'Certified Cyber Law and Policy Expert', category: 'technology', description: 'Navigate the intersection of technology and law with expertise in data privacy regulations, digital rights, intellectual property, and cybercrime legislation.', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80', order: 9 },
    // Business & Management
    { slug: 'certified-business-strategist', title: 'Certified Business Strategist', category: 'business', description: 'Develop strategic thinking and competitive analysis skills to drive organizational growth. This program covers market positioning, corporate strategy, and value creation.', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80', order: 10 },
    { slug: 'certified-project-management-professional', title: 'Certified Project Management Professional', category: 'business', description: 'Master project planning, execution, and stakeholder management using proven methodologies including Agile, Scrum, and traditional Waterfall frameworks.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', order: 11 },
    { slug: 'certified-operations-management-expert', title: 'Certified Operations Management Expert', category: 'business', description: 'Optimize business processes, supply chain operations, and quality management systems. This certification prepares leaders to improve efficiency across organizations.', imageUrl: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&q=80', order: 12 },
    { slug: 'certified-leadership-excellence-specialist', title: 'Certified Leadership Excellence Specialist', category: 'business', description: 'Build transformative leadership skills through proven frameworks in emotional intelligence, team dynamics, conflict resolution, and organizational change.', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', order: 13 },
    { slug: 'certified-hr-manager', title: 'Certified Human Resources Manager', category: 'business', description: 'Gain expertise in talent acquisition, employee development, compensation strategy, and labor relations to become a strategic HR partner in any organization.', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80', order: 14 },
    { slug: 'certified-financial-risk-manager', title: 'Certified Financial Risk Manager', category: 'business', description: 'Identify, analyze, and mitigate financial risks using quantitative models and regulatory frameworks. Essential for professionals in banking, insurance, and corporate finance.', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', order: 15 },
    { slug: 'certified-marketing-brand-strategist', title: 'Certified Marketing & Brand Strategist', category: 'business', description: 'Create compelling brand narratives and marketing strategies that resonate with target audiences. Covers digital marketing, content strategy, and brand positioning.', imageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80', order: 16 },
    { slug: 'certified-supply-chain-management-expert', title: 'Certified Supply Chain Management Expert', category: 'business', description: 'Design and manage end-to-end supply chains with expertise in logistics, procurement, inventory management, and global trade compliance.', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80', order: 17 },
    { slug: 'certified-entrepreneurship-innovation-specialist', title: 'Certified Entrepreneurship & Innovation Specialist', category: 'business', description: 'Transform business ideas into successful ventures. This certification covers startup methodologies, venture financing, and innovation management principles.', imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80', order: 18 },
    // Engineering & Sciences
    { slug: 'certified-renewable-energy-specialist', title: 'Certified Renewable Energy Specialist', category: 'engineering', description: 'Advance your knowledge in solar, wind, and alternative energy technologies. This program prepares professionals to lead the transition to sustainable energy systems.', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80', order: 19 },
    { slug: 'certified-environmental-sustainability-expert', title: 'Certified Environmental Sustainability Expert', category: 'engineering', description: 'Develop strategies for environmental conservation, corporate sustainability reporting, and green business practices aligned with global standards.', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80', order: 20 },
    { slug: 'certified-quality-assurance-engineer', title: 'Certified Quality Assurance Engineer', category: 'engineering', description: 'Implement quality management systems, testing methodologies, and continuous improvement processes that meet international standards like ISO 9001.', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', order: 21 },
    { slug: 'certified-industrial-safety-specialist', title: 'Certified Industrial Safety Specialist', category: 'engineering', description: 'Ensure workplace safety compliance through risk assessment, hazard prevention, and occupational health management following OSHA and international safety guidelines.', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', order: 22 },
    // Research & Academia
    { slug: 'certified-academic-research-specialist', title: 'Certified Academic Research Specialist', category: 'research', description: 'Strengthen your research methodology skills including qualitative and quantitative analysis, literature review, and academic publishing for scholarly contributions.', imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', order: 23 },
    { slug: 'certified-scientific-writing-expert', title: 'Certified Scientific Writing Expert', category: 'research', description: 'Master the art of scientific communication through effective writing for journals, grant proposals, conference presentations, and research reports.', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80', order: 24 },
    { slug: 'certified-public-policy-analyst', title: 'Certified Public Policy Analyst', category: 'research', description: 'Analyze and evaluate public policies using evidence-based frameworks. This program prepares professionals for roles in government, think tanks, and international organizations.', imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80', order: 25 },
    { slug: 'certified-education-leadership-specialist', title: 'Certified Education Leadership Specialist', category: 'research', description: 'Lead educational institutions with expertise in curriculum development, accreditation processes, faculty management, and student success strategies.', imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80', order: 26 },
    // Personal Development & Wellness
    { slug: 'certified-life-coach-wellness-specialist', title: 'Certified Life Coach & Wellness Specialist', category: 'personal', description: 'Help individuals achieve personal and professional goals through structured coaching methodologies, wellness planning, and positive psychology techniques.', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80', order: 27 },
    { slug: 'certified-public-speaking-communication-expert', title: 'Certified Public Speaking & Communication Expert', category: 'personal', description: 'Develop persuasive communication and public speaking skills for professional settings including boardrooms, conferences, and media appearances.', imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80', order: 28 },
    { slug: 'certified-emotional-intelligence-practitioner', title: 'Certified Emotional Intelligence Practitioner', category: 'personal', description: 'Enhance self-awareness, empathy, and social skills through the study of emotional intelligence frameworks and their application in leadership and teamwork.', imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80', order: 29 },
    { slug: 'certified-mindfulness-resilience-coach', title: 'Certified Mindfulness & Resilience Coach', category: 'personal', description: 'Guide individuals and teams toward greater resilience, stress management, and mental clarity using mindfulness practices and evidence-based wellness strategies.', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', order: 30 },
  ];

  for (const cert of certificationsData) {
    await prisma.certification.upsert({
      where: { slug: cert.slug },
      update: {},
      create: cert,
    });
  }
  console.log('✅ Certifications created');

  // 4. News Articles
  const newsData = [
    {
      title: 'EU American University Launches New Partnership with European Business Schools Network',
      slug: 'euau-european-partnership-2025',
      content: `<p>EU American University is proud to announce a groundbreaking partnership with the European Business Schools Network (EBSN), bringing together leading institutions from across the continent to foster academic collaboration and student exchange opportunities.</p>
<p>This strategic alliance will enable our students to access a network of over 50 partner institutions across Europe, providing unparalleled opportunities for international exposure and cross-cultural learning. The partnership includes joint research initiatives, faculty exchange programs, and collaborative curriculum development.</p>
<p>"This partnership represents a significant milestone in our mission to provide globally relevant education," said the EUAU Chancellor. "Our students will now have access to an even broader network of academic resources and professional connections."</p>
<p>The agreement was signed during a ceremony at EU American University's Paris headquarters, attended by representatives from 15 European business schools. Programs under this partnership are expected to begin in the Fall 2025 semester.</p>`,
      excerpt: 'EU American University partners with the European Business Schools Network to offer expanded international opportunities for students and faculty.',
      category: 'Partnerships',
      author: 'EU American University Communications',
      isPublished: true,
      publishedAt: new Date('2025-03-15'),
    },
    {
      title: 'EU American University Ranked Among Top 10 for Management Programs in Europe',
      slug: 'euau-top-10-management-ranking',
      content: `<p>EU American University has been ranked among the top 10 institutions for management and leadership programs in Europe by a leading international education ranking body. This recognition reflects our commitment to academic excellence and our impact on the global business education landscape.</p>
<p>The ranking evaluated institutions based on several key criteria, including program quality, faculty expertise, graduate employability, international diversity, and research output. EU American University scored particularly high in international diversity and graduate outcomes.</p>
<p>"This ranking is a testament to the hard work of our faculty, staff, and students," remarked the Vice Chancellor. "We are committed to continuously improving our programs and providing our students with the skills they need to succeed in a rapidly changing global economy."</p>`,
      excerpt: 'EU American University earns a place among Europe\'s top 10 institutions for management and leadership education.',
      category: 'Rankings',
      author: 'EU American University Communications',
      isPublished: true,
      publishedAt: new Date('2025-02-20'),
    },
    {
      title: 'Honorary Doctorate Recipients Make Global Impact in 2025',
      slug: 'honorary-doctorate-global-impact-2025',
      content: `<p>EU American University celebrates the remarkable achievements of its 2025 Honorary Doctorate recipients, who continue to make significant contributions to business, education, and community development worldwide.</p>
<p>This year's cohort of honorary doctorate recipients includes distinguished leaders from over 30 countries, representing diverse fields including entrepreneurship, nonprofit leadership, public administration, and academic research. Their collective impact spans community development projects, educational initiatives, and innovative business ventures.</p>
<p>"Our honorary doctorate program recognizes individuals who have demonstrated exceptional leadership and made meaningful contributions to their communities and professions," explained the Dean of Academic Affairs. "These recipients exemplify the values of excellence, integrity, and service that EU American University stands for."</p>`,
      excerpt: 'EU American University\'s 2025 Honorary Doctorate recipients demonstrate the program\'s global reach and impact across 30+ countries.',
      category: 'Awards',
      author: 'EU American University Communications',
      isPublished: true,
      publishedAt: new Date('2025-01-10'),
    },
  ];

  for (const news of newsData) {
    await prisma.news.create({ data: news });
  }
  console.log('✅ News articles created');

  // 5. Events — 5 Past + 5 Upcoming
  const eventsData = [
    // Past Events
    {
      title: 'International Leadership Forum 2024',
      slug: 'international-leadership-forum-2024',
      description: 'Over 400 global leaders, academics, and professionals gathered in Paris for two days of thought-provoking discussions on the future of international leadership. The forum featured keynote addresses, panel debates, and networking sessions that explored how organizations can build stronger, more inclusive leadership cultures.',
      date: new Date('2024-10-14T09:00:00'),
      endDate: new Date('2024-10-15T17:00:00'),
      venue: 'Paris, France',
      category: 'Conference',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      attendees: '400+',
      isPublished: true,
    },
    {
      title: 'MBA Alumni Global Networking Gala',
      slug: 'mba-alumni-global-networking-gala-2024',
      description: 'A virtual networking event that brought together 850 MBA alumni from across the globe for an evening of professional connections, career insights, and celebration of shared achievements. The gala featured alumni success stories, industry trend presentations, and breakout rooms organized by sector.',
      date: new Date('2024-06-20T18:00:00'),
      endDate: new Date('2024-06-20T22:00:00'),
      venue: 'Virtual',
      category: 'Networking',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
      attendees: '850',
      isPublished: true,
    },
    {
      title: 'Honorary Doctorate Conferment Ceremony 2024',
      slug: 'honorary-doctorate-conferment-2024',
      description: 'Two hundred distinguished professionals from over 40 countries received their Honorary Doctorate awards at a formal ceremony held at the Paris Grand Hall. The event honored individuals whose lifetime contributions have advanced their fields of expertise and improved their communities.',
      date: new Date('2024-03-05T10:00:00'),
      endDate: new Date('2024-03-05T14:00:00'),
      venue: 'Paris Grand Hall',
      category: 'Ceremony',
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80',
      attendees: '200',
      isPublished: true,
    },
    {
      title: 'EU American Research Symposium 2023',
      slug: 'euau-research-symposium-2023',
      description: 'A gathering of 120 researchers and scholars who presented their latest findings in business management, public administration, and social sciences. The symposium promoted interdisciplinary dialogue and collaboration between academic researchers and industry practitioners.',
      date: new Date('2023-11-18T09:00:00'),
      endDate: new Date('2023-11-18T17:00:00'),
      venue: 'Brussels',
      category: 'Academic',
      imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf18c4e236?w=800&q=80',
      attendees: '120',
      isPublished: true,
    },
    {
      title: 'Annual Convocation 2023',
      slug: 'annual-convocation-2023',
      description: 'The largest gathering in the university\'s recent history, with 1,200 graduates from over 80 countries celebrating their academic achievements. The ceremony included keynote speeches from industry leaders, the conferral of degrees, and special awards for outstanding achievement.',
      date: new Date('2023-09-02T10:00:00'),
      endDate: new Date('2023-09-02T15:00:00'),
      venue: 'Paris',
      category: 'Ceremony',
      imageUrl: 'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=800&q=80',
      attendees: '1200',
      isPublished: true,
    },
    // Upcoming Events
    {
      title: 'Commencement & Honorary Doctorate Ceremony 2027',
      slug: 'commencement-honorary-doctorate-2027',
      description: 'Celebrate academic excellence at EU American University\'s flagship ceremony, honoring all graduating students and distinguished Honorary Doctorate recipients. This formal event will feature keynote addresses from world-renowned leaders, the conferral of degrees across all program levels, and a reception for graduates and their families.',
      date: new Date('2027-06-12T10:00:00'),
      endDate: new Date('2027-06-12T15:00:00'),
      venue: 'EU American Grand Hall, Paris',
      category: 'Ceremony',
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80',
      isPublished: true,
    },
    {
      title: 'Global Business Leadership Summit 2027',
      slug: 'global-business-leadership-summit-2027',
      description: 'A two-day summit bringing together executives, thought leaders, and emerging professionals to explore the future of global business leadership. Sessions will cover digital transformation, sustainable growth strategies, and leadership in times of uncertainty. Available both in-person and virtually.',
      date: new Date('2027-03-08T09:00:00'),
      endDate: new Date('2027-03-09T17:00:00'),
      venue: 'Virtual & Paris Campus',
      category: 'Conference',
      imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
      isPublished: true,
    },
    {
      title: 'MBA & Professional Development Expo 2027',
      slug: 'mba-professional-development-expo-2027',
      description: 'An interactive expo featuring workshops, career coaching sessions, and networking opportunities designed for MBA students and professionals looking to enhance their skills. The event will include employer showcases, resume reviews, and panel discussions on career advancement.',
      date: new Date('2027-01-25T10:00:00'),
      endDate: new Date('2027-01-25T18:00:00'),
      venue: 'London Partnership Hub',
      category: 'Expo',
      imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
      isPublished: true,
    },
    {
      title: 'Alumni Reunion & Awards Night 2026',
      slug: 'alumni-reunion-awards-night-2026',
      description: 'Reconnect with fellow graduates at EU American University\'s annual alumni reunion. The evening will feature award presentations honoring alumni who have made outstanding contributions to their professions and communities, followed by dinner and networking.',
      date: new Date('2026-12-06T18:00:00'),
      endDate: new Date('2026-12-06T23:00:00'),
      venue: 'Paris, France',
      category: 'Networking',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
      isPublished: true,
    },
    {
      title: 'Research & Innovation Conference 2026',
      slug: 'research-innovation-conference-2026',
      description: 'Present and discuss the latest research findings in business, public administration, social work, and management. This conference invites researchers, faculty, and doctoral candidates to share their work and collaborate on interdisciplinary projects.',
      date: new Date('2026-10-10T09:00:00'),
      endDate: new Date('2026-10-10T17:00:00'),
      venue: 'Brussels',
      category: 'Academic',
      imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf18c4e236?w=800&q=80',
      isPublished: true,
    },
  ];

  for (const event of eventsData) {
    await prisma.event.create({ data: event });
  }
  console.log('✅ Events created');

  // 6. FAQ Items
  const faqData = [
    { question: 'What are the admission requirements for the MBA program?', answer: 'Applicants must hold a recognized bachelor\'s degree from an accredited institution. Professional experience is valued but not mandatory for the Bachelor\'s level. For the Master\'s level MBA, a minimum of 2 years of professional experience is preferred. All applicants must submit a completed application form, official transcripts, a statement of purpose, and a current CV/resume.', category: 'Admissions', order: 1 },
    { question: 'How do I apply to EU American University?', answer: 'You can apply online through our application portal at /admissions/apply. Complete all required sections of the application form, upload supporting documents, and submit. You will receive a confirmation email with your unique Application Reference Number once your application is successfully submitted.', category: 'Admissions', order: 2 },
    { question: 'What is the application deadline?', answer: 'EU American University operates on a rolling admissions basis, meaning applications are reviewed as they are received. However, we recommend applying at least 8 weeks before your intended start date to allow sufficient time for processing.', category: 'Admissions', order: 3 },
    { question: 'Can international students apply?', answer: 'Absolutely. EU American University welcomes students from all countries and backgrounds. We have students from over 100 countries. International applicants follow the same application process.', category: 'Admissions', order: 4 },
    { question: 'Are there scholarships available?', answer: 'Yes, EU American University offers several scholarship opportunities including merit-based scholarships, need-based financial aid, and special scholarships for international students. Visit our Scholarships page for details.', category: 'Admissions', order: 5 },
    { question: 'What programs does EU American University offer?', answer: 'EU American University offers Bachelor\'s programs (BBA, BPA, BSW), Master\'s programs (MBA, MPA, MSW), a doctoral program (Doctor of Philosophy — PhD), honorary recognition programs (Honorary Doctorate, Honorary Professorship), and 30 professional certification programs across five categories.', category: 'Programs', order: 1 },
    { question: 'What is the difference between the Bachelor\'s and Master\'s programs?', answer: 'Bachelor\'s programs provide foundational education covering core disciplines. Master\'s programs build on this with advanced coursework in strategic leadership, specialized electives, and capstone research. Master\'s programs are designed for professionals seeking senior leadership roles.', category: 'Programs', order: 2 },
    { question: 'What is an Honorary Doctorate?', answer: 'An Honorary Doctorate (Honoris Causa) is a prestigious academic recognition awarded to individuals who have demonstrated exceptional achievement and significant contributions to their field, community, or society. The program name submitted during application is exactly what appears on your certificate.', category: 'Programs', order: 3 },
    { question: 'Are programs available online?', answer: 'Yes, all EU American University programs are delivered online, making quality education accessible to working professionals worldwide. Our online programs use modern learning platforms with interactive coursework and digital resources.', category: 'Programs', order: 4 },
    { question: 'What are the tuition fees?', answer: 'Tuition fees vary by program. Please contact our admissions office at info@euamericanuniversity.us for the current fee schedule. EU American University strives to make quality education accessible and offers various financial aid options.', category: 'Fees', order: 1 },
    { question: 'Are there payment plans available?', answer: 'Yes, EU American University offers flexible payment plans that allow students to spread their tuition payments over the duration of their program.', category: 'Fees', order: 2 },
    { question: 'Can I get a refund if I withdraw?', answer: 'EU American University has a structured refund policy. Full refund within 14 days of enrollment if coursework has not started, 50% within 30 days, and no refund after 30 days. See our Refund Policy page for details.', category: 'Fees', order: 3 },
    { question: 'How can I verify my student status or certificate?', answer: 'Use our Student Verification page at /student-verification. Enter your Enrollment ID for instant verification.', category: 'Certificates', order: 1 },
    { question: 'How can I verify my enrollment status?', answer: 'Use the Student Verification portal at /student-verification. Enter your Enrollment ID (format: EUAU-YYYY-NNNNN) to view your verified enrollment status and academic details.', category: 'Certificates', order: 2 },
    { question: 'Is my EU American University degree recognized internationally?', answer: 'EU American University is accredited by recognized accreditation bodies and operates with authorization in France. Our degrees are recognized in many countries. We hold IARC and QAHE accreditation and are members of ACBSP, IACBE, and ASIC UK.', category: 'Certificates', order: 3 },
  ];

  for (const faq of faqData) {
    await prisma.fAQ.create({ data: { ...faq, isActive: true } });
  }
  console.log('✅ FAQ items created');

  // 7. Testimonials
  const testimonialData = [
    {
      name: 'Dr. James Okoye',
      program: 'Honorary Doctorate in Business Leadership',
      content: 'Receiving the Honorary Doctorate from EU American University was a defining moment in my career. The recognition validated decades of work in community development across West Africa. I am proud to be part of this distinguished alumni network.',
      isApproved: true,
    },
    {
      name: 'Maria Fernandez',
      program: 'Master of Business Administration (MBA)',
      content: 'The MBA program at EU American University transformed my approach to business leadership. The flexible online format allowed me to continue working while pursuing my degree, and the curriculum was directly applicable to my role as a marketing director.',
      isApproved: true,
    },
    {
      name: 'Prof. Ahmed Al-Rashid',
      program: 'Honorary Professorship',
      content: 'Being awarded an Honorary Professorship by EU American University was an incredible honor that recognized my contributions to education in the Middle East. The process was thorough and professional.',
      isApproved: true,
    },
  ];

  for (const testimonial of testimonialData) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log('✅ Testimonials created');

  // 8. Programs
  const SEED_PROGRAMS = [
    { title: 'Doctor of Philosophy (PhD)', slug: 'doctor-of-philosophy', level: 'phd', description: 'An internationally recognized doctoral program for scholars who wish to advance their field through independent research and academic inquiry.', imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', isActive: true, order: 1 },
    { title: 'Honorary Doctorate (Honoris Causa)', slug: 'honorary-doctorate', level: 'honorary', description: 'A prestigious award recognizing exceptional contributions to society, business, and public service.', imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80', isActive: true, order: 2 },
    { title: 'Honorary Professorship', slug: 'honorary-professorship', level: 'honorary', description: 'Recognizes distinguished educators and scholars whose academic contributions merit the highest institutional recognition.', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', isActive: true, order: 3 },
    { title: 'Master of Business Administration (MBA)', slug: 'mba', level: 'masters', description: 'Our flagship MBA program designed to develop strategic leaders capable of navigating complex global business challenges.', imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80', isActive: true, order: 3 },
    { title: 'Master of Public Administration (MPA)', slug: 'mpa', level: 'masters', description: 'Prepares professionals for leadership roles in government, non-profits, and international organizations.', imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80', isActive: true, order: 4 },
    { title: 'Master of Social Work (MSW)', slug: 'msw', level: 'masters', description: 'Advanced clinical and macro practice skills for addressing complex social issues and promoting community well-being.', imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80', isActive: true, order: 5 },
    { title: 'Bachelor of Business Administration (BBA)', slug: 'bba', level: 'bachelors', description: 'A comprehensive foundation in business principles, management, and entrepreneurship.', imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80', isActive: true, order: 6 },
    { title: 'Bachelor of Public Administration (BPA)', slug: 'bpa', level: 'bachelors', description: 'Essential skills for policy analysis, civic engagement, and public sector management.', imageUrl: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&q=80', isActive: true, order: 7 },
    { title: 'Bachelor of Social Work (BSW)', slug: 'bsw', level: 'bachelors', description: 'Foundational knowledge and field experience for generalist social work practice.', imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c561081788a?w=800&q=80', isActive: true, order: 8 },
    { title: 'Bachelor of Arts in English Language (BAEL)', slug: 'bael', level: 'bachelors', description: 'In-depth study of literature, linguistics, and advanced communication skills for global contexts.', imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', isActive: true, order: 9 },
  ];

  for (const program of SEED_PROGRAMS) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: { title: program.title, description: program.description, imageUrl: program.imageUrl, order: program.order },
      create: program,
    });
  }
  console.log('✅ Programs created');

  // Partners
  const SEED_PARTNERS = [
    { name: 'California University FCE', address: 'California, USA', region: 'North America', country: 'United States', website: 'https://cufce.org', email: 'info@cufce.org', logoUrl: '/partners/cufce.png', isActive: true, order: 1 },
    { name: 'Esep Le Berger', address: 'Benin Republic', region: 'Africa', country: 'Benin', website: 'https://esepleberger.com', email: 'contact@esepleberger.com', logoUrl: '/partners/esep.png', isActive: true, order: 2 },
    { name: 'University of Nicosia', address: 'Nicosia, Cyprus', region: 'Europe', country: 'Cyprus', website: 'https://unic.ac.cy', email: 'info@unic.ac.cy', logoUrl: '/partners/nicosia.png', isActive: true, order: 3 },
    { name: 'Ballsbridge University', address: 'Dominica', region: 'Caribbean', country: 'Dominica', website: 'https://ballsbridgeuniversity.org', email: 'info@ballsbridge.org', logoUrl: '/partners/ballsbridge.png', isActive: true, order: 4 },
    { name: 'City University Cambodia', address: 'Phnom Penh, Cambodia', region: 'Asia', country: 'Cambodia', website: 'https://cityuniversity.edu.kh', email: 'info@cityuniversity.edu.kh', logoUrl: '/partners/cityuniv.png', isActive: true, order: 5 },
    { name: 'Prowess University', address: 'Delaware, USA', region: 'North America', country: 'United States', website: 'https://prowessuniversity.edu', email: 'info@prowessuniversity.edu', logoUrl: '/partners/prowess.png', isActive: true, order: 6 },
  ]

  for (const p of SEED_PARTNERS) {
    await prisma.partner.upsert({
      where: { name: p.name },
      update: p,
      create: p,
    });
  }
  console.log('✅ Partners created');

  // 9. Notices
  const noticeData = [
    { title: 'Fall 2025 Enrollment Now Open', content: 'Applications for the Fall 2025 semester are now being accepted across all programs. Prospective students are encouraged to submit their applications early.', category: 'academic', isActive: true },
    { title: 'Updated Academic Calendar 2025-2026', content: 'The academic calendar for the 2025-2026 academic year has been published. Key dates include the Fall semester start on September 15, 2025.', category: 'academic', isActive: true },
    { title: 'New Professional Certification Programs Available', content: 'EU American University has launched 30 professional certification programs across five categories. Visit the Certifications page to explore all available programs.', category: 'academic', isActive: true },
    { title: 'Student Verification Portal Now Live', content: 'Students can now verify their enrollment status online at /student-verification using their Enrollment ID.', category: 'general', isActive: true },
  ];

  for (const notice of noticeData) {
    await prisma.notice.create({ data: notice });
  }
  console.log('✅ Notices created');

  // 10. Legal Pages
  const legalPages = [
    {
      slug: 'privacy',
      title: 'Privacy Policy',
      content: 'This is managed via the admin CMS. Content is rendered from the /privacy page component.',
    },
    {
      slug: 'terms',
      title: 'Terms of Use',
      content: 'This is managed via the admin CMS. Content is rendered from the /terms page component.',
    },
    {
      slug: 'refund-policy',
      title: 'Refund Policy',
      content: 'This is managed via the admin CMS. Content is rendered from the /refund-policy page component.',
    },
    {
      slug: 'cookie-policy',
      title: 'Cookie Policy',
      content: 'This is managed via the admin CMS. Content is rendered from the /cookie-policy page component.',
    },
  ];

  for (const page of legalPages) {
    await prisma.legalPage.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    });
  }
  console.log('✅ Legal pages created');

  // 11. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'site_settings' },
    update: {},
    create: {
      id: 'site_settings',
      data: JSON.stringify({
        siteName: "EU American University",
        tagline: "A leader's choice in education",
        contactEmail: "info@euamericanuniversity.us",
        contactPhone: "+1 505 520 3303",
        address: "11 rue Magdebourg, Paris, France 75016",
        socialMedia: {
          facebook: "https://facebook.com/euamericanuniversity",
          twitter: "https://twitter.com/euamericanuniv",
          linkedin: "https://linkedin.com/school/euamericanuniversity",
          instagram: "https://instagram.com/euamericanuniversity",
          youtube: "https://youtube.com/euamericanuniversity"
        },
        seoDefaults: {
          titleTemplate: "%s | EU American University",
          defaultDescription: "EU American University offers globally recognized programs in Business Administration, Public Administration, Social Work, Honorary Doctorate, and Professional Certifications."
        },
        maintenanceMode: false
      }),
    },
  });
  console.log('✅ Site settings created');

  // 12. System Settings (Maintenance Mode)
  await prisma.systemSettings.upsert({
    where: { id: 'system_settings' },
    update: {},
    create: {
      id: 'system_settings',
      isMaintenanceMode: false,
      maintenanceMessage: "Website is currently under maintenance. We'll be back shortly.",
    },
  });
  console.log('✅ System settings created');

  console.log('🎉 Database seeded successfully!');
}

export async function seedDatabase() {
  await main()
}

if (require.main === module) {
  main()
    .catch((e) => {
      console.error('❌ Seed error:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
