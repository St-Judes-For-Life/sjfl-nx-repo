import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';

import CloseIcon from '@mui/icons-material/Close';

export type HelpPageProps = {
  onClose: VoidFunction;
};

export const HelpPage = ({ onClose: handleClose }: HelpPageProps) => {
  const header = (
    <AppHeader
      title={i18n._(t({ id: 'Settings.Help', message: 'Help' }))}
      backEnabled
      backIcon={<CloseIcon />}
      onBack={handleClose}
    ></AppHeader>
  );
  return <Scaffold header={header}></Scaffold>;
};
