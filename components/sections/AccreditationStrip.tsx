'use client';

import { motion } from 'framer-motion';

const accreditations = [
  { name: 'IARC', fullName: 'International Accreditation & Recognition Council' },
  { name: 'QAHE', fullName: 'Quality Assurance in Higher Education' },
  { name: 'ACBSP', fullName: 'Accreditation Council for Business Schools & Programs' },
  { name: 'IACBE', fullName: 'International Accreditation Council for Business Education' },
  { name: 'ASIC UK', fullName: 'Accreditation Service for International Schools, Colleges & Universities' },
  { name: 'French Ministry', fullName: "Approved by the French Ministry's Rector of the Paris Academy" },
];

export default function AccreditationStrip() {
  return (
    <section className="py-12 border-y border-border">
      <div className="container-main">
        <div className="text-center mb-8">
          <span className="section-label">Accreditations & Memberships</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {accreditations.map((acc, index) => (
            <motion.div
              key={acc.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-16 h-16 bg-primary/5 rounded-xl flex items-center justify-center mb-3">
                <span className="text-xs font-body font-bold text-primary">
                  {acc.name}
                </span>
              </div>
              <span className="text-[10px] text-foreground-muted leading-tight">
                {acc.fullName}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
