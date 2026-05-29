import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CreditCard, Clock, HelpCircle } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = { title: 'Financial Aid', description: 'Financial aid options, payment plans, and tuition assistance at AMU.' };

export default function FinancialAidPage() {
  return (
    <>
      <PageHero
        title="Financial Aid"
        subtitle="AMU is committed to making quality education accessible. Explore our financial aid options."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Financial Aid' }]}
      />
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="card p-6 text-center"><CreditCard className="w-8 h-8 text-primary mx-auto mb-3" /><h3 className="font-heading text-base font-bold mb-2">Payment Plans</h3><p className="text-sm text-foreground-secondary">Flexible installment options to spread tuition payments over your program duration.</p></div>
            <div className="card p-6 text-center"><Clock className="w-8 h-8 text-primary mx-auto mb-3" /><h3 className="font-heading text-base font-bold mb-2">Deferred Payment</h3><p className="text-sm text-foreground-secondary">Select programs offer deferred payment options for qualifying students.</p></div>
            <div className="card p-6 text-center"><HelpCircle className="w-8 h-8 text-primary mx-auto mb-3" /><h3 className="font-heading text-base font-bold mb-2">Financial Counseling</h3><p className="text-sm text-foreground-secondary">Our finance office provides personalized guidance on funding your education.</p></div>
          </div>
          <div className="card p-8">
            <h2 className="font-heading text-xl font-bold mb-4">How to Apply for Financial Aid</h2>
            <p className="text-foreground-secondary mb-4">Financial aid is assessed as part of the application process. When submitting your application, indicate your interest in financial assistance. Our team will review your eligibility based on academic merit and financial circumstances.</p>
            <p className="text-foreground-secondary mb-6">For specific questions about fees and payment options, please contact our finance office at <a href="mailto:finance@euamericanuniversity.us" className="text-primary font-medium">finance@euamericanuniversity.us</a>.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/admissions/scholarships" className="btn-ghost gap-1">View Scholarships <ArrowRight size={14} /></Link>
              <Link href="/contact" className="btn-primary gap-1">Contact Finance Office <ArrowRight size={14} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
