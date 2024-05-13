import { AidWorkflowConfig } from '../models/aid-workflow-config.model';

export async function getWorkflowConfig(): Promise<AidWorkflowConfig> {
  return (await fetch('/assets/aid.json')).json();
}

export const workflowConfigQuery = {
  queryKey: ['workflow-config'],
  queryFn: getWorkflowConfig,
};
