import { useIsRestoring, useQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Await, Outlet, useLoaderData } from 'react-router-dom';
import SplashPage from '../pages/Splash/SplashPage';
import { rootDataQuery } from '../queries/rootQuery';

export const RootLayout = () => {
  const isRestoring = useIsRestoring();
  const query = useQuery(rootDataQuery);
  // const { value } = useLoaderData() as {
  //   value: Promise<string>;
  // };
  console.log(query);

  if (query.isLoading) {
    return <SplashPage />;
  }
  return <Outlet></Outlet>;

  //   <Suspense fallback={<SplashPage />}>
  //     <Await
  //       resolve={value}
  //       errorElement={<div>Could not load </div>}
  //       children={(data) => <Outlet></Outlet>}
  //     />
  //   </Suspense>
  // );
};
