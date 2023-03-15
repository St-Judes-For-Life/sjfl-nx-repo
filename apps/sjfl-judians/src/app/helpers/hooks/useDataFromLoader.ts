import { LoaderFunction, useLoaderData } from 'react-router-dom';

export function useDataFromLoader<LoaderFn extends LoaderFunction>(
  loaderFn: LoaderFn
) {
  return useLoaderData() as Awaited<ReturnType<typeof loaderFn>>;
}
