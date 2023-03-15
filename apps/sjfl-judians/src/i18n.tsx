import { i18n } from '@lingui/core';
import { en, hi } from 'make-plural/plurals';

export const locales = {
  en: 'English',
  hi: 'Hindi',
};

i18n.loadLocaleData({
  en: { plurals: en },
  hi: { plurals: hi },
});

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
  const { messages } = await import(
    `@lingui/loader!./locales/${locale}/messages.po`
  );
  i18n.load(locale, messages);
  i18n.activate(locale);
}
