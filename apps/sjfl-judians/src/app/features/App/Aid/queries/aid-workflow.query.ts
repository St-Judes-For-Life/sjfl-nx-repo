import { AidWorkflowConfig } from '../models/aid-workflow-config.model';
import { getStreams } from '../services/AidService';

export async function getWorkflowConfig(): Promise<AidWorkflowConfig> {
  return getStreams();
}

export const workflowConfigQuery = {
  queryKey: ['workflow-config'],
  queryFn: getWorkflowConfig,
};
