import { prisma } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import TestimonialsCarousel from './TestimonialsCarousel';

const getCachedTestimonials = unstable_cache(
  async () => {
    const testimonials = await prisma.testimonial.findMany({
      where: { isApproved: true },
      orderBy: { submittedAt: 'desc' },
      select: {
        id: true,
        name: true,
        program: true,
        content: true,
      },
    });

    return testimonials.map(t => ({
      id: t.id,
      name: t.name,
      program: t.program,
      content: t.content,
    }));
  },
  ['testimonials-carousel'],
  { revalidate: 300, tags: ['testimonials'] }
);

export default async function TestimonialsCarouselServer() {
  let formattedTestimonials: { id: string; name: string; program: string; content: string }[] = [];

  try {
    formattedTestimonials = await getCachedTestimonials();
  } catch (error) {
    console.error('[TestimonialsCarouselServer] DB error:', error);
    return null;
  }

  if (formattedTestimonials.length === 0) {
    return null;
  }

  return <TestimonialsCarousel testimonials={formattedTestimonials} />;
}
