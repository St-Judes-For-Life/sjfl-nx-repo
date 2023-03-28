import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import { FC, useContext, useState } from 'react';

import { BottomAppBar } from '../../shared/components/containers/BottomAppBar';
import { Page } from '../../shared/components/containers/Page';
import { Locale } from '../../shared/models/i18n.model';
import { Maybe } from '../../shared/models/maybe.model';

import { LocaleContext } from '../../shared/store/InternationalizationProvider';
import { locales } from '../../shared/utils/i18n';

type LanguageSelectionPageProps =
  | { canDismiss?: undefined; onDismiss?: undefined }
  | {
      canDismiss: boolean;
      onDismiss: () => void;
    };

export const LanguageSelectionPage: FC<LanguageSelectionPageProps> = (
  props
) => {
  const lingui = useLingui();
  const { locale, setLocale } = useContext(LocaleContext);
  const [selection, setSelection] = useState<Maybe<Locale>>(
    locales.find((locale) => locale.code === lingui.i18n.locale)
  );

  const localeSelectHandler = (locale: Locale) => {
    if (locale) {
      setSelection(locale);
    }
  };
  const continueHandler = () => {
    if (selection) {
      setLocale(selection);
    }
    props.onDismiss?.();
  };
  return (
    <Page>
      <AppBar position="sticky">
        <Toolbar>
          {props.canDismiss && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="close"
              onClick={props.onDismiss}
            >
              <CloseIcon />
            </IconButton>
          )}
          <h1>
            <Trans id="LanguageSelection.Header">
              Select your preferred language
            </Trans>
          </h1>
        </Toolbar>
      </AppBar>

      <div className="p-4">
        <ToggleButtonGroup
          orientation="vertical"
          value={selection || locale}
          color="primary"
          exclusive
          fullWidth={true}
          onChange={(e, code: Locale) => localeSelectHandler(code)}
        >
          {locales.map((locale) => (
            <ToggleButton
              value={locale}
              aria-label={locale.code}
              fullWidth={true}
              key={locale.code}
            >
              {locale.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <BottomAppBar>
        <div className="p-2">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={continueHandler}
            disabled={!selection}
          >
            <Trans id="LanguageSelection.Continue">Continue</Trans>
          </Button>
        </div>
      </BottomAppBar>
    </Page>
  );
};
