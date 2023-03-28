import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LanguageSelectionPage } from '../../features/Common/LanguageSelectionPage';
import { SplashPage } from '../../features/Splash/SplashPage';
import { useLoadedQuery } from '../helpers/hooks/useLoadedQuery';
import { rootDataQuery } from '../queries/rootQuery';
import { LocaleContext } from '../store/InternationalizationProvider';

/**
 * The root layout component.
 * @returns None
 */
export const RootLayout = () => {
  const { locale } = useContext(LocaleContext);
  const query = useLoadedQuery(rootDataQuery.queryKey, rootDataQuery.queryFn);

  const location = useLocation();
  if (query.isLoading) {
    return <SplashPage />;
  }

  if (!locale) {
    return <LanguageSelectionPage />;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Outlet key={location.pathname} />̵
    </AnimatePresence>
  );
};
