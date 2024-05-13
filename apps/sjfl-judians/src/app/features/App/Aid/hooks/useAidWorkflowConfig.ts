import { useLoadedQuery } from '../../../../shared/hooks/useLoadedQuery';
import { workflowConfigQuery } from '../queries/aid-workflow.query';

export function useAidWorkflowConfig() {
  return useLoadedQuery(
    workflowConfigQuery.queryKey,
    workflowConfigQuery.queryFn
  );
}
