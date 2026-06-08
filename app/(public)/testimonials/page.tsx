export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { PageHero } from '@/components/ui/PageHero';
import { Quote } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { 
  title: 'Testimonials', 
  description: 'Hear from EU American University graduates about their transformative experiences.' 
};

export default async function TestimonialsPage({
  searchParams,
}: {
  searchParams: { page?: string; program?: string };
}) {
  const page = parseInt(searchParams?.page ?? '1');
  const programFilter = searchParams?.program ?? 'all';
  const limit = 12;

  const where: any = { isApproved: true };
  if (programFilter !== 'all') {
    where.program = { contains: programFilter };
  }

  const [testimonials, total] = await prisma.$transaction([
    prisma.testimonial.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.testimonial.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <PageHero
        title="Student Testimonials"
        subtitle="Hear directly from our global community of graduates and professionals."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Testimonials' }]}
      />
      <section className="section-padding bg-background-subtle min-h-[50vh]">
        <div className="container-main">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="flex items-center gap-2">
              <Link href="/testimonials?program=all" className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${programFilter === 'all' ? 'bg-primary text-white' : 'bg-white text-foreground hover:bg-gray-100 border border-border'}`}>
                All
              </Link>
              <Link href="/testimonials?program=Business" className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${programFilter === 'Business' ? 'bg-primary text-white' : 'bg-white text-foreground hover:bg-gray-100 border border-border'}`}>
                Business
              </Link>
              <Link href="/testimonials?program=Honorary" className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${programFilter === 'Honorary' ? 'bg-primary text-white' : 'bg-white text-foreground hover:bg-gray-100 border border-border'}`}>
                Honorary
              </Link>
              <Link href="/testimonials?program=Technology" className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${programFilter === 'Technology' ? 'bg-primary text-white' : 'bg-white text-foreground hover:bg-gray-100 border border-border'}`}>
                Technology
              </Link>
            </div>
          </div>

          {testimonials.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-border shadow-sm">
              <h3 className="text-xl font-bold text-foreground mb-2">No testimonials found.</h3>
              <p className="text-foreground-secondary">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow flex flex-col h-full relative group">
                  <Quote className="w-10 h-10 text-[#E09900]/20 absolute top-6 right-6 group-hover:text-[#E09900]/40 transition-colors" />
                  <p className="text-foreground-secondary leading-relaxed mb-8 italic flex-1 relative z-10 text-sm">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-background-subtle" />
                    ) : (
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                        {t.name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-foreground text-sm">{t.name}</div>
                      <div className="text-xs text-primary font-medium">{t.program}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                <Link
                  key={i}
                  href={`/testimonials?page=${i + 1}&program=${programFilter}`}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    page === i + 1 ? 'bg-primary text-white' : 'bg-white text-foreground border border-border hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
