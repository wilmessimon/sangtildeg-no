'use client';

import { useTranslations } from 'next-intl';
import AudioPlayer from '@/components/AudioPlayer';
import { Music, BookOpen, Sparkles } from 'lucide-react';

export default function WhyASong() {
  const t = useTranslations('whyASong');

  const reasons = [
    { icon: Music, text: t('reason1') },
    { icon: BookOpen, text: t('reason2') },
    { icon: Sparkles, text: t('reason3') },
  ];

  return (
    <section id="why-a-song" className="section bg-beige">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20">
            {t('headline')}
          </h2>

          {/* Reasons Grid - größere Cards */}
          <div className="grid md:grid-cols-3 gap-10 mb-20">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div 
                  key={index} 
                  className="flex flex-col items-center text-center p-8 rounded-3xl bg-cream hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-accent-gold flex items-center justify-center mb-6 shadow-md">
                    <Icon size={40} className="text-text-primary" />
                  </div>
                  <p className="text-xl md:text-2xl text-text-primary leading-relaxed">
                    {reason.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Audio Player - größer und prominenter */}
          <div className="bg-cream p-10 md:p-12 rounded-3xl shadow-sm">
            <h3 className="font-heading text-3xl md:text-4xl font-semibold text-center mb-8">
              {t('audioHeader')}
            </h3>
            
            {/* Placeholder for audio - replace with actual audio file */}
            <AudioPlayer 
              src="/audio/example-song.mp3" 
              title="Example Song"
            />
            
            <p className="text-base md:text-lg text-text-light text-center mt-6 italic">
              {t('audioNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

