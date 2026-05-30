'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const enrollmentSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  message: z.string().optional(),
});

type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

const certificationsList = [
  { slug: 'complete-professional-bundle', title: 'The Complete Professional Certification Bundle' },
  { slug: 'certified-ai-specialist', title: 'Certified Artificial Intelligence Specialist' },
  { slug: 'certified-advanced-data-science-expert', title: 'Certified Advanced Data Science Expert' },
  { slug: 'certified-data-science-practitioner', title: 'Certified Data Science Practitioner' },
  { slug: 'certified-cloud-computing-specialist', title: 'Certified Cloud Computing Specialist' },
  { slug: 'certified-blockchain-specialist', title: 'Certified Blockchain Specialist' },
  { slug: 'certified-advanced-blockchain-developer', title: 'Certified Advanced Blockchain Developer' },
  { slug: 'certified-iot-specialist', title: 'Certified Internet of Things Specialist' },
  { slug: 'certified-cyber-defense-specialist', title: 'Certified Cyber Defense Specialist' },
  { slug: 'certified-cyber-law-policy-expert', title: 'Certified Cyber Law and Policy Expert' },
  { slug: 'certified-business-strategist', title: 'Certified Business Strategist' },
  { slug: 'certified-project-management-professional', title: 'Certified Project Management Professional' },
  { slug: 'certified-operations-management-expert', title: 'Certified Operations Management Expert' },
  { slug: 'certified-leadership-excellence-specialist', title: 'Certified Leadership Excellence Specialist' },
  { slug: 'certified-hr-manager', title: 'Certified Human Resources Manager' },
  { slug: 'certified-financial-risk-manager', title: 'Certified Financial Risk Manager' },
  { slug: 'certified-marketing-brand-strategist', title: 'Certified Marketing & Brand Strategist' },
  { slug: 'certified-supply-chain-management-expert', title: 'Certified Supply Chain Management Expert' },
  { slug: 'certified-entrepreneurship-innovation-specialist', title: 'Certified Entrepreneurship & Innovation Specialist' },
  { slug: 'certified-renewable-energy-specialist', title: 'Certified Renewable Energy Specialist' },
  { slug: 'certified-environmental-sustainability-expert', title: 'Certified Environmental Sustainability Expert' },
  { slug: 'certified-quality-assurance-engineer', title: 'Certified Quality Assurance Engineer' },
  { slug: 'certified-industrial-safety-specialist', title: 'Certified Industrial Safety Specialist' },
  { slug: 'certified-academic-research-specialist', title: 'Certified Academic Research Specialist' },
  { slug: 'certified-scientific-writing-expert', title: 'Certified Scientific Writing Expert' },
  { slug: 'certified-public-policy-analyst', title: 'Certified Public Policy Analyst' },
  { slug: 'certified-education-leadership-specialist', title: 'Certified Education Leadership Specialist' },
  { slug: 'certified-life-coach-wellness-specialist', title: 'Certified Life Coach & Wellness Specialist' },
  { slug: 'certified-public-speaking-communication-expert', title: 'Certified Public Speaking & Communication Expert' },
  { slug: 'certified-emotional-intelligence-practitioner', title: 'Certified Emotional Intelligence Practitioner' },
  { slug: 'certified-mindfulness-resilience-coach', title: 'Certified Mindfulness & Resilience Coach' },
];

export default function CertificationEnrollPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const certTitle = certificationsList.find((c) => c.slug === params.slug)?.title || 'Certification Program';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentSchema),
  });

  const onSubmit = async (data: EnrollmentFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/certifications/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          certificationSlug: params.slug,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Failed to submit enrollment request');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="section-padding min-h-[60vh] flex items-center justify-center bg-background-subtle">
        <div className="container-main max-w-lg text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-success" />
          </div>
          <h1 className="font-heading text-3xl font-bold mb-4">Enrollment Request Received!</h1>
          <p className="text-foreground-secondary mb-8">
            Thank you for your interest in {certTitle}. Our admissions team will review your request and contact you shortly with the next steps for completing your enrollment.
          </p>
          <Link href="/certifications" className="btn-primary">
            Back to Certifications
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-background-subtle min-h-screen">
      <div className="container-main max-w-2xl">
        <div className="mb-8">
          <Link href="/certifications" className="text-sm text-primary hover:text-primary-light inline-flex items-center gap-1 mb-4">
            <ArrowLeft size={14} /> Back to Certifications
          </Link>
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground">
            Enroll in Certification
          </h1>
          <p className="text-foreground-secondary mt-2">
            Complete the form below to begin the enrollment process.
          </p>
        </div>

        <div className="card p-6 md:p-8">
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-md flex items-start gap-3 text-error">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Selected Certification
              </label>
              <input
                type="text"
                className="input-field bg-gray-50 text-gray-500 cursor-not-allowed font-medium"
                value={certTitle}
                readOnly
                disabled
              />
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
                Full Name as it should appear on certificate *
              </label>
              <input
                {...register('fullName')}
                id="fullName"
                type="text"
                className={`input-field ${errors.fullName ? 'border-error focus:border-error focus:ring-error/20' : ''}`}
                placeholder="e.g. John Smith"
              />
              {errors.fullName && <p className="mt-1.5 text-xs text-error">{errors.fullName.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email Address *
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                className={`input-field ${errors.email ? 'border-error focus:border-error focus:ring-error/20' : ''}`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1.5 text-xs text-error">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                Phone Number *
              </label>
              <input
                {...register('phone')}
                id="phone"
                type="tel"
                className={`input-field ${errors.phone ? 'border-error focus:border-error focus:ring-error/20' : ''}`}
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && <p className="mt-1.5 text-xs text-error">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                Additional Information (Optional)
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={4}
                className="input-field resize-none"
                placeholder="Any questions or specific requirements?"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Enrollment Request'
                )}
              </button>
            </div>
            
            <p className="text-xs text-foreground-muted text-center mt-4">
              By submitting this form, you agree to our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
