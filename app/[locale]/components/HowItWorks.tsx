'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { FileText, Music, Mail, Heart } from 'lucide-react';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const locale = useLocale();

  const steps = [
    {
      icon: FileText,
      title: t('step1.title'),
      description: t('step1.description'),
    },
    {
      icon: Music,
      title: t('step2.title'),
      description: t('step2.description'),
    },
    {
      icon: Mail,
      title: t('step3.title'),
      description: t('step3.description'),
    },
    {
      icon: Heart,
      title: t('step4.title'),
      description: t('step4.description'),
    },
  ];

  return (
    <section id="how-it-works" className="section bg-beige">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20">
            {t('headline')}
          </h2>

          {/* Steps - Vertical on mobile, Horizontal on desktop */}
          <div className="mb-16">
            {/* Desktop Layout - größere Steps */}
            <div className="hidden md:flex justify-between items-start relative">
              {/* Progress Line */}
              <div className="absolute top-14 left-0 right-0 h-0.5 bg-warm" style={{ zIndex: 0 }} />
              
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center relative px-4" style={{ zIndex: 1 }}>
                    <div className="w-28 h-28 rounded-full bg-accent-gold flex items-center justify-center mb-8 shadow-xl">
                      <Icon size={44} className="text-text-primary" />
                    </div>
                    <h3 className="font-heading text-2xl font-semibold mb-4 text-center">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-center text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mobile Layout - größer */}
            <div className="md:hidden space-y-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-accent-gold flex items-center justify-center shadow-lg">
                        <Icon size={36} className="text-text-primary" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className="w-0.5 flex-1 bg-warm mt-6" />
                      )}
                    </div>
                    <div className="flex-1 pb-10">
                      <h3 className="font-heading text-2xl font-semibold mb-4">
                        {step.title}
                      </h3>
                      <p className="text-text-secondary text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA - größer und prominenter */}
          <div className="text-center">
            <Link 
              href={`/${locale === 'en' ? 'en/' : ''}create`}
              className="btn-primary mb-6 min-w-[280px] inline-block"
            >
              {t('cta')}
            </Link>
            <p className="text-base md:text-lg text-text-light">
              {t('ctaAlt')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

