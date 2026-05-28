'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Award, Globe } from 'lucide-react';

type Category = 'all' | 'technology' | 'business' | 'engineering' | 'research' | 'personal' | 'bundle';

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'technology', label: 'Technology & IT' },
  { key: 'business', label: 'Business & Management' },
  { key: 'engineering', label: 'Engineering' },
  { key: 'research', label: 'Research & Academia' },
  { key: 'personal', label: 'Personal Development' },
];

const categoryColors: Record<string, string> = {
  technology: 'bg-blue-100 text-blue-700',
  business: 'bg-green-100 text-green-700',
  engineering: 'bg-orange-100 text-orange-700',
  research: 'bg-purple-100 text-purple-700',
  personal: 'bg-pink-100 text-pink-700',
  bundle: 'bg-accent/10 text-accent',
};

const certifications = [
  // Bundle
  { slug: 'complete-professional-bundle', title: 'The Complete Professional Certification Bundle', category: 'bundle', description: 'Master all 25 professional domains in one comprehensive package.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&q=80', isBundle: true },
  // Technology & IT
  { slug: 'certified-ai-specialist', title: 'Certified Artificial Intelligence Specialist', category: 'technology', description: 'Gain advanced expertise in AI systems, machine learning, and neural networks.', imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80' },
  { slug: 'certified-advanced-data-science-expert', title: 'Certified Advanced Data Science Expert', category: 'technology', description: 'Master advanced data analytics, statistical modeling, and big data technologies.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80' },
  { slug: 'certified-data-science-practitioner', title: 'Certified Data Science Practitioner', category: 'technology', description: 'Build a strong foundation in data science fundamentals.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
  { slug: 'certified-cloud-computing-specialist', title: 'Certified Cloud Computing Specialist', category: 'technology', description: 'Develop proficiency in cloud architecture and multi-cloud management.', imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80' },
  { slug: 'certified-blockchain-specialist', title: 'Certified Blockchain Specialist', category: 'technology', description: 'Understand distributed ledger technology and smart contracts.', imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80' },
  { slug: 'certified-advanced-blockchain-developer', title: 'Certified Advanced Blockchain Developer', category: 'technology', description: 'Advanced smart contract development and DeFi protocols.', imageUrl: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=800&q=80' },
  { slug: 'certified-iot-specialist', title: 'Certified Internet of Things Specialist', category: 'technology', description: 'Design, deploy, and manage IoT ecosystems.', imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80' },
  { slug: 'certified-cyber-defense-specialist', title: 'Certified Cyber Defense Specialist', category: 'technology', description: 'Protect organizations with advanced cybersecurity techniques.', imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80' },
  { slug: 'certified-cyber-law-policy-expert', title: 'Certified Cyber Law and Policy Expert', category: 'technology', description: 'Navigate the intersection of technology and law.', imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80' },
  // Business & Management
  { slug: 'certified-business-strategist', title: 'Certified Business Strategist', category: 'business', description: 'Develop strategic thinking to drive organizational growth.', imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80' },
  { slug: 'certified-project-management-professional', title: 'Certified Project Management Professional', category: 'business', description: 'Master project planning, execution, and stakeholder management.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80' },
  { slug: 'certified-operations-management-expert', title: 'Certified Operations Management Expert', category: 'business', description: 'Optimize business processes and supply chain operations.', imageUrl: 'https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&q=80' },
  { slug: 'certified-leadership-excellence-specialist', title: 'Certified Leadership Excellence Specialist', category: 'business', description: 'Build transformative leadership skills.', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80' },
  { slug: 'certified-hr-manager', title: 'Certified Human Resources Manager', category: 'business', description: 'Expertise in talent acquisition and employee development.', imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80' },
  { slug: 'certified-financial-risk-manager', title: 'Certified Financial Risk Manager', category: 'business', description: 'Identify, analyze, and mitigate financial risks.', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80' },
  { slug: 'certified-marketing-brand-strategist', title: 'Certified Marketing & Brand Strategist', category: 'business', description: 'Create compelling brand narratives and marketing strategies.', imageUrl: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80' },
  { slug: 'certified-supply-chain-management-expert', title: 'Certified Supply Chain Management Expert', category: 'business', description: 'Design and manage end-to-end supply chains.', imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80' },
  { slug: 'certified-entrepreneurship-innovation-specialist', title: 'Certified Entrepreneurship & Innovation Specialist', category: 'business', description: 'Transform business ideas into successful ventures.', imageUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80' },
  // Engineering
  { slug: 'certified-renewable-energy-specialist', title: 'Certified Renewable Energy Specialist', category: 'engineering', description: 'Advance your knowledge in sustainable energy systems.', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80' },
  { slug: 'certified-environmental-sustainability-expert', title: 'Certified Environmental Sustainability Expert', category: 'engineering', description: 'Develop strategies for environmental conservation.', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80' },
  { slug: 'certified-quality-assurance-engineer', title: 'Certified Quality Assurance Engineer', category: 'engineering', description: 'Implement quality management systems meeting ISO standards.', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80' },
  { slug: 'certified-industrial-safety-specialist', title: 'Certified Industrial Safety Specialist', category: 'engineering', description: 'Ensure workplace safety compliance and hazard prevention.', imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80' },
  // Research
  { slug: 'certified-academic-research-specialist', title: 'Certified Academic Research Specialist', category: 'research', description: 'Strengthen your research methodology skills.', imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80' },
  { slug: 'certified-scientific-writing-expert', title: 'Certified Scientific Writing Expert', category: 'research', description: 'Master scientific communication and academic publishing.', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80' },
  { slug: 'certified-public-policy-analyst', title: 'Certified Public Policy Analyst', category: 'research', description: 'Analyze and evaluate public policies using evidence-based frameworks.', imageUrl: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80' },
  { slug: 'certified-education-leadership-specialist', title: 'Certified Education Leadership Specialist', category: 'research', description: 'Lead educational institutions with expertise.', imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80' },
  // Personal Development
  { slug: 'certified-life-coach-wellness-specialist', title: 'Certified Life Coach & Wellness Specialist', category: 'personal', description: 'Help individuals achieve personal and professional goals.', imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80' },
  { slug: 'certified-public-speaking-communication-expert', title: 'Certified Public Speaking & Communication Expert', category: 'personal', description: 'Develop persuasive communication and public speaking skills.', imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80' },
  { slug: 'certified-emotional-intelligence-practitioner', title: 'Certified Emotional Intelligence Practitioner', category: 'personal', description: 'Enhance self-awareness, empathy, and social skills.', imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80' },
  { slug: 'certified-mindfulness-resilience-coach', title: 'Certified Mindfulness & Resilience Coach', category: 'personal', description: 'Guide individuals toward greater resilience and mental clarity.', imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80' },
];

export default function CertificationsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCerts = useMemo(() => {
    return certifications.filter((cert) => {
      const matchesCategory = activeCategory === 'all' || cert.category === activeCategory;
      const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const bundle = certifications.find(c => c.isBundle);
  const regularCerts = filteredCerts.filter(c => !c.isBundle);

  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main">
          <div className="max-w-3xl">
            <span className="section-label">Professional Development</span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">Professional Certifications</h1>
            <p className="text-lg text-foreground-secondary leading-relaxed">
              Advance your career with 30 industry-relevant certification programs from EU American University. Each program is designed to provide focused, practical skills recognized by employers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Bundle Banner */}
      {bundle && activeCategory === 'all' && !searchQuery && (
        <section className="bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-main py-10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Award className="w-12 h-12 text-accent shrink-0" />
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-heading text-2xl font-bold mb-2">{bundle.title}</h2>
                <p className="text-white/70">Master all 25 professional domains in one comprehensive package — the most cost-effective way to build a world-class skill portfolio.</p>
              </div>
              <Link href={`/certifications/${bundle.slug}/enroll`} className="btn-accent shrink-0 gap-2">
                Enroll Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container-main">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
              <input
                type="text"
                placeholder="Search certifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
                id="cert-search"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                    activeCategory === cat.key
                      ? 'bg-primary text-white'
                      : 'bg-background-subtle text-foreground-secondary hover:bg-primary/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-foreground-muted mb-6">{regularCerts.length} certifications found</p>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularCerts.map((cert) => (
              <div key={cert.slug} className="bg-background-card border border-border rounded-card shadow-sm transition-all duration-200 hover:shadow-md overflow-hidden group">
                <div className="relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${cert.imageUrl})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${categoryColors[cert.category] || 'bg-gray-100 text-gray-700'}`}>
                      {cert.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-foreground-secondary leading-relaxed mb-4 line-clamp-2">{cert.description}</p>
                  <Link href={`/certifications/${cert.slug}/enroll`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-light transition-colors">
                    Enroll Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {regularCerts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground-muted">No certifications match your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
