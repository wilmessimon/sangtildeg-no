'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: t('q1.question'), answer: t('q1.answer') },
    { question: t('q2.question'), answer: t('q2.answer') },
    { question: t('q3.question'), answer: t('q3.answer') },
    { question: t('q4.question'), answer: t('q4.answer') },
    { question: t('q5.question'), answer: t('q5.answer') },
    { question: t('q6.question'), answer: t('q6.answer') },
    { question: t('q7.question'), answer: t('q7.answer') },
    { question: t('q8.question'), answer: t('q8.answer') },
    { question: t('q9.question'), answer: t('q9.answer') },
    { question: t('q10.question'), answer: t('q10.answer') },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section bg-cream">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Headline */}
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-center mb-16">
            {t('headline')}
          </h2>

          {/* FAQ Items */}
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFAQ(index);
                    }
                  }}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold text-xl md:text-2xl text-text-primary pr-8 group-hover:text-accent-gold transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`flex-shrink-0 w-7 h-7 text-accent-gold transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {t('contactHeadline')}
            </h3>
            <p className="text-xl md:text-2xl text-text-secondary mb-6">
              {t('contactText')}
            </p>
            <a
              href="mailto:sangtildeg@gmail.com"
              className="inline-block text-2xl md:text-3xl font-semibold text-accent-gold hover:text-text-primary transition-colors"
            >
              sangtildeg@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

