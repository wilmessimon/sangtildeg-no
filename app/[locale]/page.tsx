import Navigation from '@/components/Navigation';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import WhyASong from './components/WhyASong';
import AboutUs from './components/AboutUs';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Support from './components/Support';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <WhatWeDo />
      <WhyASong />
      <AboutUs />
      <HowItWorks />
      <FAQ />
      <Support />
      <Footer />
    </main>
  );
}

