import { i18n } from '@lingui/core';
// import { bn, en, hi, kn, ml, mr, ta, te } from 'make-plural/plurals';
import { Locale } from '../models/i18n.model';
import { asyncStore } from '@sjfl/data';

export const locales: Locale[] = [
  {
    code: 'en',
    name: 'English',
    friendlyName: 'English',
  },
  {
    code: 'hi',
    name: 'हिंदी',
    friendlyName: 'Hindi',
  },
  {
    code: 'mr',
    name: 'मराठी',
    friendlyName: 'Marathi',
  },
  {
    code: 'bn',
    name: 'বাংলা',
    friendlyName: 'Bengali',
  },
  {
    code: 'kn',
    name: 'ಕನ್ನಡ',
    friendlyName: 'Kannada',
  },
  {
    code: 'ta',
    name: 'தமிழ்',
    friendlyName: 'Tamil',
  },
  {
    code: 'te',
    name: 'తెలుగు',
    friendlyName: 'Telugu',
  },
  {
    code: 'ml',
    name: 'മലയാളം',
    friendlyName: 'Malayalam',
  },
];

// i18n.loadLocaleData({
//   en: { plurals: en },
//   hi: { plurals: hi },
//   mr: { plurals: mr },
//   bn: { plurals: bn },
//   kn: { plurals: kn },
//   ta: { plurals: ta },
//   te: { plurals: te },
//   ml: { plurals: ml },
// });

/**
 * Do a dynamic import of just the catalog that we need
 * @param {string} locale any locale string
 */
export async function activateLocale(locale: string) {
  const { messages } = await import(`../../../locales/${locale}/messages.ts`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

/**
 * Persist the locale to async storage
 * @param {Locale} locale any locale string
 */
export async function persistLocale(locale: Locale) {
  return asyncStore.set('preferredLocale', locale);
}

/**
 * Fetch Persisted locale from async storage
 */
export async function fetchSavedLocale() {
  return asyncStore.get<Locale>('preferredLocale');
}
