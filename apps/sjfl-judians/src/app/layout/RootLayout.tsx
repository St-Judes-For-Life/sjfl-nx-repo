import { useContext } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { FullScreenSpinner } from '../components/Progress/FullScreenSpinner';
import { LanguageSelectionPage } from '../features/Common/LanguageSelectionPage';
import { SplashPage } from '../features/Splash/SplashPage';
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
  const navigation = useNavigation();
  const showSpinner = navigation.state === 'loading';

  if (query.isLoading) {
    return <SplashPage />;
  }

  if (!locale) {
    return <LanguageSelectionPage />;
  }

  if (showSpinner) {
    return <FullScreenSpinner />;
  }

  return <Outlet />;
};
