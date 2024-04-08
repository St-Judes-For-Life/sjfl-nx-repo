import { Outlet } from 'react-router-dom';
import { LanguageSelectionPage } from '../../features/Common/LanguageSelectionPage';
import { SplashPage } from '../../features/Splash/SplashPage';
import { useLoadedQuery } from '../hooks/useLoadedQuery';
import { useLocale } from '../hooks/useLocale';
import { rootDataQuery } from '../queries/rootQuery';

/**
 * The root layout component.
 * @returns None
 */
export const RootLayout = () => {
  const { locale } = useLocale();
  const query = useLoadedQuery(rootDataQuery.queryKey, rootDataQuery.queryFn);

  if (query.isLoading) {
    return <SplashPage />;
  }

  if (!locale) {
    return <LanguageSelectionPage />;
  }

  return <Outlet />;
};
