import { i18n } from '@lingui/core';
import { Trans, t } from '@lingui/macro';
import { Switch } from '@mui/material';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';
import { LanguageButton } from '../../../../shared/components/language/LanguageButton';

import CloseIcon from '@mui/icons-material/Close';

export type SettingPageProps = {
  onClose: VoidFunction;
};

export const SettingsPage = ({ onClose: handleClose }: SettingPageProps) => {
  const header = (
    <AppHeader
      title={i18n._(t({ id: 'Settings.Header', message: 'Settings' }))}
      backEnabled
      backIcon={<CloseIcon />}
      onBack={handleClose}
    ></AppHeader>
  );
  return (
    <Scaffold header={header}>
      <section className="grid gap-5 w-full mt-4 p-4">
        <div className="flex justify-between items-center">
          <Trans id="Settings.Notification">Notifications</Trans>
          <Switch defaultChecked onChange={() => {}} />
        </div>
        <div className="flex justify-between items-center">
          <Trans id="Settings.Language">Language</Trans>
          <LanguageButton></LanguageButton>
        </div>
      </section>
    </Scaffold>
  );
};
