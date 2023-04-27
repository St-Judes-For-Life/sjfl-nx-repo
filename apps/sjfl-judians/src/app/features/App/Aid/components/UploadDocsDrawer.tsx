import { Trans, t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { FC, useState } from 'react';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { BottomAppBar } from '../../../../shared/components/containers/BottomAppBar';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';
import { NoResults } from '../../../../shared/components/error-states/NoResults';
import { FilePickerProps } from '../../../../shared/models/file-pick.model';
import { useAidRequest } from '../hooks/useAidRequest';
import { FilePickerDialog } from '../../../../shared/components/dialogs/FilePickerDialog';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';

type UploadDocsDrawerProps = FilePickerProps &
  DrawerProps & {
    docId: string;
    onDismiss: () => void;
  };

export const UploadDocsDrawer: FC<UploadDocsDrawerProps> = ({
  docId,
  label,
  open,
  onClose,
  onPick,
  onDismiss,
}) => {
  const { i18n } = useLingui();
  const { request } = useAidRequest();
  const { docs = [] } = request!;
  const doc = docs.find((doc) => doc.docId === docId);
  const files = doc?.files || [];

  const [dialogOpen, setDialogOpen] = useState(false);

  const onAdd = () => {
    setDialogOpen(true);
  };

  const header = (
    <AppHeader
      title={i18n._('UploadFiles.title')}
      subtitle={label}
      backEnabled={true}
      backIcon={<CloseIcon />}
      slots={{
        right: (
          <IconButton onClick={onAdd}>
            <AddCircleOutlineIcon color="primary" />
          </IconButton>
        ),
      }}
      onBack={onDismiss}
    ></AppHeader>
  );
  const footer = (
    <BottomAppBar>
      <div className="p-2">
        <Button fullWidth variant="contained" onClick={onDismiss}>
          <Trans id="Btn.Close">CLOSE</Trans>
        </Button>
      </div>
    </BottomAppBar>
  );

  return (
    <>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        className="overflow-hidden"
      >
        <Scaffold header={header} footer={footer}>
          {files.length === 0 && (
            <NoResults
              message={i18n._(
                t({
                  id: 'UploadFilesDrawer.NoFiles',
                  message: 'No uploads yet!',
                })
              )}
              primaryAction={i18n._(
                t({
                  id: 'Btn.Upload',
                  message: 'UPLOAD',
                })
              )}
              fullWidth={false}
              onPrimaryAction={onAdd}
              buttonVariant="outlined"
            />
          )}
          <div className="p-6 flex flex-col gap-6">
            {files.length > 0 &&
              files.map((file) => (
                <div
                  key={file.id}
                  className="border-secondary border-2 gap-2 rounded-xl p-4 grid grid-cols-[auto,1fr,auto] items-center"
                >
                  <ImageIcon />
                  <p>{file.file.name}</p>
                  <IconButton>
                    <DeleteIcon color="error" />
                  </IconButton>
                </div>
              ))}
          </div>
        </Scaffold>
      </Drawer>
      <FilePickerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        label={label}
        onPick={(files) => {
          setDialogOpen(false);
          onPick(files);
        }}
      />
    </>
  );
};
