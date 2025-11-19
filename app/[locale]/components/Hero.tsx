'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();

  const scrollToAudio = () => {
    document.getElementById('why-a-song')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-beige to-cream pt-24 px-4 overflow-hidden">
      <div className="container relative">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Headline - größer und prominenter */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-8 leading-tight animate-fade-in-up whitespace-pre-line">
            {t('headline')}
          </h1>

          {/* Subheadline - größer */}
          <p className="text-2xl md:text-3xl lg:text-4xl text-text-secondary mb-6 leading-relaxed animate-fade-in-up animate-delay-100">
            {t('subheadline')}
          </p>

          {/* Tagline - größer */}
          <p className="text-xl md:text-2xl text-text-light mb-12 leading-relaxed animate-fade-in-up animate-delay-200">
            {t('tagline')}
          </p>

          {/* Founders - Overlapping Circles */}
          <div className="mb-16 animate-fade-in-up animate-delay-300">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center -space-x-6 md:-space-x-8 mb-4">
                {/* Thea Circle */}
                <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-110 hover:z-10 transition-all duration-300 ring-2 ring-accent-gold">
                  <Image
                    src="/images/thea.jpg"
                    alt="Thea"
                    width={120}
                    height={120}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>

                {/* Mia Circle */}
                <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-110 hover:z-10 transition-all duration-300 ring-2 ring-accent-gold">
                  <Image
                    src="/images/mia.jpg"
                    alt="Mia"
                    width={120}
                    height={120}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
              <p className="font-handwriting text-2xl md:text-3xl text-text-primary">
                Thea & Mia
              </p>
            </div>
          </div>

          {/* CTA Buttons - größer und besser sichtbar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up animate-delay-300">
            <Link 
              href={`/${locale === 'en' ? 'en/' : ''}create`}
              className="btn-primary w-full sm:w-auto min-w-[280px]"
            >
              {t('cta')}
            </Link>
            <button 
              onClick={scrollToAudio}
              className="text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2 text-lg md:text-xl font-medium"
            >
              {t('ctaAlt')}
            </button>
          </div>

          {/* Decorative element */}
          <div className="mt-16 flex justify-center">
            <div className="w-16 h-1 bg-accent-gold rounded-full" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <svg 
          className="w-6 h-6 text-text-light" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}

