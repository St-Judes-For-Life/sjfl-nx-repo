import { CircularProgress } from '@mui/material';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Logo } from '../../components/Logo/Logo';
import { Page } from '../../components/Page/Page';

export default function SplashPage() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Page
      className={classNames(
        'flex items-center justify-center',
        isLoading && 'flex-col justify-around'
      )}
    >
      <Logo></Logo>
      {isLoading && (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </Page>
  );
}
