import { RequestService } from '../../../../lib/axios';
import { API } from '../../../constants/urls';
import { Stats } from '../models/Stats';

export function fetchStats() {
  return RequestService.get<Stats>(API.stats);
}
