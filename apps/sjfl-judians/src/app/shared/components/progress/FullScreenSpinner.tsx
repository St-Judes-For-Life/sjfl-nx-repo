import CircularProgress from '@mui/material/CircularProgress';
import { Page } from '../containers/Page';

export const FullScreenSpinner = () => {
  return (
    <Page className="flex items-center justify-center">
      <CircularProgress />
    </Page>
  );
};
