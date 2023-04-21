import { Trans, t } from '@lingui/macro';
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

import { locales } from '../../shared/utils/i18n';
import { LocaleContext } from '../../shared/store/context/LocaleContext';
import { Scaffold } from '../../shared/components/containers/Scaffold';
import { AppHeader } from '../../shared/components/containers/AppHeader';

type LanguageSelectionPageProps =
  | { canDismiss?: undefined; onDismiss?: undefined }
  | {
      canDismiss: boolean;
      onDismiss: () => void;
    };

export const LanguageSelectionPage: FC<LanguageSelectionPageProps> = (
  props
) => {
  const { i18n } = useLingui();
  const { locale, setLocale } = useContext(LocaleContext);
  const [selection, setSelection] = useState<Maybe<Locale>>(
    locales.find((locale) => locale.code === i18n.locale)
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

  const header = (
    <AppHeader
      title={i18n._(
        t({
          id: 'LanguageSelection.Heade',
          message: 'Select your preferred language',
        })
      )}
      backEnabled={props.canDismiss}
      onBack={props.onDismiss}
    />
  );

  const footer = (
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
  );
  return (
    <Scaffold header={header} footer={footer}>
      <div className="p-4">
        <ToggleButtonGroup
          orientation="vertical"
          value={selection || locale}
          color="primary"
          exclusive
          fullWidth
          onChange={(e, code: Locale) => localeSelectHandler(code)}
        >
          {locales.map((locale) => (
            <ToggleButton
              value={locale}
              aria-label={locale.code}
              fullWidth
              key={locale.code}
            >
              {locale.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </Scaffold>
  );
};
