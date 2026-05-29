import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import WhyEUAU from '@/components/sections/WhyEUAU';
import AboutPreview from '@/components/sections/AboutPreview';
import ProgramsSection from '@/components/sections/ProgramsSection';
import NewsEvents from '@/components/sections/NewsEvents';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import HonoraryCtaBanner from '@/components/sections/HonoraryCtaBanner';
import CampusLocation from '@/components/sections/CampusLocation';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <WhyEUAU />
      <AboutPreview />
      <ProgramsSection />
      <NewsEvents />
      <TestimonialsCarousel />
      <HonoraryCtaBanner />
      <CampusLocation />
    </>
  );
}
