import { createContext } from 'react';
import { Maybe } from '../../models/maybe.model';
import { Locale } from '../../models/i18n.model';

export const LocaleContext = createContext<{
  locale: Maybe<Locale>;
  setLocale: (code: Locale) => void;
}>({
  locale: undefined,
  setLocale: (code: Locale) => {
    return;
  },
});
