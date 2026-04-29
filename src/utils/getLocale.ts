import {routing} from '@/libs/i18n/routing';

export function getLocale() {
  if (typeof window === 'undefined') return routing.defaultLocale;
  const segment = window.location.pathname.split('/')[1];
  return routing.locales.includes(segment as any)
    ? segment
    : routing.defaultLocale;
}