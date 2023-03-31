import { Device } from '@capacitor/device';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { Locale } from '../models/i18n.model';
import { Maybe } from '../models/maybe.model';
import { activateLocale, fetchSavedLocale, persistLocale } from '../utils/i18n';

export const LocaleContext = createContext<{
  locale: Maybe<Locale>;
  setLocale: (code: Locale) => void;
}>({
  locale: undefined,
  setLocale: (code: Locale) => {
    return;
  },
});

export const InternationalizationProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [locale, setLocale] = useState<Maybe<Locale>>(undefined);
  const setLocaleCode = (code: Locale) => {
    setLocale(code);
    persistLocale(code);
  };

  useEffect(() => {
    fetchSavedLocale().then(async (savedLocale) => {
      if (savedLocale) {
        setLocale(savedLocale);
      } else {
        const defaultLocale = await Device.getLanguageCode();
        activateLocale(defaultLocale.value);
      }
    });
  }, []);

  useEffect(() => {
    if (locale) {
      activateLocale(locale.code);

      // set locale at html root level
      document.documentElement.lang = locale.code;
    }
  }, [locale]);

  return (
    <LocaleContext.Provider
      value={{
        locale: locale,
        setLocale: (locale: Locale) => setLocaleCode(locale),
      }}
    >
      <I18nProvider i18n={i18n} forceRenderOnLocaleChange={true}>
        {children}
      </I18nProvider>
    </LocaleContext.Provider>
  );
};
