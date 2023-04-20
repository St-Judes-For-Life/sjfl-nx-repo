import { useQuery } from '@tanstack/react-query';
import { workflowConfigQuery } from '../queries/aid-workflow.query';

export function useAidWorkflowConfig() {
  return useQuery(workflowConfigQuery.queryKey, workflowConfigQuery.queryFn);
}
