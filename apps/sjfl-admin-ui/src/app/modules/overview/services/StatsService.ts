import { RequestService } from '../../../../lib/axios';
import { API } from '../../../constants/urls';
import { StatsResponse } from '../models/StatsResponse';

export function fetchStats() {
  return RequestService.get<StatsResponse>(API.stats);
}
