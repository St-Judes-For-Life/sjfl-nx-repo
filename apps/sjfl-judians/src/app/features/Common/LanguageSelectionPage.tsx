import { Trans, t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { FC, useContext, useState } from 'react';

import { BottomAppBar } from '../../shared/components/containers/BottomAppBar';
import { Locale } from '../../shared/models/i18n.model';
import { Maybe } from '../../shared/models/maybe.model';

import { AppHeader } from '../../shared/components/containers/AppHeader';
import { Scaffold } from '../../shared/components/containers/Scaffold';
import { LocaleContext } from '../../shared/store/context/LocaleContext';
import { locales } from '../../shared/utils/i18n';
import { useLocale } from '../../shared/hooks/useLocale';

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
  const { locale, setLocale } = useLocale();
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
          id: 'LanguageSelection.Header',
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
