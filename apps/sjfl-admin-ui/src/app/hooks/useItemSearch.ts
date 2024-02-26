import { useQuery } from '@tanstack/react-query';
import { judians } from '../mock/judians';
import { todaysSessions } from '../mock/sessions';
import { SearchBy } from '../models/Search';
import { Aid } from '../models/Aid';

export function useItemSearch(
  item: 'aid' | 'counselling' | 'judian',
  query: URLSearchParams
) {
  return useQuery({
    queryKey: ['search', item, query],
    queryFn: () => {
      switch (item) {
        case 'judian':
          return judians;
        case 'aid':
          return [];
        case 'counselling':
          return todaysSessions;
      }
    },
  });
}

export function fetchSearchResults(item: SearchBy, query: URLSearchParams) {
  switch (item) {
    case 'judian':
      return judians;
    case 'aid':
      return [] as Aid[];
    case 'counselling':
      return todaysSessions;
  }
}
