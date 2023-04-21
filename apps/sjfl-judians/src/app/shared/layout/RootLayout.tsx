import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { LanguageSelectionPage } from '../../features/Common/LanguageSelectionPage';
import { SplashPage } from '../../features/Splash/SplashPage';
import { useLoadedQuery } from '../hooks/useLoadedQuery';
import { rootDataQuery } from '../queries/rootQuery';
import { LocaleContext } from '../store/context/LocaleContext';

/**
 * The root layout component.
 * @returns None
 */
export const RootLayout = () => {
  const { locale } = useContext(LocaleContext);
  const query = useLoadedQuery(rootDataQuery.queryKey, rootDataQuery.queryFn);

  if (query.isLoading) {
    return <SplashPage />;
  }

  if (!locale) {
    return <LanguageSelectionPage />;
  }

  return <Outlet />;
};
