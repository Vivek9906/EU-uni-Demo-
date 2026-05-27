import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, CheckCircle, Star, Globe, Users } from 'lucide-react';

export const metadata: Metadata = { title: 'Honorary Doctorate', description: 'Be recognized for a lifetime of achievement. Learn about AMU\'s Honorary Doctorate (Honoris Causa) program.' };

const faqs = [
  { q: 'Who is eligible for an Honorary Doctorate?', a: 'Individuals who have demonstrated exceptional leadership for at least 10 years and made significant contributions to their field, community, or society.' },
  { q: 'What does the certificate look like?', a: 'The certificate is an official AMU document featuring the holder\'s name, the program title (exactly as submitted during application), the date of conferral, and AMU\'s official seal.' },
  { q: 'How long does the process take?', a: 'From application submission to conferral, the typical timeline is 4-8 weeks depending on the completeness of your application and the committee review schedule.' },
  { q: 'Is the Honorary Doctorate recognized internationally?', a: 'Yes. AMU\'s Honorary Doctorate is backed by our IARC, QAHE accreditation and ACBSP, IACBE, ASIC UK memberships. Each certificate includes a unique verification ID.' },
  { q: 'Can I nominate someone else?', a: 'Yes. Nominations from third parties are welcome. The nominee will be contacted to complete the formal application process if they accept the nomination.' },
];

export default function HonoraryDoctoratePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main text-center">
          <Award className="w-14 h-14 text-accent mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">Be Recognized for a Lifetime of Achievement</h1>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto mb-8">
            The AMU Honorary Doctorate (Honoris Causa) program recognizes exceptional leaders who have made outstanding contributions to their profession, community, and the world.
          </p>
          <Link href="/admissions/apply" className="btn-primary gap-2">Apply for Honorary Doctorate <ArrowRight size={16} /></Link>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div><h2 className="section-title mb-4">What is an Honorary Doctorate?</h2><p className="text-foreground-secondary leading-relaxed mb-4">An Honorary Doctorate is the highest form of academic recognition, conferred upon individuals whose professional achievements and societal contributions merit distinction at the doctoral level. Unlike traditional doctoral programs, it is awarded based on proven accomplishment rather than coursework.</p><p className="text-foreground-secondary leading-relaxed">AMU&apos;s Honorary Doctorate carries the academic title and is verifiable through our official certificate verification system, providing credentialed recognition of your lifetime achievements.</p></div>
            <div className="space-y-4">
              <h2 className="section-title mb-4">What&apos;s Included</h2>
              {[{icon: Star, title: 'Official Certificate', desc: 'Personalized certificate with your exact program name as submitted'}, {icon: Award, title: 'Chancellor\'s Letter', desc: 'Official letter from the AMU Chancellor acknowledging your achievement'}, {icon: Globe, title: 'Alumni Network Listing', desc: 'Listed among AMU\'s distinguished alumni community'}, {icon: Users, title: 'Verification Access', desc: 'Unique certificate ID for online verification by employers and institutions'}].map((item) => (
                <div key={item.title} className="flex items-start gap-3"><item.icon className="w-5 h-5 text-accent shrink-0 mt-0.5" /><div><span className="text-sm font-medium">{item.title}</span><p className="text-xs text-foreground-muted">{item.desc}</p></div></div>
              ))}
            </div>
          </div>
          <h2 className="section-title mb-6 text-center">Eligibility Criteria</h2>
          <div className="card p-8 mb-16">
            <ul className="space-y-3">{['Demonstrated exceptional leadership in professional field for 10+ years', 'Significant contributions to community development, education, or industry', 'Recognized standing through awards, publications, or peer recognition', 'Commitment to ethical leadership and social responsibility', 'Track record of mentorship, volunteerism, or philanthropic activity'].map((item) => (<li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />{item}</li>))}</ul>
          </div>
          <h2 className="section-title mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4 mb-12">
            {faqs.map((faq) => (<div key={faq.q} className="card p-6"><h3 className="font-heading text-base font-bold mb-2">{faq.q}</h3><p className="text-sm text-foreground-secondary">{faq.a}</p></div>))}
          </div>
          <div className="text-center bg-primary text-white rounded-card p-10">
            <h2 className="font-heading text-2xl font-bold mb-4">Ready to Be Recognized?</h2>
            <p className="text-white/70 mb-6 max-w-lg mx-auto">Join a global community of distinguished leaders. Your program name will appear exactly as submitted on your official certificate.</p>
            <Link href="/admissions/apply" className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-card font-semibold transition-colors inline-flex items-center gap-2">Apply Now <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
