import { Trans, t, Plural } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import { FC, useState } from 'react';
import { UploadDocsDrawer } from '../../../features/App/Aid/components/UploadDocsDrawer';
import { useDocFiles } from '../../../features/App/Aid/hooks/useDocFiles';
import { FilePickerProps } from '../../models/file-pick.model';
import classNames from 'classnames';

export const UploadFileBtn: FC<FilePickerProps> = ({
  docId,
  fileType = 'file',
  onPick,
  label,
}) => {
  const { i18n } = useLingui();
  const files = useDocFiles(docId!);
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
        <div className="h-full grid grid-rows-[auto,1fr] gap-1 place-items-center">
          <CloudUploadIcon fontSize="medium" />
          <p className="self-start">{label}</p>

          <p
            className={classNames(
              'text-xs',
              files.length > 0 ? 'text-secondary' : 'text-error'
            )}
          >
            (
            <Plural
              value={files.length}
              _0={
                <Trans id="UploadFileBtn.selectedCount_0">
                  Please select a file to upload
                </Trans>
              }
              one={
                <Trans id="UploadFileBtn.selectedCount_1">
                  Selected <strong>#</strong> file
                </Trans>
              }
              other={
                <Trans id="UploadFileBtn.selectedCount_many">
                  Selected <strong>#</strong> files
                </Trans>
              }
            ></Plural>
            )
          </p>
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
      />
    </>
  );
};
