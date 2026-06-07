import { Suspense } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import WhyEUAU from '@/components/sections/WhyEUAU';
import AboutPreview from '@/components/sections/AboutPreview';
import ProgramsSectionServer from '@/components/sections/ProgramsSectionServer';
import NewsEventsServer from '@/components/sections/NewsEventsServer';
import TestimonialsCarouselServer from '@/components/sections/TestimonialsCarouselServer';
import HonoraryCtaBanner from '@/components/sections/HonoraryCtaBanner';

function SectionSkeleton() {
  return (
    <div
      style={{
        height: 400,
        background: 'linear-gradient(90deg, #F9FAFB 25%, #F3F4F6 50%, #F9FAFB 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }}
    >
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Suspense fallback={<SectionSkeleton />}>
        <StatsBar />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <WhyEUAU />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <AboutPreview />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ProgramsSectionServer />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <NewsEventsServer />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsCarouselServer />
      </Suspense>

      <HonoraryCtaBanner />
    </>
  );
}
