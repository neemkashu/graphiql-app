import { ALL_LANGUAGES, BASIC_LANGUAGE } from '@/common';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ALL_LANGUAGES,
  defaultLocale: BASIC_LANGUAGE,
  localePrefix: 'always',
  localeDetection: false,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
