'use client';

import { useTranslations } from 'next-intl';
import { ExternalLink } from 'lucide-react';

export default function Support() {
  const t = useTranslations('support');
  const vippsLink = process.env.NEXT_PUBLIC_VIPPS_LINK || '#';

  return (
    <section id="support" className="section bg-beige">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-12">
            {t('headline')}
          </h2>

          <div className="prose prose-lg max-w-none mb-16">
            {t('body').split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-xl md:text-2xl text-text-secondary mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Vipps Button - größer */}
          <div className="mb-10">
            <a
              href={vippsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-3 min-w-[280px]"
            >
              {t('cta')}
              <ExternalLink size={24} />
            </a>
          </div>

          {/* Note - größer */}
          <p className="text-base md:text-lg text-text-light italic">
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}

