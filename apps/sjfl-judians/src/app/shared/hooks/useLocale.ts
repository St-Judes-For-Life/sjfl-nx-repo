import { useContext } from 'react';
import { LocaleContext } from '../store/context/LocaleContext';

export function useLocale() {
  const localeContext = useContext(LocaleContext);

  if (!localeContext) {
    throw new Error('Locale context is not initialized');
  }

  return localeContext;
}
