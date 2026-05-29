'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';

export default function HonoraryCtaBanner() {
  return (
    <section
      className="section-padding"
      style={{
        background: 'linear-gradient(135deg, #0F2347 0%, #1B3A6B 50%, #162F58 100%)',
      }}
    >
      <div className="container-main text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Award className="w-12 h-12 mx-auto mb-6" style={{ color: '#E09900' }} />
          <h2
            className="font-heading text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: '#E09900' }}
          >
            Earn Recognition. Earn a Legacy.
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            The EU American University Honorary Doctorate and Professorship programs recognize
            exceptional individuals who have made outstanding contributions to
            their fields and communities worldwide.
          </p>
          <Link
            href="/academics/honorary"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-card transition-all hover:shadow-lg"
          >
            Discover Honorary Programs
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

