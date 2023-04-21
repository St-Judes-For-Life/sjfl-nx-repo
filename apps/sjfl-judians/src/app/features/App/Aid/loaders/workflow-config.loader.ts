import { LoaderFunction } from 'react-router-dom';
import { queryClient } from '../../../../shared/utils/react-query';
import { workflowConfigQuery } from '../queries/aid-workflow.query';

export const workflowConfigLoader: LoaderFunction = async ({ params }) => {
  queryClient.ensureQueryData(workflowConfigQuery);
  return null;
};
