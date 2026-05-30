'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { applicationSchema, type ApplicationFormData } from '@/lib/validations/application';
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

function CertificationApplyForm() {
  const searchParams = useSearchParams();
  const certTitle = searchParams.get('cert') || '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; referenceNumber?: string; error?: string } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    mode: 'onBlur',
    defaultValues: {
      programLevel: 'certification',
      programName: certTitle,
      modeOfStudy: 'Online',
      intendedStart: 'Immediate',
      highestQualification: 'High School',
      institutionName: 'N/A',
      graduationYear: 'N/A',
    },
  });

  useEffect(() => {
    if (certTitle) {
      setValue('programName', certTitle);
    }
  }, [certTitle, setValue]);

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitResult({ success: true, referenceNumber: result.referenceNumber });
      } else {
        setSubmitResult({ success: false, error: result.error || 'Submission failed. Please try again.' });
      }
    } catch {
      setSubmitResult({ success: false, error: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult?.success) {
    return (
      <section className="section-padding">
        <div className="container-main max-w-2xl text-center">
          <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
          <h1 className="text-3xl font-heading font-bold mb-4">Enrollment Submitted</h1>
          <p className="text-foreground-secondary mb-6">
            Thank you for enrolling in {certTitle}. Your application is being processed.
          </p>
          <div className="bg-background-subtle border border-border rounded-card p-6 mb-8">
            <p className="text-sm text-foreground-muted mb-1">Your Enrollment Reference Number</p>
            <p className="text-3xl font-heading font-bold text-primary">{submitResult.referenceNumber}</p>
          </div>
          <p className="text-sm text-foreground-secondary">
            A confirmation email has been sent to your email address. You will receive access instructions shortly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        title="Certification Enrollment"
        subtitle="Advance Your Career"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Certifications', href: '/certifications' },
          { label: 'Enrollment' },
        ]}
      />

      <section className="section-padding">
        <div className="container-main max-w-3xl">
          {submitResult?.error && (
            <div className="bg-error/5 border border-error/20 rounded-card p-4 mb-6 flex items-start gap-3">
              <AlertCircle size={18} className="text-error shrink-0 mt-0.5" />
              <p className="text-sm text-error">{submitResult.error}</p>
            </div>
          )}

          <div className="bg-white border border-border rounded-card p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold mb-6 border-b border-border pb-4">Enrollment Details</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-primary/5 p-4 rounded-lg mb-6 border border-primary/10">
                <label className="block text-sm font-medium text-primary mb-1">Selected Certification</label>
                <input 
                  type="text" 
                  {...register('programName')} 
                  readOnly
                  className="w-full bg-transparent font-bold text-lg focus:outline-none" 
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Legal Name *</label>
                  <input {...register('fullName')} className="input-field" placeholder="Enter your full name" />
                  {errors.fullName && <p className="text-sm text-error mt-1">{errors.fullName.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Date of Birth *</label>
                  <input type="date" {...register('dateOfBirth')} className="input-field" />
                  {errors.dateOfBirth && <p className="text-sm text-error mt-1">{errors.dateOfBirth.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email Address *</label>
                  <input type="email" {...register('email')} className="input-field" placeholder="your@email.com" />
                  {errors.email && <p className="text-sm text-error mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone Number *</label>
                  <input type="tel" {...register('phone')} className="input-field" placeholder="+1 234 567 8900" />
                  {errors.phone && <p className="text-sm text-error mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Nationality *</label>
                  <input {...register('nationality')} className="input-field" placeholder="Enter nationality" />
                  {errors.nationality && <p className="text-sm text-error mt-1">{errors.nationality.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Passport / ID Number *</label>
                  <input {...register('passportNumber')} className="input-field" placeholder="ID Number" />
                  {errors.passportNumber && <p className="text-sm text-error mt-1">{errors.passportNumber.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Gender *</label>
                <div className="flex gap-4">
                  {['Male', 'Female', 'Prefer not to say'].map((g) => (
                    <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" value={g} {...register('gender')} className="w-4 h-4 text-primary" />
                      {g}
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="text-sm text-error mt-1">{errors.gender.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5">Billing / Current Address *</label>
                <textarea {...register('currentAddress')} className="input-field min-h-[100px]" placeholder="Full address" />
                {errors.currentAddress && <p className="text-sm text-error mt-1">{errors.currentAddress.message}</p>}
              </div>

              <div className="bg-background-subtle p-6 rounded-card space-y-4">
                <label className="flex items-start gap-3">
                  <input type="checkbox" {...register('confirmAccuracy')} className="mt-1 w-4 h-4 text-primary" />
                  <span className="text-sm">I confirm that all information provided is accurate and true.</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" {...register('agreeTerms')} className="mt-1 w-4 h-4 text-primary" />
                  <span className="text-sm">I agree to the Terms of Service and Privacy Policy.</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" {...register('consentContact')} className="mt-1 w-4 h-4 text-primary" />
                  <span className="text-sm">I consent to being contacted regarding this enrollment.</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 text-lg justify-center mt-6"
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin w-5 h-5 mr-2" /> Processing...</>
                ) : (
                  <>Complete Enrollment <ArrowRight className="w-5 h-5 ml-2" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default function CertificationApplyPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>}>
      <CertificationApplyForm />
    </Suspense>
  );
}
