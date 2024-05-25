import { Button, Text } from '@sjfl/ui';
import { ServerCrash } from 'lucide-react';
import { FC } from 'react';

type RetrySearchProps = {
  onRetry: VoidFunction;
};

export const RetrySearch: FC<RetrySearchProps> = ({ onRetry }) => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Text as={'h3'}>An error occurred</Text>
      <ServerCrash size={120} />
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
};
