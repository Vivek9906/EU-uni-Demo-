import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Target, Heart, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about EU American University, our mission, vision, and core values.',
};

const values = [
  {
    icon: ShieldCheck,
    title: 'Integrity',
    description: 'We uphold the highest ethical standards in our academic programs and institutional operations.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for exceptional quality in teaching, research, and service to our global community.',
  },
  {
    icon: Heart,
    title: 'Inclusivity',
    description: 'We foster a welcoming environment that respects diverse perspectives and backgrounds.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace creative solutions and forward-thinking approaches to education and global challenges.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main">
          <div className="max-w-3xl">
            <span className="section-label">About Us</span>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
              Our Identity & Purpose
            </h1>
            <p className="text-lg text-foreground-secondary leading-relaxed">
              Discover the mission, vision, and core values that drive EU American University to deliver exceptional education worldwide.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding border-b border-border">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end">
                <div className="p-8">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-4 inline-block">
                    <p className="text-white font-heading text-xl font-bold">Empowering Leaders</p>
                    <p className="text-white/80 text-sm">Since our founding</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="section-title mb-6">Our Mission</h2>
              <p className="text-foreground-secondary leading-relaxed mb-8">
                The mission of EU American University is to deliver accessible, high-quality education that equips individuals with the knowledge, skills, and global perspective needed to lead with purpose. We are committed to fostering academic excellence, innovation, and ethical leadership in a diverse and inclusive learning environment.
              </p>

              <h2 className="section-title mb-6">Our Vision</h2>
              <p className="text-foreground-secondary leading-relaxed">
                We envision EU American University as a premier global institution recognized for transforming lives through education. We aim to be at the forefront of innovative learning, empowering our graduates to drive positive change and address complex challenges in an interconnected world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background-subtle border-b border-border">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">Our Core Values</h2>
            <p className="text-foreground-secondary">
              These fundamental principles guide our decisions, actions, and interactions within our academic community and beyond.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-6 rounded-xl border border-border shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main text-center">
          <h2 className="section-title mb-6">Join Our Global Community</h2>
          <p className="text-lg text-foreground-secondary max-w-2xl mx-auto mb-8">
            Ready to take the next step in your educational journey? Explore our programs and discover how EU American University can help you achieve your goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/academics" className="btn-primary gap-2">
              Explore Programs <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact Admissions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
