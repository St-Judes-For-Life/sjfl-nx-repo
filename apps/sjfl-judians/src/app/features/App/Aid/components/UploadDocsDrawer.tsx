import { Trans, t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { BottomAppBar } from '../../../../shared/components/containers/BottomAppBar';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';
import { ConfirmationDialog } from '../../../../shared/components/dialogs/ConfirmationDialog';
import { FilePickerDialog } from '../../../../shared/components/dialogs/FilePickerDialog';
import { NoResults } from '../../../../shared/components/error-states/NoResults';
import { SlideUp } from '../../../../shared/helpers/transitions/DialogTransitions';
import { FilePickerProps } from '../../../../shared/models/file-pick.model';
import { useAidRequest } from '../hooks/useAidRequest';
import { useDocFiles } from '../hooks/useDocFiles';

type UploadDocsDrawerProps = FilePickerProps &
  DialogProps & {
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

  const files = useDocFiles(docId!);

  const [fileDialogOpen, setFileDialogOpen] = useState(false);

  const onAdd = () => {
    setFileDialogOpen(true);
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
      <Dialog
        fullScreen
        open={open}
        TransitionComponent={SlideUp}
        onClose={onClose}
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
          <div className="p-6 pb-8">
            <List className="flex flex-col gap-6 !p-0">
              {files.length > 0 &&
                files.map((docFile) => (
                  <UploadDocsDrawerLine
                    key={docFile.id}
                    id={docFile.id}
                    file={docFile.file}
                    docId={docId}
                  />
                ))}
            </List>
          </div>
        </Scaffold>
      </Dialog>
      <FilePickerDialog
        open={fileDialogOpen}
        onClose={() => setFileDialogOpen(false)}
        label={label}
        onPick={(files) => {
          setFileDialogOpen(false);
          onPick(files);
        }}
      />
    </>
  );
};

type UploadDocsDrawerLineProps = { id: string; file: File; docId: string };

const UploadDocsDrawerLine: FC<UploadDocsDrawerLineProps> = ({
  id: fileId,
  file,
  docId,
}) => {
  const { i18n } = useLingui();
  const { removeFile } = useAidRequest();
  const [deleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState(false);

  const onDelete = () => {
    setDeleteConfirmDialogOpen(true);
  };

  const onConfirmDelete = (docId: string, fileId: string) => {
    removeFile(docId, fileId);
    toast.info(
      i18n._(
        t({
          id: 'UploadDocsDrawer.FileDeleted',
          message: 'File was removed successfully!',
        })
      ),
      {
        autoClose: 1000,
      }
    );
  };
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton onClick={() => onDelete()}>
            <DeleteIcon color="error" />
          </IconButton>
        }
        className="border-secondary border-2 gap-2 rounded-xl p-4 grid grid-cols-[auto,1fr,auto] items-center"
      >
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText primary={file.name} />
        </ListItemButton>
      </ListItem>
      <ConfirmationDialog
        text={i18n._(
          t({
            id: 'UploadDocsDrawer.ConfirmDelete',
            message: 'Are you sure you want to delete this file?',
          })
        )}
        destructive={true}
        icon={<DeleteIcon color="error" />}
        open={deleteConfirmDialogOpen}
        confirmText={i18n._(
          t({
            id: 'Btn.Delete',
            message: 'DELETE',
          })
        )}
        onCancel={() => setDeleteConfirmDialogOpen(false)}
        onConfirm={() => onConfirmDelete(docId, fileId)}
      />
    </>
  );
};
