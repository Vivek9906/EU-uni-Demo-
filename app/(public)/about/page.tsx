import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, MapPin, Users, Globe, BookOpen, Award, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about American Management University\'s history, mission, vision, and leadership. A legacy of academic excellence since 1924.',
};

const timeline = [
  { year: '1924', title: 'Foundation', description: 'American Management University established with a vision to provide accessible, quality higher education.' },
  { year: '1960', title: 'International Expansion', description: 'AMU begins accepting international students, broadening its global reach and cultural diversity.' },
  { year: '1985', title: 'European Operations', description: 'Establishment of European operations center, strengthening AMU\'s presence in the EU.' },
  { year: '2000', title: 'Online Programs Launch', description: 'Introduction of online learning platforms, making education accessible to working professionals worldwide.' },
  { year: '2010', title: 'Global Headquarters in Paris', description: 'AMU establishes its global headquarters at 11 rue Magdebourg, Paris, France.' },
  { year: '2020', title: 'Accreditation Milestones', description: 'Achieves IARC, QAHE accreditation and ACBSP, IACBE, ASIC UK memberships.' },
  { year: '2025', title: 'A Century of Excellence', description: 'Celebrating 100+ years of shaping global leaders across 100+ countries.' },
];

const leadership = [
  { name: 'Board of Chancellors', role: 'University Governance', description: 'The Board of Chancellors provides strategic oversight and governance for AMU, ensuring the university fulfills its mission of academic excellence and global accessibility.' },
  { name: 'Office of the Vice Chancellor', role: 'Academic Leadership', description: 'The Vice Chancellor leads the academic mission of the university, overseeing curriculum development, faculty affairs, and academic quality assurance.' },
  { name: 'Office of Academic Affairs', role: 'Program Administration', description: 'The Office of Academic Affairs manages program delivery, student academic services, and ensures the quality and relevance of all academic programs.' },
  { name: 'Office of Admissions', role: 'Student Enrollment', description: 'The Office of Admissions handles application processing, enrollment management, and provides guidance to prospective students worldwide.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main">
          <div className="max-w-3xl">
            <span className="section-label">About AMU</span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              A Century of Shaping Global Leaders
            </h1>
            <p className="text-lg text-foreground-secondary leading-relaxed">
              American Management University is a nonprofit institution committed to providing globally accessible, career-relevant education that prepares ethical leaders for today&apos;s interconnected world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                To provide globally accessible, career-relevant education that prepares ethical leaders for today&apos;s interconnected world. We offer flexible learning pathways — both coursework and validation-based — to meet the diverse needs of working professionals across business, leadership, education, and management.
              </p>
            </div>
            <div className="card p-8">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                A world where education is accessible, flexible, and transformative. We envision empowering individuals from all backgrounds to become ethical leaders in business, government, education, and beyond, redefining what higher education means in the 21st century.
              </p>
            </div>
            <div className="card p-8">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">Our Values</h3>
              <p className="text-sm text-foreground-secondary leading-relaxed">
                Academic excellence, integrity, global accessibility, innovation, and service. These core values guide every decision we make, from curriculum design to student support, ensuring that AMU remains a leader in international education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background-subtle">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">University History</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={item.year} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xs font-accent font-bold shrink-0">
                    {item.year}
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/20 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="font-heading text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="section-label">Leadership</span>
            <h2 className="section-title">University Governance</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {leadership.map((leader) => (
              <div key={leader.name} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold">{leader.name}</h3>
                    <span className="text-xs text-accent font-accent font-medium">{leader.role}</span>
                    <p className="text-sm text-foreground-secondary mt-2">{leader.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white">
        <div className="container-main text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Join thousands of graduates from 100+ countries who chose AMU to advance their careers and make a global impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admissions/apply" className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-card font-semibold transition-colors inline-flex items-center gap-2">
              Apply Now <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="border border-white/20 hover:bg-white/10 text-white px-8 py-3 rounded-card font-semibold transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
