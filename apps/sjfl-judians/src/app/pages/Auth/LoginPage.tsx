import { FormControl, FormLabel, OutlinedInput } from '@mui/material';
import { Logo } from '../../components/Logo/Logo';
import { Page } from '../../components/Page/Page';

export const LoginPage = () => {
  return (
    <Page>
      <div className="pt-40 flex justify-center">
        <Logo size="small"></Logo>
      </div>
      <div className="flex-1 p-8 w-full">
        <FormControl fullWidth={true}>
          <FormLabel>UID</FormLabel>
          <OutlinedInput autoFocus={true} fullWidth={true} />
        </FormControl>
      </div>
    </Page>
  );
};
