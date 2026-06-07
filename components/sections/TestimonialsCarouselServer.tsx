import { prisma } from '@/lib/db';
import TestimonialsCarousel from './TestimonialsCarousel';

export default async function TestimonialsCarouselServer() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isApproved: true },
    orderBy: { submittedAt: 'desc' },
  });

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  // Convert to the simple format expected by the client component
  const formattedTestimonials = testimonials.map(t => ({
    id: t.id,
    name: t.name,
    program: t.program,
    content: t.content,
  }));

  return <TestimonialsCarousel testimonials={formattedTestimonials} />;
}
