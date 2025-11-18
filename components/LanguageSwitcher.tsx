'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: 'en' | 'no') => {
    if (locale === newLocale) return;
    
    console.log('=== Language Switch ===');
    console.log('Current:', locale, 'Target:', newLocale, 'Path:', pathname);
    
    startTransition(() => {
      // Create the new path based on target locale
      let newPath = pathname;
      
      // Remove current locale prefix if it exists
      if (pathname.startsWith('/en')) {
        newPath = pathname.substring(3) || '/';
      }
      
      // Add new locale prefix if needed (only for 'en', 'no' is default)
      if (newLocale === 'en') {
        newPath = `/en${newPath}`;
      }
      
      console.log('Navigating to:', newPath);
      
      // Replace current history entry with new locale
      router.replace(newPath);
    });
  };

  return (
    <div className="flex gap-2 font-sans text-base md:text-lg">
      <button
        onClick={() => switchLocale('en')}
        disabled={isLoading || isPending}
        className={`px-4 py-2 rounded-full transition-all ${
          locale === 'en' 
            ? 'bg-accent-gold text-text-primary font-semibold' 
            : 'text-text-secondary hover:text-text-primary font-medium'
        } ${(isLoading || isPending) ? 'opacity-50 cursor-wait' : ''}`}
        aria-label="Switch to English"
      >
        {isLoading && locale !== 'en' ? '...' : 'EN'}
      </button>
      <button
        onClick={() => switchLocale('no')}
        disabled={isLoading || isPending}
        className={`px-4 py-2 rounded-full transition-all ${
          locale === 'no' 
            ? 'bg-accent-gold text-text-primary font-semibold' 
            : 'text-text-secondary hover:text-text-primary font-medium'
        } ${(isLoading || isPending) ? 'opacity-50 cursor-wait' : ''}`}
        aria-label="Bytt til norsk"
      >
        {isLoading && locale !== 'no' ? '...' : 'NO'}
      </button>
    </div>
  );
}

