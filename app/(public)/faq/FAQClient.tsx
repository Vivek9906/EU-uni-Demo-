'use client';

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function FAQClient({ faqs }: { faqs: FAQ[] }) {
  // Group faqs by category
  const faqData: Record<string, FAQ[]> = {};
  faqs.forEach(faq => {
    if (!faqData[faq.category]) {
      faqData[faq.category] = [];
    }
    faqData[faq.category].push(faq);
  });

  const categories = Object.keys(faqData);
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = (q: string) => {
    const next = new Set(openItems);
    if (next.has(q)) next.delete(q); else next.add(q);
    setOpenItems(next);
  };

  const filteredFaq = searchQuery
    ? faqs.filter((f) => f.question.toLowerCase().includes(searchQuery.toLowerCase()) || f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    : faqData[activeCategory] || [];

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about EU American University programs, admissions, and more."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Frequently Asked Questions' }]}
      />
      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <div className="relative mb-8">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input type="text" placeholder="Search questions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-11" />
          </div>
          {!searchQuery && categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((c) => (
                <button key={c} onClick={() => setActiveCategory(c)} className={`px-4 py-2 rounded-card text-sm font-accent font-medium transition-all ${activeCategory === c ? 'bg-primary text-white' : 'bg-background-subtle text-foreground-secondary hover:text-primary border border-border'}`}>{c}</button>
              ))}
            </div>
          )}
          <div className="space-y-3">
            {filteredFaq.map((faq) => (
              <div key={faq.id} className="card overflow-hidden">
                <button onClick={() => toggle(faq.id)} className="w-full flex items-center justify-between p-5 text-left hover:bg-background-subtle transition-colors" aria-expanded={openItems.has(faq.id)}>
                  <span className="font-medium text-sm pr-4">{faq.question}</span>
                  {openItems.has(faq.id) ? <ChevronUp size={18} className="text-primary shrink-0" /> : <ChevronDown size={18} className="text-foreground-muted shrink-0" />}
                </button>
                {openItems.has(faq.id) && (
                  <div className="px-5 pb-5 text-sm text-foreground-secondary leading-relaxed border-t border-border pt-3">{faq.answer}</div>
                )}
              </div>
            ))}
            {filteredFaq.length === 0 && (
              <p className="text-foreground-secondary text-center py-8">No FAQs found.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
