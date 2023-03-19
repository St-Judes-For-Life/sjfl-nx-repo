import { LoaderFunction } from 'react-router-dom';
import { rootDataQuery } from '../queries/rootQuery';
import { queryClient } from '../utils/react-query';

/**
 * A loader function that ensures that the root data query is run.
 * @param {object} params - The params object from the router.
 * @returns None.
 */
export const rootLoader: LoaderFunction = async ({ params }) => {
  queryClient.ensureQueryData(rootDataQuery);
  return null;
};
