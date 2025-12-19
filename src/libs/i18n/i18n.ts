import {getRequestConfig} from "next-intl/server";
import {hasLocale} from "use-intl";
import {routing} from '@/libs/i18n/routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  
  return {
    locale,
    messages: (await import(`@/libs/i18n/locales/${locale}.json`)).default
  };
});