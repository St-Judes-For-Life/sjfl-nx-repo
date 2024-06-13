import { FC } from 'react';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { NetworkError } from '../error-states/NetworkError';

type DataPageProps = {
  onRefresh: () => Promise<unknown>;
  hasError?: boolean;
  children: JSX.Element;
};
export const DataPage: FC<DataPageProps> = ({
  hasError = false,
  onRefresh: handleRefresh,
  children,
}) => {
  return (
    <PullToRefresh pullingContent={''} onRefresh={handleRefresh}>
      {hasError ? <NetworkError onRetry={handleRefresh} /> : children}
    </PullToRefresh>
  );
};
