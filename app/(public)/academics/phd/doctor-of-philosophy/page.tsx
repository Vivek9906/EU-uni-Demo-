import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Globe, BookOpen, Award, Lightbulb, GraduationCap, HeartPulse } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Doctor of Philosophy (PhD)',
  description:
    'Advance the boundaries of knowledge through EU American University’s Doctor of Philosophy (PhD) program with fully online research pathways and global academic recognition.',
};

const specializations = [
  {
    icon: '💼',
    title: 'Doctor of Philosophy in Business Administration',
    description:
      'Advanced research in organizational strategy, leadership, and global business systems.',
  },
  {
    icon: '🏛️',
    title: 'Doctor of Philosophy in Public Administration',
    description:
      'Scholarly inquiry into governance, policy analysis, and public sector management.',
  },
  {
    icon: '🌐',
    title: 'Doctor of Philosophy in Social Sciences',
    description:
      'Cross-disciplinary research exploring human behavior, social structures, and cultural dynamics.',
  },
  {
    icon: '💡',
    title: 'Doctor of Philosophy in Technology & Innovation',
    description:
      'Research-driven exploration of emerging technologies, digital transformation, and innovation ecosystems.',
  },
  {
    icon: '📚',
    title: 'Doctor of Philosophy in Education Leadership',
    description:
      'Advanced study in curriculum theory, institutional leadership, and educational policy.',
  },
  {
    icon: '🏥',
    title: 'Doctor of Philosophy in Health Sciences',
    description:
      'Academic research in public health, healthcare policy, and biomedical sciences.',
  },
];

const highlights = [
  {
    icon: Globe,
    title: '100% Online',
    description: 'Study from anywhere in the world on your own schedule.',
  },
  {
    icon: BookOpen,
    title: 'Research-Focused',
    description: 'Develop an original thesis with faculty guidance.',
  },
  {
    icon: Award,
    title: 'Globally Recognized',
    description: 'Credential accepted by institutions in 100+ countries.',
  },
];

const requirements = [
  'Minimum Master’s degree or equivalent from an accredited institution',
  'Academic transcripts from all prior institutions',
  'Statement of research interest (500–1000 words)',
  'Two letters of recommendation',
  'Curriculum vitae or professional résumé',
  'English proficiency for non-native speakers',
];

const outcomes = [
  'Independently designed and executed original research',
  'Scholarly publications and academic writing proficiency',
  'Teaching and lecturing capabilities at university level',
  'Global professional recognition as a doctoral degree holder',
  'Access to EU American’s international alumni and research network',
];

export default function DoctorOfPhilosophyPage() {
  return (
    <>
      <PageHero
        label="Doctoral Programs"
        title="Doctor of Philosophy (PhD)"
        description="Advance the boundaries of knowledge through rigorous research and academic excellence."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Academics', href: '/academics' },
          { label: 'PhD', href: '/academics/phd' },
          { label: 'Doctor of Philosophy' },
        ]}
      />

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <h2 className="section-title mb-5">What is the EU American PhD Program?</h2>
          <div className="space-y-4 text-foreground-secondary leading-relaxed">
            <p>
              The Doctor of Philosophy (PhD) at EU American University is designed for individuals who are committed to deepening their expertise through independent research, critical analysis, and scholarly contribution. This program bridges academic theory with real-world application across a range of disciplines.
            </p>
            <p>
              Whether you are a working professional seeking to advance your academic standing, or a scholar pursuing a recognized doctoral credential, our PhD program offers a structured, fully online pathway to achieving your research and career goals.
            </p>
            <p>
              Graduates of the EU American PhD program join a distinguished community of researchers, educators, and thought leaders who have shaped industries and academic institutions across the globe.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background-subtle">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="section-label">PhD Specializations</span>
            <h2 className="section-title">Available Specializations</h2>
            <p className="section-subtitle mx-auto">
              Explore research pathways aligned with academic leadership, innovation, and global impact.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specializations.map((item) => (
              <article key={item.title} className="card p-6 group hover:border-[#E09900]/30 transition-colors">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#E09900]/20 bg-[#FFF8E6] text-2xl">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-foreground-secondary">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="section-label">Program Highlights</span>
            <h2 className="section-title">Why Choose the PhD Program?</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.title} className="card p-6 text-center">
                <item.icon className="mx-auto mb-4 h-10 w-10 text-[#E09900]" />
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-secondary">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background-subtle">
        <div className="container-main">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="card p-7">
              <div className="mb-4 flex items-center gap-3">
                <GraduationCap className="h-7 w-7 text-accent" />
                <h2 className="text-2xl font-bold">Admission Requirements</h2>
              </div>
              <ul className="space-y-3">
                {requirements.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <div className="mb-4 flex items-center gap-3">
                <Lightbulb className="h-7 w-7 text-accent" />
                <h2 className="text-2xl font-bold">What You'll Achieve</h2>
              </div>
              <ul className="space-y-3">
                {outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <CheckCircle size={16} className="mt-0.5 shrink-0 text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#0F2347] text-white">
        <div className="container-main text-center max-w-3xl">
          <h2 className="mb-4 text-3xl font-extrabold text-[#E09900]">Begin Your Doctoral Journey</h2>
          <p className="mb-8 text-base leading-relaxed text-white/85">
            Applications for the PhD program are reviewed on a rolling basis.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admissions/apply" className="btn-primary gap-2">
              Apply Now <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-card border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
