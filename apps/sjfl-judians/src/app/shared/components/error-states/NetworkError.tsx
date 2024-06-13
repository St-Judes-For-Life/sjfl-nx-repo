import { Button } from '@mui/material';
import { FC } from 'react';

type NetworkErrorProps = {
  onRetry: VoidFunction;
};

export const NetworkError: FC<NetworkErrorProps> = ({
  onRetry: handleRetry,
}) => {
  return (
    <div className="h-full flex flex-col justify-center items-center p-4">
      <h2 className="font-bold text-2xl">Oops, something is not right</h2>
      <img
        className="h-60 w-60"
        src="assets/server_issue.svg"
        alt="server issue"
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleRetry}
      >
        Retry
      </Button>
    </div>
  );
};
