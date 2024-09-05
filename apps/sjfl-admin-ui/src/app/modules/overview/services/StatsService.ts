import { AdminRequestService } from '../../../../lib/axios';
import { API } from '../../../constants/urls';
import { StatsResponse } from '../models/StatsResponse';

export function fetchStats() {
  return AdminRequestService.get<StatsResponse>(API.stats);
}
