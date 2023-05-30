import { useQuery } from '@tanstack/react-query';
import { workflowConfigQuery } from '../queries/aid-workflow.query';
import { useLoadedQuery } from '../../../../shared/hooks/useLoadedQuery';

export function useAidWorkflowConfig() {
  return useLoadedQuery(
    workflowConfigQuery.queryKey,
    workflowConfigQuery.queryFn
  );
}
