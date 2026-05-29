import type { Metadata } from 'next';
import { Mail, BookOpen } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Faculty', description: 'Meet the distinguished faculty of EU American University.' };

const faculty = [
  { name: 'Dr. Eleanor Whitfield', designation: 'Professor & Dean of Business', department: 'Business Administration', specialization: 'Strategic Management & Corporate Governance', bio: 'Dr. Whitfield brings over 25 years of academic and industry experience in strategic management, having served as a consultant to Fortune 500 companies.' },
  { name: 'Prof. Marcus Chen', designation: 'Associate Professor of Finance', department: 'Business Administration', specialization: 'International Finance & Risk Management', bio: 'Prof. Chen is a distinguished scholar in international finance with positions at INSEAD and NUS, specializing in emerging market risk assessment.' },
  { name: 'Dr. Amara Okonkwo', designation: 'Professor of Leadership Studies', department: 'Leadership & Management', specialization: 'Organizational Behavior & Leadership Development', bio: 'Dr. Okonkwo is an internationally recognized authority on leadership development with a PhD from Yale University.' },
  { name: 'Dr. Heinrich Müller', designation: 'Professor of Economics', department: 'Business Administration', specialization: 'Macroeconomics & Public Policy', bio: 'Dr. Müller previously served as an economic advisor to the European Commission with over 20 years of experience.' },
  { name: 'Dr. Sophia Laurent', designation: 'Associate Professor of Marketing', department: 'Business Administration', specialization: 'Digital Marketing & Consumer Behavior', bio: 'Dr. Laurent spent a decade at L\'Oréal and Google before her academic career, now a leading researcher in digital marketing.' },
];

export default function FacultyPage() {
  return (
    <>
      <PageHero
        title="Faculty & Staff"
        subtitle="EU American University has some of the finest and highly qualified faculty-practitioners, ensuring our students learn the skills to excel."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Faculty & Staff' }]}
      />
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((f) => (
              <div key={f.name} className="card p-6 hover:border-primary/20">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-primary">{f.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="font-heading text-lg font-bold">{f.name}</h3>
                <p className="text-sm text-accent font-accent font-medium mb-1">{f.designation}</p>
                <p className="text-xs text-foreground-muted mb-3">{f.department} · {f.specialization}</p>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-4">{f.bio}</p>
                <div className="flex gap-3">
                  <a href={`mailto:${f.name.split(' ')[0].toLowerCase()[0]}.${f.name.split(' ').pop()?.toLowerCase()}@euamericanuniversity.us`} className="text-xs text-primary flex items-center gap-1"><Mail size={12} />Email</a>
                  <span className="text-xs text-primary flex items-center gap-1"><BookOpen size={12} />Publications</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
