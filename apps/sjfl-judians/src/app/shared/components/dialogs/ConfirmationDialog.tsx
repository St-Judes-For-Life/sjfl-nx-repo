import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Button from '@mui/material/Button';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { FC, ReactElement } from 'react';

type ConfirmationDialogProps = {
  icon?: ReactElement;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
  destructive?: boolean;
  confirmText?: string;
};

export const ConfirmationDialog: FC<DrawerProps & ConfirmationDialogProps> = ({
  icon,
  text,
  destructive = false,
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
    <Drawer anchor="bottom" {...props} onClose={onCancel}>
      <div className="p-4 flex flex-col gap-4 items-center">
        {icon}
        <h4 className="text-lg font-semibold">{text}</h4>
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
            color={destructive ? 'error' : 'primary'}
            onClick={onConfirm}
            fullWidth
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Drawer>
  );
};
