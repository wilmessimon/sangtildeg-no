'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutUs() {
  const t = useTranslations('aboutUs');

  return (
    <section id="about" className="section bg-cream">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20">
            {t('headline')}
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Image - größer und prominenter */}
            <div className="order-2 md:order-1">
              <div className="aspect-[3/4] bg-beige rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/thea-and-mia.png"
                  alt="Thea & Mia"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content - größerer Text */}
            <div className="order-1 md:order-2">
              <div className="prose prose-lg max-w-none">
                {t('body').split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Signature - größer */}
              <div className="mt-12">
                <p className="handwriting text-accent-gold whitespace-pre-line">
                  {t('signature')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

