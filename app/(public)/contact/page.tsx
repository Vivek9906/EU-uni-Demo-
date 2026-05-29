'use client';

import { useState } from 'react';
import type { Metadata } from 'next';
import { Send, Loader2, CheckCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (res.ok) { setResult({ success: true, message: 'Thank you! Your message has been received. We will respond within 2-3 business days.' }); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }
      else { setResult({ success: false, message: data.error || 'Failed to send. Please try again.' }); }
    } catch { setResult({ success: false, message: 'Network error. Please try again.' }); }
    finally { setIsSubmitting(false); }
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have questions? We&apos;re here to help. Reach out to our team."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
      />
      <section className="section-padding">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">Send Us a Message</h2>
              {result && (
                <div className={`p-4 rounded-card mb-6 ${result.success ? 'bg-success/5 border border-success/20 text-success' : 'bg-error/5 border border-error/20 text-error'}`}>
                  <div className="flex items-start gap-2 text-sm"><CheckCircle size={16} className="shrink-0 mt-0.5" />{result.message}</div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">Name *</label><input id="contact-name" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="input-field" placeholder="Your name" /></div>
                  <div><label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">Email *</label><input id="contact-email" type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="input-field" placeholder="your@email.com" /></div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label htmlFor="contact-phone" className="block text-sm font-medium mb-1.5">Phone</label><input id="contact-phone" type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="input-field" placeholder="+1 234 567 8900" /></div>
                  <div><label htmlFor="contact-subject" className="block text-sm font-medium mb-1.5">Subject *</label><input id="contact-subject" required value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} className="input-field" placeholder="How can we help?" /></div>
                </div>
                <div><label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">Message *</label><textarea id="contact-message" required rows={5} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="input-field" placeholder="Your message..." /></div>
                <button type="submit" disabled={isSubmitting} className="btn-primary gap-2 w-full sm:w-auto disabled:opacity-60">
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <h2 className="font-heading text-2xl font-bold mb-6">Contact Information</h2>
              <div className="card p-6">
                <h3 className="font-heading text-base font-bold mb-4">Global Headquarters</h3>
                <div className="space-y-3 text-sm text-foreground-secondary">
                  <div className="flex items-start gap-3"><MapPin size={16} className="text-primary shrink-0 mt-0.5" />11 rue Magdebourg, Paris, France 75016</div>
                  <div className="flex items-center gap-3"><Phone size={16} className="text-primary shrink-0" />+33 1 89 37 00 04</div>
                  <div className="flex items-center gap-3"><Mail size={16} className="text-primary shrink-0" />info@euamericanuniversity.us</div>
                  <div className="flex items-center gap-3"><Clock size={16} className="text-primary shrink-0" />Mon–Fri: 9:00 AM – 5:00 PM (CET)</div>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-heading text-base font-bold mb-4">US Regional Office</h3>
                <div className="space-y-3 text-sm text-foreground-secondary">
                  <div className="flex items-start gap-3"><MapPin size={16} className="text-primary shrink-0 mt-0.5" />1126 W. Foothill Blvd. #165, Upland, CA 91786</div>
                  <div className="flex items-center gap-3"><Phone size={16} className="text-primary shrink-0" />+1-909-280-0112</div>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-heading text-base font-bold mb-4">Department Contacts</h3>
                <div className="space-y-2 text-sm text-foreground-secondary">
                  <p><strong>Admissions:</strong> admissions@euamericanuniversity.us</p>
                  <p><strong>Academic Affairs:</strong> academics@euamericanuniversity.us</p>
                  <p><strong>Finance:</strong> finance@euamericanuniversity.us</p>
                  <p><strong>Student Records:</strong> records@euamericanuniversity.us</p>
                </div>
              </div>
              <div className="rounded-card overflow-hidden border border-border h-64">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999!2d2.2875!3d48.8648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fef846de9e7%3A0x2a42!2s11+Rue+de+Magdebourg%2C+75016+Paris!5e0!3m2!1sen!2sfr!4v1700000000000!5m2!1sen!2sfr" width="100%" height="100%" style={{border: 0}} allowFullScreen loading="lazy" title="EU American University Location" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
