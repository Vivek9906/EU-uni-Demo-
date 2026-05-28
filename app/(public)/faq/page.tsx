'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const faqData: Record<string, { question: string; answer: string }[]> = {
  Admissions: [
    { question: 'What are the admission requirements for the MBA program?', answer: 'Applicants must hold a recognized bachelor\'s degree from an accredited institution. Professional experience is valued but not mandatory for the Bachelor\'s level MBA. For the Master\'s level MBA, a minimum of 2 years of professional experience is preferred.' },
    { question: 'How do I apply to AMU?', answer: 'You can apply online through our application portal at /admissions/apply. Complete all required sections, upload documents, and submit. You will receive a confirmation email with your unique Application Reference Number.' },
    { question: 'What is the application deadline?', answer: 'AMU operates on a rolling admissions basis. We recommend applying at least 8 weeks before your intended start date.' },
    { question: 'Can international students apply?', answer: 'Absolutely. AMU welcomes students from all countries. We have students from over 100 countries worldwide.' },
    { question: 'Are there scholarships available?', answer: 'Yes, AMU offers merit-based, need-based, and international student scholarships. Visit our Scholarships page for details.' },
  ],
  Programs: [
    { question: 'What programs does AMU offer?', answer: 'AMU offers MBA programs at both Bachelor\'s and Master\'s levels, plus Honorary Doctorate and Honorary Professorship programs.' },
    { question: 'What is the difference between Bachelor\'s and Master\'s MBA?', answer: 'The Bachelor\'s MBA (BBA) provides foundational business education. The Master\'s MBA builds on this with advanced coursework in strategic leadership and global strategy.' },
    { question: 'What is an Honorary Doctorate?', answer: 'An Honorary Doctorate is a prestigious recognition for individuals with exceptional achievement and significant contributions to their field. The program name on the certificate matches exactly what you submit.' },
    { question: 'Are programs available online?', answer: 'Yes, AMU offers fully online, hybrid, and on-campus delivery modes using state-of-the-art learning platforms.' },
  ],
  Fees: [
    { question: 'What are the tuition fees?', answer: 'Tuition varies by program. Contact admissions@euamericanuniversity.us for the current fee schedule.' },
    { question: 'Are payment plans available?', answer: 'Yes, AMU offers flexible installment plans. Contact our finance office for details.' },
    { question: 'What does tuition include?', answer: 'Tuition covers all instruction, platform access, digital library resources, and credential issuance upon completion.' },
  ],
  'Campus Life': [
    { question: 'Where is AMU located?', answer: 'AMU headquarters are at 11 rue Magdebourg, Paris, France 75016, with a US office in Upland, California.' },
    { question: 'What student support services are available?', answer: 'AMU provides academic advising, career counseling, library access, technical support, and international student services.' },
  ],
  Certificates: [
    { question: 'How can I verify my certificate?', answer: 'Use our Certificate Verification page at /verify-certificate. Enter your Certificate ID for instant verification.' },
    { question: 'What appears on the certificate?', answer: 'The certificate displays the exact program name submitted during application. Please ensure accuracy when applying.' },
    { question: 'Is my AMU degree recognized internationally?', answer: 'AMU is accredited by IARC, QAHE, and is a member of ACBSP, IACBE, and ASIC UK. Check with your country\'s credential body for specifics.' },
  ],
};

const categories = Object.keys(faqData);

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = (q: string) => {
    const next = new Set(openItems);
    if (next.has(q)) next.delete(q); else next.add(q);
    setOpenItems(next);
  };

  const filteredFaq = searchQuery
    ? Object.values(faqData).flat().filter((f) => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqData[activeCategory] || [];

  return (
    <>
      <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 section-padding">
        <div className="container-main"><div className="max-w-3xl"><span className="section-label">Support</span><h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">Frequently Asked Questions</h1><p className="text-lg text-foreground-secondary">Find answers to common questions about AMU programs, admissions, and more.</p></div></div>
      </section>
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <div className="relative mb-8">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input type="text" placeholder="Search questions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-11" />
          </div>
          {!searchQuery && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((c) => (
                <button key={c} onClick={() => setActiveCategory(c)} className={`px-4 py-2 rounded-card text-sm font-accent font-medium transition-all ${activeCategory === c ? 'bg-primary text-white' : 'bg-background-subtle text-foreground-secondary hover:text-primary border border-border'}`}>{c}</button>
              ))}
            </div>
          )}
          <div className="space-y-3">
            {filteredFaq.map((faq) => (
              <div key={faq.question} className="card overflow-hidden">
                <button onClick={() => toggle(faq.question)} className="w-full flex items-center justify-between p-5 text-left hover:bg-background-subtle transition-colors" aria-expanded={openItems.has(faq.question)}>
                  <span className="font-medium text-sm pr-4">{faq.question}</span>
                  {openItems.has(faq.question) ? <ChevronUp size={18} className="text-primary shrink-0" /> : <ChevronDown size={18} className="text-foreground-muted shrink-0" />}
                </button>
                {openItems.has(faq.question) && (
                  <div className="px-5 pb-5 text-sm text-foreground-secondary leading-relaxed border-t border-border pt-3">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
