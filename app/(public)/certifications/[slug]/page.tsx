import { notFound } from 'next/navigation';
import { getCertificationBySlug } from '@/lib/data';
import { PageHero } from '@/components/ui/PageHero';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Award, CheckCircle } from 'lucide-react';

export default async function CertificationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const certification = await getCertificationBySlug(params.slug);

  if (!certification) {
    notFound();
  }

  return (
    <>
      <PageHero
        title={certification.title}
        subtitle={certification.category.toUpperCase()}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Certifications', href: '/certifications' },
          { label: certification.title },
        ]}
      />

      <section className="section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-background-subtle rounded-card overflow-hidden">
                <div
                  className="h-[300px] md:h-[400px] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${certification.imageUrl})` }}
                />
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold mb-4">
                  About this Certification
                </h2>
                <div className="prose prose-lg text-foreground-secondary">
                  <p>{certification.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Comprehensive Curriculum</h3>
                    <p className="text-sm text-foreground-secondary">
                      Expert-designed modules tailored to modern industry standards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Self-Paced Learning</h3>
                    <p className="text-sm text-foreground-secondary">
                      Study at your own pace from anywhere in the world.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Award className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Recognized Credential</h3>
                    <p className="text-sm text-foreground-secondary">
                      Earn a globally recognized certification upon completion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">Instant Verification</h3>
                    <p className="text-sm text-foreground-secondary">
                      Shareable digital credential that employers can verify.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar / Enrollment */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white border border-border rounded-card p-6 shadow-md">
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary mb-4">
                    {certification.isBundle ? 'Professional Bundle' : 'Professional Certification'}
                  </span>
                  <h3 className="font-heading text-xl font-bold mb-2">
                    {certification.title}
                  </h3>
                  <p className="text-sm text-foreground-secondary mb-6">
                    Enroll now to gain immediate access to this program and enhance your career prospects.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm border-b border-border pb-3">
                    <span className="text-foreground-muted">Format</span>
                    <span className="font-medium">100% Online</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-border pb-3">
                    <span className="text-foreground-muted">Level</span>
                    <span className="font-medium">Professional</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-border pb-3">
                    <span className="text-foreground-muted">Access</span>
                    <span className="font-medium">Lifetime</span>
                  </div>
                </div>

                <Link
                  href={`/certifications/apply?cert=${encodeURIComponent(certification.title)}`}
                  className="btn-primary w-full gap-2 justify-center py-4"
                >
                  Enroll Now <ArrowRight size={18} />
                </Link>

                <p className="text-xs text-center text-foreground-muted mt-4">
                  Secure checkout process. Immediate access after enrollment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
