import type { Metadata } from 'next';
import { Heart, Users, Trophy, Home } from 'lucide-react';

export const metadata: Metadata = { title: 'Campus Life', description: 'Student life, clubs, sports, housing, and international student support at AMU.' };

export default function CampusLifePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main"><span className="section-label">Student Experience</span><h1 className="text-4xl font-heading font-bold mb-4">Campus Life</h1><p className="text-lg text-foreground-secondary">Life at AMU extends beyond the classroom, offering a vibrant and supportive community.</p></div>
      </section>
      <section className="section-padding">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[{icon: Users, title: 'Clubs & Organizations', desc: 'Join diverse student organizations including the Business Leaders Club, International Students Association, Entrepreneurship Society, and Community Service Network.'}, {icon: Trophy, title: 'Sports & Wellness', desc: 'AMU promotes holistic well-being through sports facilities, fitness programs, and wellness initiatives for both on-campus and online students.'}, {icon: Home, title: 'Housing Information', desc: 'AMU assists on-campus students with finding suitable housing near our Paris campus through partnerships with local housing providers.'}, {icon: Heart, title: 'International Student Support', desc: 'Dedicated support for international students including visa guidance, cultural orientation, language assistance, and peer mentoring programs.'}].map((item) => (
              <div key={item.title} className="card p-6">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
