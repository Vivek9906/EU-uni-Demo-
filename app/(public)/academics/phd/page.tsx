import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Award, CheckCircle, AlertCircle, Star, Globe } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'PhD Programs — Honorary Doctorate & Professorship',
  description: 'AMU Honorary Doctorate (Honoris Causa) and Honorary Professorship programs. Recognition for lifetime achievement and contributions.',
};

export default function PhdPage() {
  return (
    <>
      <PageHero
        title="Honorary Doctorate & Professorship"
        subtitle="AMU&apos;s doctoral programs recognize individuals who have demonstrated exceptional leadership, professional achievement, and meaningful contributions to their communities and fields of expertise."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Honorary Doctorate & Professorship' }]}
      />

      {/* Honorary Doctorate */}
      <section className="section-padding" id="honorary-doctorate">
        <div className="container-main max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-accent" />
            <h2 className="section-title mb-0">Honorary Doctorate (Honoris Causa)</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed mb-6">
            The Honorary Doctorate from American Management University is a prestigious academic recognition awarded to individuals who have demonstrated exceptional achievement and significant contributions to their field, community, or society at large. This distinction recognizes a lifetime of professional excellence and service.
          </p>

          <h3 className="font-heading text-xl font-bold mb-4">Eligibility Criteria</h3>
          <div className="card p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Demonstrated exceptional leadership in their professional field for at least 10 years</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Significant and measurable contributions to community development, education, or industry</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Recognized standing in their profession through awards, publications, or peer recognition</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Commitment to ethical leadership and social responsibility</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />A track record of mentorship, volunteerism, or philanthropic activity</li>
            </ul>
          </div>

          <h3 className="font-heading text-xl font-bold mb-4">What&apos;s Included</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="card p-4 text-center">
              <Star className="w-6 h-6 text-accent mx-auto mb-2" />
              <span className="text-sm font-medium">Official Certificate</span>
              <p className="text-xs text-foreground-muted mt-1">Personalized with your exact program name</p>
            </div>
            <div className="card p-4 text-center">
              <Award className="w-6 h-6 text-accent mx-auto mb-2" />
              <span className="text-sm font-medium">Official Letter</span>
              <p className="text-xs text-foreground-muted mt-1">From the AMU Chancellor</p>
            </div>
            <div className="card p-4 text-center">
              <Globe className="w-6 h-6 text-accent mx-auto mb-2" />
              <span className="text-sm font-medium">Alumni Listing</span>
              <p className="text-xs text-foreground-muted mt-1">Listed on AMU alumni page</p>
            </div>
          </div>

          <h3 className="font-heading text-xl font-bold mb-4">Application Process</h3>
          <div className="space-y-4 mb-8">
            {[
              { step: '1', title: 'Submit Application', desc: 'Complete the online application form with all required documents and your statement of purpose.' },
              { step: '2', title: 'Committee Review', desc: 'Your application is reviewed by the AMU Academic Committee, which evaluates your qualifications and contributions.' },
              { step: '3', title: 'Notification', desc: 'You will be notified of the committee\'s decision via email. Successful candidates will receive details about the conferral process.' },
              { step: '4', title: 'Conferral', desc: 'Upon acceptance, your Honorary Doctorate certificate is prepared and issued with your exact program name as submitted.' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">{item.step}</div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-foreground-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Honorary Professorship */}
      <section className="section-padding" id="professorship">
        <div className="container-main max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-8 h-8 text-primary" />
            <h2 className="section-title mb-0">Honorary Professorship</h2>
          </div>
          <p className="text-foreground-secondary leading-relaxed mb-6">
            The Honorary Professorship is an academic distinction that recognizes individuals who have made outstanding contributions to education, research, or their professional field. Recipients gain the academic title and are listed among AMU&apos;s distinguished faculty.
          </p>

          <h3 className="font-heading text-xl font-bold mb-4">Eligibility & Nomination</h3>
          <div className="card p-6 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Distinguished record of academic or professional achievement</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Contributions to education, research, or knowledge advancement in their field</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Recognized expertise evidenced by publications, presentations, or professional practice</li>
              <li className="flex items-start gap-2 text-sm text-foreground-secondary"><CheckCircle size={14} className="text-success shrink-0 mt-1" />Commitment to academic integrity and ethical standards</li>
            </ul>
          </div>

          <h3 className="font-heading text-xl font-bold mb-4">Academic Recognition</h3>
          <p className="text-foreground-secondary leading-relaxed mb-6">
            Honorary Professors are recognized globally and are listed among AMU&apos;s distinguished academic community. The title confers academic prestige and is verifiable through AMU&apos;s official certificate verification system.
          </p>
        </div>
      </section>

      {/* Certificate Note + CTA */}
      <section className="section-padding bg-background-subtle">
        <div className="container-main max-w-2xl">
          <div className="bg-accent/5 border border-accent/20 rounded-card p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <h3 className="font-heading text-base font-bold mb-1">Important: Certificate Program Name</h3>
                <p className="text-sm text-foreground-secondary">
                  The program name you select during your application — whether <strong>&quot;Honorary Doctorate (Honoris Causa)&quot;</strong> or <strong>&quot;Honorary Professorship&quot;</strong> — is <strong>exactly</strong> what will be printed on your official certificate. Please ensure accuracy when submitting your application.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link href="/admissions/apply" className="btn-primary gap-2">Apply Now <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
