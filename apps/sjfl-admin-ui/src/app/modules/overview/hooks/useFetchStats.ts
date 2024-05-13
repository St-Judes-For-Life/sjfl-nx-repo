import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../services/StatsService';

export function useFetchStats() {
  return useQuery({ queryKey: ['overview', 'stats'], queryFn: fetchStats });
}
