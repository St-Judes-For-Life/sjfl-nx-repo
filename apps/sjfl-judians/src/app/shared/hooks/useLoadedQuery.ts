import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { queryClient } from '../utils/react-query';

/**
 * Wrapper around react-query useQuery which fetches query which have already been fetched from loaders
 * @param {TQueryKey} queryKey key for the query
 * @param {QueryFunction<TQueryFnData, TQueryKey>} queryFn async function to fetch the data
 * @param {UseQueryOptions} options query options
 */
export function useLoadedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: () => undefined;
  }
): UseQueryResult<TData, TError> {
  const state = queryKey && queryClient.getQueryState(queryKey);

  return useQuery(
    queryKey,
    queryFn,
    state?.status === 'success'
      ? {
          ...options,
          initialData: state?.data as TQueryFnData,
        }
      : {
          ...options,
          staleTime: Infinity,
        }
  );
}
