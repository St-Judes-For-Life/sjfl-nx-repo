import { API } from '../../../../shared/constants/api/urls';
import { ClientRequestService } from '../../../../shared/utils/axios';
import { AidWorkflowConfig } from '../models/aid-workflow-config.model';

export const getStreams = async () => {
  const { data } = await ClientRequestService.get<AidWorkflowConfig>(
    API.aid.getStreams
  );
  return data;
};
