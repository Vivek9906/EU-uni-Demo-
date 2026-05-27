import type { Metadata } from 'next';
import { Quote } from 'lucide-react';

export const metadata: Metadata = { title: 'Testimonials', description: 'Hear from AMU graduates about their experience.' };

const testimonials = [
  { name: 'Dr. James Okoye', program: 'Honorary Doctorate in Business Leadership', content: 'Receiving the Honorary Doctorate from AMU was a defining moment in my career. The recognition validated decades of work in community development across West Africa. AMU\'s commitment to recognizing global leaders is truly commendable.' },
  { name: 'Maria Fernandez', program: 'Master of Business Administration (MBA)', content: 'The MBA program at AMU transformed my approach to business leadership. The flexible online format allowed me to continue working while pursuing my degree, and the curriculum was directly applicable to my role as a marketing director.' },
  { name: 'Prof. Ahmed Al-Rashid', program: 'Honorary Professorship', content: 'Being awarded an Honorary Professorship by AMU recognized my contributions to education in the Middle East. The process was thorough and professional. AMU\'s dedication to academic excellence sets it apart.' },
];

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main"><span className="section-label">Student Voices</span><h1 className="text-4xl font-heading font-bold mb-4">Testimonials</h1><p className="text-lg text-foreground-secondary">Hear from AMU graduates about their transformative experiences.</p></div>
      </section>
      <section className="section-padding">
        <div className="container-main max-w-4xl space-y-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-8">
              <Quote className="w-8 h-8 text-accent/30 mb-4" />
              <p className="text-foreground-secondary leading-relaxed mb-6 italic">&ldquo;{t.content}&rdquo;</p>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"><span className="text-sm font-bold text-primary">{t.name.split(' ').map(n => n[0]).join('')}</span></div>
                <div><div className="font-semibold">{t.name}</div><div className="text-xs text-foreground-muted">{t.program}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
