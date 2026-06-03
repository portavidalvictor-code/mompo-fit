import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Method from '@/components/landing/Method';
import Manifesto from '@/components/landing/Manifesto';
import About from '@/components/landing/About';
import Cases from '@/components/landing/Cases';
import Pricing from '@/components/landing/Pricing';
import Reviews from '@/components/landing/Reviews';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';
import PlanApplyModal from '@/components/landing/PlanApplyModal';
import WAButton from '@/components/landing/WAButton';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink-950">
      <Header />
      <Hero />
      <Method />
      <Manifesto />
      <About />
      <Cases />
      <Pricing />
      <Reviews />
      <Contact />
      <Footer />
      <PlanApplyModal />
      <WAButton />
    </main>
  );
}
