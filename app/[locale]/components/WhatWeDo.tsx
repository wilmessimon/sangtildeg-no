'use client';

import { useTranslations } from 'next-intl';

export default function WhatWeDo() {
  const t = useTranslations('whatWeDo');

  return (
    <section id="what-we-do" className="section bg-cream">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16">
            {t('headline')}
          </h2>

          <div className="prose prose-lg max-w-none">
            {t('body').split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed text-center">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Testimonial Quote - größer und prominenter */}
          <div className="mt-16 p-10 md:p-12 bg-beige rounded-3xl relative shadow-sm">
            <div className="absolute -top-6 left-8 md:left-12">
              <svg className="w-12 h-12 md:w-16 md:h-16 text-accent-gold opacity-50" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8zm16 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/>
              </svg>
            </div>
            <p className="handwriting text-center pt-4">
              {t('quote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

