import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['no', 'en'] as const;
export const defaultLocale = 'no' as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

