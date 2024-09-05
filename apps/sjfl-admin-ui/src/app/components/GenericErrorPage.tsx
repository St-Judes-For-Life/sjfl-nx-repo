import { Button, Text } from '@sjfl/ui';
import { ServerCrash } from 'lucide-react';
import { useNavigate, useRouteError } from 'react-router-dom';

export const GenericErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);

  const handleRefresh = () => {
    navigate(0);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center gap-2">
      <Text as={'h2'}>Oops, Something broke!</Text>
      <ServerCrash size={128} />
      <Button variant={'tertiary'} onClick={handleRefresh}>
        Refresh
      </Button>
    </div>
  );
};
