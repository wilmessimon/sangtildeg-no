'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react';
import ProgressBar from '@/components/ProgressBar';

// Form Schema
const createFormSchema = z.object({
  // Step 1
  name: z.string().min(1, 'Bitte gib einen Namen ein'),
  threeWords: z.string().min(3, 'Bitte beschreibe die Person'),
  // Step 2
  story: z.string().min(20, 'Bitte erzähle uns ein bisschen mehr'),
  // Step 3
  mustHave: z.string().optional(),
  mood: z.enum(['gentle', 'warm', 'narrative', 'surprise']),
  // Step 4
  additional: z.string().optional(),
  // Step 5
  contactName: z.string().min(1, 'Dein Name wird benötigt'),
  email: z.string().email('Bitte gib eine gültige E-Mail an'),
  phone: z.string().optional(),
  language: z.enum(['en', 'no']),
});

type FormData = z.infer<typeof createFormSchema>;

const TOTAL_STEPS = 5;

export default function CreatePage() {
  const t = useTranslations('createForm');
  const locale = useLocale();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      language: locale as 'en' | 'no',
      mood: 'surprise',
    },
  });

  // Auto-save to localStorage
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem('songFormDraft', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('songFormDraft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        Object.keys(parsed).forEach((key) => {
          setValue(key as keyof FormData, parsed[key]);
        });
      } catch (e) {
        console.error('Failed to load draft', e);
      }
    }
  }, [setValue]);

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['name', 'threeWords'];
        break;
      case 2:
        fieldsToValidate = ['story'];
        break;
      case 3:
        fieldsToValidate = ['mood'];
        break;
      case 4:
        // Optional step, no validation
        break;
      case 5:
        fieldsToValidate = ['contactName', 'email'];
        break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate);
      if (!isValid) return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const skipStep = () => {
    if (currentStep === 4) {
      setCurrentStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          about: `${data.threeWords}\n\n${data.story}`,
          tone: data.mood,
          additional: data.mustHave ? `Must have: ${data.mustHave}\n\n${data.additional || ''}` : data.additional,
          contactName: data.contactName,
          email: data.email,
          phone: data.phone,
          language: data.language,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        localStorage.removeItem('songFormDraft');
        
        // Redirect nach 3 Sekunden
        setTimeout(() => {
          router.push(`/${locale === 'en' ? 'en' : ''}`);
        }, 3000);
      } else {
        alert(t('error'));
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert(t('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-accent-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
            <Check size={48} className="text-text-primary" />
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            {t('success.title')}
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary leading-relaxed">
            {t('success.message')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige to-cream py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => router.push(`/${locale === 'en' ? 'en' : ''}`)}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            {t('backHome')}
          </button>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary">
            {t('subtitle')}
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {/* Step 1: Über die Person */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <span className="text-6xl mb-4 block">🎵</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {t('step1.title')}
                </h2>
                <p className="text-lg text-text-secondary">
                  {t('step1.subtitle')}
                </p>
              </div>

              <div>
                <label className="block text-xl font-semibold mb-4">
                  {t('step1.nameLabel')}
                </label>
                <input
                  {...register('name')}
                  type="text"
                  placeholder={t('step1.namePlaceholder')}
                  className="w-full px-6 py-5 text-xl rounded-xl border-2 border-warm bg-cream focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                />
                {errors.name && (
                  <p className="text-red-500 text-base mt-2">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xl font-semibold mb-4">
                  {t('step1.wordsLabel')}
                </label>
                <input
                  {...register('threeWords')}
                  type="text"
                  placeholder={t('step1.wordsPlaceholder')}
                  className="w-full px-6 py-5 text-xl rounded-xl border-2 border-warm bg-cream focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                />
                {errors.threeWords && (
                  <p className="text-red-500 text-base mt-2">{errors.threeWords.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Die Geschichte */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <span className="text-6xl mb-4 block">📖</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {t('step2.title')}
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {t('step2.subtitle')}
                </p>
              </div>

              <div>
                <label className="block text-xl font-semibold mb-4">
                  {t('step2.label')}
                </label>
                <textarea
                  {...register('story')}
                  rows={12}
                  placeholder={t('step2.placeholder')}
                  className="w-full px-6 py-5 text-lg rounded-xl border-2 border-warm bg-cream focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold resize-none transition-all leading-relaxed"
                />
                {errors.story && (
                  <p className="text-red-500 text-base mt-2">{errors.story.message}</p>
                )}
                <p className="text-sm text-text-light mt-3 italic">
                  {t('step2.hint')}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Der Song */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <span className="text-6xl mb-4 block">🎼</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {t('step3.title')}
                </h2>
              </div>

              <div>
                <label className="block text-xl font-semibold mb-4">
                  {t('step3.mustHaveLabel')}
                </label>
                <input
                  {...register('mustHave')}
                  type="text"
                  placeholder={t('step3.mustHavePlaceholder')}
                  className="w-full px-6 py-5 text-lg rounded-xl border-2 border-warm bg-cream focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-xl font-semibold mb-6">
                  {t('step3.moodLabel')}
                </label>
                <div className="space-y-4">
                  {['gentle', 'warm', 'narrative', 'surprise'].map((mood) => (
                    <label
                      key={mood}
                      className="flex items-center gap-4 p-5 rounded-xl border-2 border-warm bg-cream hover:border-accent-gold cursor-pointer transition-all"
                    >
                      <input
                        {...register('mood')}
                        type="radio"
                        value={mood}
                        className="w-6 h-6 text-accent-gold"
                      />
                      <span className="text-lg font-medium">
                        {t(`step3.moods.${mood}`)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Noch etwas? (Optional) */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <span className="text-6xl mb-4 block">💛</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {t('step4.title')}
                </h2>
                <p className="text-lg text-text-secondary">
                  {t('step4.subtitle')}
                </p>
              </div>

              <div>
                <label className="block text-xl font-semibold mb-4">
                  {t('step4.label')}
                </label>
                <textarea
                  {...register('additional')}
                  rows={8}
                  placeholder={t('step4.placeholder')}
                  className="w-full px-6 py-5 text-lg rounded-xl border-2 border-warm bg-cream focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold resize-none transition-all"
                />
              </div>

              <button
                type="button"
                onClick={skipStep}
                className="w-full text-text-secondary hover:text-text-primary transition-colors text-lg font-medium"
              >
                {t('step4.skip')}
              </button>
            </div>
          )}

          {/* Step 5: Kontakt */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <span className="text-6xl mb-4 block">✉️</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  {t('step5.title')}
                </h2>
                <p className="text-lg text-text-secondary">
                  {t('step5.subtitle')}
                </p>
              </div>

              <div>
                <label className="block text-xl font-semibold mb-4">
                  {t('step5.nameLabel')}
                </label>
                <input
                  {...register('contactName')}
                  type="text"
                  placeholder={t('step5.namePlaceholder')}
                  className="w-full px-6 py-5 text-lg rounded-xl border-2 border-warm bg-cream focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                />
                {errors.contactName && (
                  <p className="text-red-500 text-base mt-2">{errors.contactName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xl font-semibold mb-4">
                  {t('step5.emailLabel')}
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder={t('step5.emailPlaceholder')}
                  className="w-full px-6 py-5 text-lg rounded-xl border-2 border-warm bg-cream focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-base mt-2">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xl font-semibold mb-4">
                  {t('step5.phoneLabel')}
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder={t('step5.phonePlaceholder')}
                  className="w-full px-6 py-5 text-lg rounded-xl border-2 border-warm bg-cream focus:outline-none focus:ring-2 focus:ring-accent-gold focus:border-accent-gold transition-all"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-12 pt-8 border-t border-warm">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-8 py-4 text-lg font-semibold text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={24} />
                {t('back')}
              </button>
            )}

            <div className="flex-1" />

            {currentStep < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary flex items-center gap-2"
              >
                {t('next')}
                <ArrowRight size={24} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {t('submitting')}
                  </>
                ) : (
                  <>
                    {t('submit')}
                    <Check size={24} />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

