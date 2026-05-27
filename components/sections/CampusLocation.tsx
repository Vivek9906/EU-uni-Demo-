'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function CampusLocation() {
  return (
    <section className="section-padding bg-background-subtle">
      <div className="container-main">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Our Location</span>
            <h2 className="section-title">Visit Our Campus</h2>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Main Campus */}
            <div className="card p-6">
              <h3 className="font-heading text-lg font-bold mb-4">
                Global Headquarters & Main Campus
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-foreground-secondary">
                  <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                  11 rue Magdebourg, Paris, France 75016
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                  <Phone size={16} className="text-primary shrink-0" />
                  +33 1 89 37 00 04
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                  <Mail size={16} className="text-primary shrink-0" />
                  info@amu.edu.eu
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                  <Clock size={16} className="text-primary shrink-0" />
                  Mon–Fri: 9:00 AM – 5:00 PM (CET)
                </div>
              </div>
            </div>

            {/* US Office */}
            <div className="card p-6">
              <h3 className="font-heading text-lg font-bold mb-4">
                US Regional Contact Office
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-foreground-secondary">
                  <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                  1126 W. Foothill Blvd. #165, Upland, California 91786
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground-secondary">
                  <Phone size={16} className="text-primary shrink-0" />
                  +1-909-280-0112
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full min-h-[400px]"
          >
            <div className="w-full h-full rounded-card overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999!2d2.2875!3d48.8648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fef846de9e7%3A0x2a42!2s11+Rue+de+Magdebourg%2C+75016+Paris!5e0!3m2!1sen!2sfr!4v1700000000000!5m2!1sen!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AMU Campus Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
