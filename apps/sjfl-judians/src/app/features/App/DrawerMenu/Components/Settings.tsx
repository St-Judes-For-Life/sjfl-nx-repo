import { Trans } from '@lingui/react';
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Box,
  FormControl,
  InputLabel,
  Grid,
  Paper,
} from '@mui/material';
import { LanguageButton } from '../../../../shared/components/language/LanguageButton';

export const Settings = () => {
  return (
    <section className="grid gap-5 w-full">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Trans id="Settings.Notification">Notification</Trans>
            </Grid>
            <Grid item xs={6}>
              <Switch defaultChecked onChange={() => {}} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Trans id="Settings.Language">Language</Trans>
            </Grid>
            <Grid item xs={6}>
              <LanguageButton></LanguageButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button fullWidth variant="contained" onClick={() => {}}>
        <Trans id="Btn.save"></Trans>
      </Button>
    </section>
  );
};
