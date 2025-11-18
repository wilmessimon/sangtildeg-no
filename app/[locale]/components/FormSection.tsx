'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormData } from '@/lib/validations';
import { Loader2 } from 'lucide-react';

export default function FormSection() {
  const t = useTranslations('form');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: locale as 'en' | 'no',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="form" className="section bg-cream">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
            {t('headline')}
          </h2>
          <p className="text-xl md:text-2xl text-text-secondary text-center mb-16 leading-relaxed">
            {t('intro')}
          </p>

          {submitStatus === 'success' ? (
            <div className="bg-accent-sage p-10 md:p-12 rounded-3xl text-center shadow-sm">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-text-primary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-xl md:text-2xl text-text-primary leading-relaxed">
                {t('success')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Name of deceased */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.name.label')} *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                  placeholder={t('fields.name.placeholder')}
                />
                {errors.name && (
                  <p className="text-red-500 text-base mt-2">{errors.name.message}</p>
                )}
              </div>

              {/* About */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.about.label')} *
                </label>
                <textarea
                  {...register('about')}
                  rows={5}
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold resize-none transition-all"
                  placeholder={t('fields.about.placeholder')}
                />
                {errors.about && (
                  <p className="text-red-500 text-base mt-2">{errors.about.message}</p>
                )}
              </div>

              {/* Personality */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.personality.label')}
                </label>
                <textarea
                  {...register('personality')}
                  rows={4}
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold resize-none transition-all"
                  placeholder={t('fields.personality.placeholder')}
                />
              </div>

              {/* Favorites */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.favorites.label')}
                </label>
                <textarea
                  {...register('favorites')}
                  rows={4}
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold resize-none transition-all"
                  placeholder={t('fields.favorites.placeholder')}
                />
              </div>

              {/* Saying */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.saying.label')}
                </label>
                <input
                  {...register('saying')}
                  type="text"
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                  placeholder={t('fields.saying.placeholder')}
                />
              </div>

              {/* Memory */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.memory.label')}
                </label>
                <textarea
                  {...register('memory')}
                  rows={5}
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold resize-none transition-all"
                  placeholder={t('fields.memory.placeholder')}
                />
              </div>

              {/* Tone */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.tone.label')} *
                </label>
                <select
                  {...register('tone')}
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                >
                  <option value="gentle">{t('fields.tone.options.gentle')}</option>
                  <option value="warm">{t('fields.tone.options.warm')}</option>
                  <option value="reflective">{t('fields.tone.options.reflective')}</option>
                  <option value="other">{t('fields.tone.options.other')}</option>
                </select>
                {errors.tone && (
                  <p className="text-red-500 text-base mt-2">{errors.tone.message}</p>
                )}
              </div>

              {/* Music Style */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.musicStyle.label')}
                </label>
                <input
                  {...register('musicStyle')}
                  type="text"
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                  placeholder={t('fields.musicStyle.placeholder')}
                />
              </div>

              {/* Contact Name */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.contactName.label')} *
                </label>
                <input
                  {...register('contactName')}
                  type="text"
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                  placeholder={t('fields.contactName.placeholder')}
                />
                {errors.contactName && (
                  <p className="text-red-500 text-base mt-2">{errors.contactName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.email.label')} *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                  placeholder={t('fields.email.placeholder')}
                />
                {errors.email && (
                  <p className="text-red-500 text-base mt-2">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.phone.label')}
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                  placeholder={t('fields.phone.placeholder')}
                />
              </div>

              {/* Additional */}
              <div>
                <label className="block text-base md:text-lg font-medium mb-3">
                  {t('fields.additional.label')}
                </label>
                <textarea
                  {...register('additional')}
                  rows={5}
                  className="w-full px-5 py-4 text-base md:text-lg rounded-xl border-2 border-warm bg-white focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold resize-none transition-all"
                  placeholder={t('fields.additional.placeholder')}
                />
              </div>

              {/* Hidden language field */}
              <input type="hidden" {...register('language')} value={locale as 'en' | 'no'} />

              {/* Submit Button - größer */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 py-5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      {t('submitting')}
                    </>
                  ) : (
                    t('submit')
                  )}
                </button>
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl text-base md:text-lg">
                  {t('error')}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

