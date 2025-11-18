'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Handle locale switching with 'as-needed' prefix strategy
    // Default locale (no) has no prefix, en has /en prefix
    
    if (newLocale === 'no') {
      // Switching to Norwegian (default locale, no prefix)
      if (pathname.startsWith('/en')) {
        // Remove /en prefix
        const newPath = pathname.replace(/^\/en/, '') || '/';
        router.push(newPath);
      }
      // Already on Norwegian
    } else if (newLocale === 'en') {
      // Switching to English
      if (!pathname.startsWith('/en')) {
        // Add /en prefix
        const newPath = pathname === '/' ? '/en' : `/en${pathname}`;
        router.push(newPath);
      }
      // Already on English
    }
  };

  return (
    <div className="flex gap-2 font-sans text-base md:text-lg">
      <button
        onClick={() => switchLocale('en')}
        className={`px-4 py-2 rounded-full transition-colors ${
          locale === 'en' 
            ? 'bg-accent-gold text-text-primary font-semibold' 
            : 'text-text-secondary hover:text-text-primary font-medium'
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('no')}
        className={`px-4 py-2 rounded-full transition-colors ${
          locale === 'no' 
            ? 'bg-accent-gold text-text-primary font-semibold' 
            : 'text-text-secondary hover:text-text-primary font-medium'
        }`}
        aria-label="Bytt til norsk"
      >
        NO
      </button>
    </div>
  );
}

