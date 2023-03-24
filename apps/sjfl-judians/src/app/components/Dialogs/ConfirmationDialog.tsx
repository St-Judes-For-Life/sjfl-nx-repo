import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Button from '@mui/material/Button';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { FC, ReactElement } from 'react';

type Props = {
  icon?: ReactElement;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDangerous?: boolean;
  confirmText?: string;
};

export const ConfirmationDialog: FC<DrawerProps & Props> = ({
  icon,
  text,
  isDangerous = false,
  confirmText,
  onCancel,
  onConfirm,
  ...props
}) => {
  const { i18n } = useLingui();
  confirmText ??= i18n._(
    t({ id: 'ConfirmDialog.Confirm', message: 'CONFIRM' })
  );
  return (
    <Drawer anchor="bottom" {...props}>
      <div className="p-4 flex flex-col gap-4 items-center">
        {icon}
        {text}
        <div className="flex gap-4 w-full">
          <Button
            variant="outlined"
            color="primary"
            onClick={onCancel}
            fullWidth
          >
            <Trans id="ConfirmDialog.Cancel">CANCEL</Trans>
          </Button>
          <Button
            variant="contained"
            color={isDangerous ? 'error' : 'primary'}
            onClick={onConfirm}
            fullWidth
          >
            <Trans id="ConfirmDialog.Confirm">{confirmText}</Trans>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
