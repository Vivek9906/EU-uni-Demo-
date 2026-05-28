'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Award } from 'lucide-react';

export default function HonoraryCtaBanner() {
  return (
    <section className="section-padding bg-gradient-to-r from-primary to-primary-dark text-white">
      <div className="container-main text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Award className="w-12 h-12 text-accent mx-auto mb-6" />
          <h2 className="font-heading text-3xl lg:text-4xl font-bold mb-4">
            Earn Recognition. Earn a Legacy.
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            The EU American University Honorary Doctorate and Professorship programs recognize
            exceptional individuals who have made outstanding contributions to
            their fields and communities worldwide.
          </p>
          <Link
            href="/honorary-doctorate"
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
