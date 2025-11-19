'use client';

import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer id="footer" className="bg-cream border-t border-warm">
      <div className="container py-20 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Contact Section - größer */}
          <div className="text-center mb-16">
            <h3 className="font-heading text-3xl md:text-4xl font-semibold mb-6">
              {t('headline')}
            </h3>
            <p className="text-xl md:text-2xl text-text-secondary mb-6">
              {t('contact')}
            </p>
            <a 
              href="mailto:sangtildeg@gmail.com"
              className="inline-flex items-center gap-3 text-accent-gold hover:text-text-primary transition-colors font-medium text-xl md:text-2xl"
            >
              <Mail size={28} />
              sangtildeg@gmail.com
            </a>
          </div>

          {/* Closing Quote - größer und prominenter */}
          <div className="mb-16 p-10 md:p-12 bg-beige rounded-3xl shadow-sm">
            <p className="handwriting text-center whitespace-pre-line">
              {t('quote')}
            </p>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col items-center gap-6 pt-12 border-t border-warm">
            {/* Logo */}
            <div className="font-heading text-2xl md:text-3xl font-bold text-text-primary">
              sangtildeg.no
            </div>

            {/* Copyright */}
            <p className="text-base md:text-lg text-text-light text-center">
              {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

