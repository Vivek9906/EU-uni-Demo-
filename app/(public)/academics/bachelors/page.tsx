import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Globe, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Bachelor's — MBA (BBA)",
  description: "Bachelor of Business Administration at AMU. A comprehensive undergraduate program developing foundational business skills with a global perspective.",
};

const curriculum = [
  { semester: 'Year 1', courses: ['Principles of Management', 'Business Communication', 'Microeconomics', 'Financial Accounting', 'Introduction to Marketing'] },
  { semester: 'Year 2', courses: ['Organizational Behavior', 'Business Statistics', 'Macroeconomics', 'Managerial Accounting', 'Business Law & Ethics'] },
  { semester: 'Year 3', courses: ['Strategic Management', 'International Business', 'Human Resource Management', 'Operations Management', 'Entrepreneurship'] },
  { semester: 'Year 4', courses: ['Leadership & Change Management', 'Business Research Methods', 'Capstone Project', 'Elective I', 'Elective II'] },
];

const outcomes = ['Business Manager', 'Marketing Coordinator', 'Financial Analyst', 'Operations Supervisor', 'Entrepreneur', 'HR Specialist', 'Project Manager', 'Business Consultant'];

export default function BachelorsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main">
          <div className="max-w-3xl">
            <Link href="/academics" className="text-sm text-primary hover:text-primary-light mb-4 inline-flex items-center gap-1">
              ← Back to Programs
            </Link>
            <span className="badge-primary mb-3 block w-fit">Bachelor&apos;s Program</span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Bachelor of Business Administration (BBA)
            </h1>
            <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
              A comprehensive undergraduate program designed to develop foundational business acumen, leadership skills, and a global perspective essential for success in today&apos;s dynamic business environment.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm"><Clock size={16} className="text-primary" /> 3-4 Years</div>
              <div className="flex items-center gap-2 text-sm"><Globe size={16} className="text-primary" /> Online / Hybrid / On-Campus</div>
              <div className="flex items-center gap-2 text-sm"><BookOpen size={16} className="text-primary" /> 120 Credits</div>
            </div>
            <Link href="/admissions/apply" className="btn-primary gap-2">Apply Now <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-6">Program Overview</h2>
          <p className="text-foreground-secondary leading-relaxed mb-4">
            The Bachelor of Business Administration (BBA) at AMU provides students with a solid foundation in business principles and management practices. The program integrates theoretical knowledge with practical application, preparing graduates for leadership roles in diverse organizational settings.
          </p>
          <p className="text-foreground-secondary leading-relaxed mb-8">
            Students will develop critical thinking, analytical, and communication skills while gaining expertise in key functional areas including finance, marketing, operations, and human resources. The curriculum is designed to foster ethical leadership and a global mindset.
          </p>

          <h2 className="section-title mb-6">Core Curriculum</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {curriculum.map((sem) => (
              <div key={sem.semester} className="card p-6">
                <h3 className="font-heading text-lg font-bold mb-4 text-primary">{sem.semester}</h3>
                <ul className="space-y-2">
                  {sem.courses.map((course) => (
                    <li key={course} className="flex items-start gap-2 text-sm text-foreground-secondary">
                      <CheckCircle size={14} className="text-success shrink-0 mt-1" />
                      {course}
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
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />High school diploma or equivalent qualification</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Official transcripts from previous education</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Statement of purpose (200–1000 words)</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Valid passport or national ID</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Recent passport-size photograph</li>
            </ul>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-card p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading text-base font-bold mb-1">Certificate Note</h3>
                <p className="text-sm text-foreground-secondary">
                  The program name <strong>&quot;Bachelor of Business Administration (BBA)&quot;</strong> is exactly what will be printed on your official certificate. Please ensure this matches your intended program when applying.
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
