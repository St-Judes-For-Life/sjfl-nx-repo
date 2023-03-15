import { LoaderFunction } from 'react-router-dom';
import { rootDataQuery } from '../queries/rootQuery';
import { queryClient } from '../utils/react-query';

export const rootLoader: LoaderFunction = async ({ params }) => {
  queryClient.ensureQueryData(rootDataQuery);
  return null;
};
