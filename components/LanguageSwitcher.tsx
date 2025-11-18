'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex gap-2 font-sans text-base md:text-lg">
      <Link
        href={pathname}
        locale="en"
        className={`px-4 py-2 rounded-full transition-all ${
          locale === 'en' 
            ? 'bg-accent-gold text-text-primary font-semibold' 
            : 'text-text-secondary hover:text-text-primary font-medium'
        }`}
        aria-label="Switch to English"
      >
        EN
      </Link>
      <Link
        href={pathname}
        locale="no"
        className={`px-4 py-2 rounded-full transition-all ${
          locale === 'no' 
            ? 'bg-accent-gold text-text-primary font-semibold' 
            : 'text-text-secondary hover:text-text-primary font-medium'
        }`}
        aria-label="Bytt til norsk"
      >
        NO
      </Link>
    </div>
  );
}

