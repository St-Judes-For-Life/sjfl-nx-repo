import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FormControl, FormLabel, OutlinedInput } from '@mui/material';
import { Logo } from '../../components/Logo/Logo';
import { Page } from '../../components/Page/Page';

export const LoginPage = () => {
  const { i18n } = useLingui();
  return (
    <Page>
      <div className="pt-40 flex justify-center">
        <Logo size="small"></Logo>
      </div>
      <div className="flex-1 p-8 w-full">
        <FormControl fullWidth={true}>
          <FormLabel>
            <Trans id="LoginPage.UID">UID</Trans>
          </FormLabel>
          <OutlinedInput
            autoFocus={true}
            fullWidth={true}
            placeholder={i18n._(
              t({ id: 'LoginPage.UID_Placeholder', message: 'Enter your UID' })
            )}
          />
        </FormControl>
        <FormControl fullWidth={true}>
          <FormLabel>Password</FormLabel>
          <OutlinedInput autoFocus={true} fullWidth={true} />
        </FormControl>
      </div>
    </Page>
  );
};
