import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Globe, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Master's — MBA",
  description: "Master of Business Administration at AMU. An advanced program for aspiring leaders combining strategic management and global business strategy.",
};

const curriculum = [
  { semester: 'Semester 1', courses: ['Strategic Leadership & Management', 'Financial Management & Analysis', 'Marketing Strategy in a Global Economy', 'Research Methods for Business'] },
  { semester: 'Semester 2', courses: ['Global Business Strategy', 'Organizational Design & Change', 'Digital Transformation & Innovation', 'Business Ethics & Corporate Governance'] },
  { semester: 'Semester 3', courses: ['Entrepreneurship & Venture Development', 'Supply Chain & Operations Strategy', 'Elective: Specialization Module I', 'Elective: Specialization Module II'] },
  { semester: 'Semester 4', courses: ['MBA Capstone Project', 'Executive Leadership Seminar', 'Strategic Consulting Project'] },
];

const outcomes = ['Chief Executive Officer', 'Managing Director', 'Strategy Consultant', 'VP of Operations', 'Chief Marketing Officer', 'Chief Financial Officer', 'Entrepreneur', 'Management Consultant'];

export default function MastersPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main">
          <div className="max-w-3xl">
            <Link href="/academics" className="text-sm text-primary hover:text-primary-light mb-4 inline-flex items-center gap-1">← Back to Programs</Link>
            <span className="badge-primary mb-3 block w-fit">Master&apos;s Program</span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Master of Business Administration (MBA)
            </h1>
            <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
              An advanced graduate program designed for ambitious professionals seeking to accelerate their careers into senior leadership positions through strategic thinking, global business acumen, and executive decision-making skills.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm"><Clock size={16} className="text-primary" /> 1-2 Years</div>
              <div className="flex items-center gap-2 text-sm"><Globe size={16} className="text-primary" /> Online / Hybrid / On-Campus</div>
              <div className="flex items-center gap-2 text-sm"><BookOpen size={16} className="text-primary" /> 60 Credits</div>
            </div>
            <Link href="/admissions/apply" className="btn-primary gap-2">Apply Now <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-6">Program Overview</h2>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            The MBA at American Management University is designed for professionals who aspire to lead organizations at the highest level. Our curriculum combines rigorous academic theory with practical executive education, emphasizing strategic leadership, innovation, and global business perspectives.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            Students engage with case studies from leading global organizations, participate in executive seminars, and develop a comprehensive capstone project that demonstrates their ability to apply strategic thinking to real-world business challenges.
          </p>

          <h2 className="section-title mb-6">Core Curriculum</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {curriculum.map((sem) => (
              <div key={sem.semester} className="card p-6">
                <h3 className="font-heading text-lg font-bold mb-4 text-primary">{sem.semester}</h3>
                <ul className="space-y-2">
                  {sem.courses.map((course) => (
                    <li key={course} className="flex items-start gap-2 text-sm text-foreground-secondary">
                      <CheckCircle size={14} className="text-success shrink-0 mt-1" />{course}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="section-title mb-6">Career Outcomes</h2>
          <div className="flex flex-wrap gap-2 mb-12">
            {outcomes.map((o) => (<span key={o} className="badge-primary">{o}</span>))}
          </div>

          <h2 className="section-title mb-6">Admission Requirements</h2>
          <div className="card p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Recognized bachelor&apos;s degree from an accredited institution</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Minimum 2 years of professional experience (preferred)</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Official academic transcripts</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Current CV/resume</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Statement of purpose (200–1000 words)</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Professional or academic reference</li>
            </ul>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-card p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading text-base font-bold mb-1">Certificate Note</h3>
                <p className="text-sm text-foreground-secondary">
                  The program name <strong>&quot;Master of Business Administration (MBA)&quot;</strong> is exactly what will be printed on your official certificate. Please ensure this matches your intended program when applying.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/admissions/apply" className="btn-primary gap-2">Start Your Application <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
