import HeroSection from '@/components/sections/HeroSection';
import StatsBar from '@/components/sections/StatsBar';
import WhyAMU from '@/components/sections/WhyAMU';
import AboutPreview from '@/components/sections/AboutPreview';
import ProgramsSection from '@/components/sections/ProgramsSection';
import NewsEvents from '@/components/sections/NewsEvents';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import AccreditationStrip from '@/components/sections/AccreditationStrip';
import HonoraryCtaBanner from '@/components/sections/HonoraryCtaBanner';
import CampusLocation from '@/components/sections/CampusLocation';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <WhyAMU />
      <AboutPreview />
      <ProgramsSection />
      <NewsEvents />
      <TestimonialsCarousel />
      <AccreditationStrip />
      <HonoraryCtaBanner />
      <CampusLocation />
    </>
  );
}
