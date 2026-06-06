'use client';

import { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';

const PARTNERSHIP_TYPES = [
  'Training Center',
  'Academic Alliance',
  'Franchise / License',
  'Recruitment Partner',
  'Corporate Programs',
  'Research & Innovation',
  'Other',
];

const BENEFITS = [
  {
    icon: '🎓',
    title: 'Accredited Programs',
    desc: 'Deliver internationally recognized credentials trusted by employers worldwide',
  },
  {
    icon: '💰',
    title: 'Revenue Sharing',
    desc: 'Competitive revenue models with proven returns for our global partners',
  },
  {
    icon: '🌐',
    title: 'Global Network',
    desc: 'Access to our international ecosystem of partner institutions and students',
  },
  {
    icon: '🤝',
    title: 'Dedicated Support',
    desc: 'A dedicated partnership manager supports you from launch through growth',
  },
];

export default function PartnerWithUsPage() {
  const [form, setForm] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    country: '',
    partnershipType: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.organization) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/partner-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <PageHero
        label="COLLABORATE WITH US"
        title="Partner With EU American University"
        description="Join our growing global network. We offer flexible partnership models designed to help you deliver world-class education in your region."
      />

      {/* Benefits */}
      <section className="section-padding bg-background-subtle">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="bg-background-card rounded-card border border-border p-6"
                style={{ borderTop: '4px solid #E09900' }}
              >
                <div className="text-[28px] mb-3">{b.icon}</div>
                <h3 className="font-heading font-extrabold text-[15px] text-foreground mb-2">
                  {b.title}
                </h3>
                <p className="text-foreground-secondary text-[13.5px] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Enquiry Form */}
          <div className="max-w-[680px] mx-auto">
            <div className="bg-background-card rounded-xl border border-border p-8 md:p-10 shadow-sm">
              <h2 className="font-heading text-[22px] font-extrabold text-foreground mb-1.5">
                Partnership Enquiry
              </h2>
              <p className="text-foreground-secondary text-sm mb-7">
                Fill in your details and we&apos;ll be in touch within 2
                business days.
              </p>

              {status === 'sent' ? (
                <div className="text-center py-10">
                  <div className="text-5xl mb-4">✅</div>
                  <h3
                    className="font-heading font-extrabold text-lg mb-2.5"
                    style={{ color: '#1B3A6B' }}
                  >
                    Enquiry Received!
                  </h3>
                  <p className="text-foreground-secondary">
                    Thank you for your interest. Our partnerships team will
                    contact you within 2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground-secondary mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-foreground bg-white outline-none transition-colors focus:border-primary"
                        required
                        placeholder="John Smith"
                        value={form.name}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground-secondary mb-1.5">
                        Organization <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-foreground bg-white outline-none transition-colors focus:border-primary"
                        required
                        placeholder="Your institution name"
                        value={form.organization}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            organization: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground-secondary mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-foreground bg-white outline-none transition-colors focus:border-primary"
                        type="email"
                        required
                        placeholder="john@institution.edu"
                        value={form.email}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground-secondary mb-1.5">
                        Phone
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-foreground bg-white outline-none transition-colors focus:border-primary"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, phone: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-foreground-secondary mb-1.5">
                        Country
                      </label>
                      <input
                        className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-foreground bg-white outline-none transition-colors focus:border-primary"
                        placeholder="United Kingdom"
                        value={form.country}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, country: e.target.value }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground-secondary mb-1.5">
                        Partnership Type
                      </label>
                      <select
                        className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-foreground bg-white outline-none transition-colors focus:border-primary cursor-pointer"
                        value={form.partnershipType}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            partnershipType: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select type...</option>
                        {PARTNERSHIP_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs font-bold text-foreground-secondary mb-1.5">
                      Message
                    </label>
                    <textarea
                      className="w-full px-3.5 py-2.5 border-[1.5px] border-border rounded-lg text-sm text-foreground bg-white outline-none transition-colors focus:border-primary resize-y min-h-[110px]"
                      placeholder="Tell us about your institution and what you're looking for in a partnership..."
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-600 text-[13px] mb-3">
                      Something went wrong. Please email us at
                      info@euamericanuniversity.us
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full text-center"
                    style={{
                      opacity: status === 'sending' ? 0.6 : 1,
                      cursor:
                        status === 'sending' ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {status === 'sending'
                      ? 'Sending...'
                      : 'Submit Partnership Enquiry'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
