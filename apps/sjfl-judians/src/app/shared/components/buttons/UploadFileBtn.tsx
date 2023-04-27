import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';
import { UploadDocsDrawer } from '../../../features/App/Aid/components/UploadDocsDrawer';
import { FilePickerProps } from '../../models/file-pick.model';

export const UploadFileBtn: FC<FilePickerProps> = ({
  docId,
  fileType = 'file',
  onPick,
  files,
  label,
}) => {
  const { i18n } = useLingui();
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  label ??= i18n._(
    t({
      id: 'UploadFiles.title',
      message: 'Upload File(s)',
    })
  );

  return (
    <>
      <Button
        variant="text"
        fullWidth
        className="!py-4 !px-2 !bg-white"
        onClick={openDialog}
      >
        <div className="h-full grid grid-rows-[auto,1fr] gap-2 place-items-center">
          <CloudUploadIcon fontSize="medium" />
          <p className="self-start">{label}</p>
        </div>
      </Button>
      <UploadDocsDrawer
        docId={docId || ''}
        open={dialogOpen}
        onClose={closeDialog}
        onDismiss={closeDialog}
        fileType={fileType}
        label={label}
        onPick={onPick}
        files={files}
      />
    </>
  );
};
