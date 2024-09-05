import { useQuery } from '@tanstack/react-query';
import { fetchCommonLookupAdmin } from '../modules/common/CommonService';

export function useLookupValues() {
  const { data: lookupResp } = useQuery({
    queryKey: ['common', 'lookup'] as const,
    queryFn: fetchCommonLookupAdmin,
  });
  if (!lookupResp) {
    throw Error('Lookup values not fetched');
  }

  return lookupResp.data;
}
