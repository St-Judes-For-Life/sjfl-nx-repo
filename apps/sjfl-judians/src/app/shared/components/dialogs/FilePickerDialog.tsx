import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Trans, t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CollectionsIcon from '@mui/icons-material/Collections';
import FolderIcon from '@mui/icons-material/Folder';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { FC } from 'react';
import { toast } from 'react-toastify';
import {
  FilePickerCancelled,
  GalleryPickCancelled,
} from '../../lib/exceptions/file-picker.exception';
import { base64toFile, webPathToFile } from '../../lib/file';
import { checkCameraPermission } from '../../lib/permissions';
import { FilePickerProps } from '../../models/file-pick.model';
import { DrawerActionBtn } from '../buttons/DrawerActionBtn';

export const FilePickerDialog: FC<DrawerProps & FilePickerProps> = ({
  open,
  onClose,
  label,
  fileType = 'image+file',
  onPick,
}) => {
  const { i18n } = useLingui();
  label ??= i18n._(
    t({ id: 'FilePickerDialog.Title', message: 'Select a file to upload' })
  );

  const galleryHandler = async () => {
    if (!Capacitor.isNativePlatform()) {
      try {
        const result = await Camera.pickImages({
          presentationStyle: 'popover',
        });
        return onPick(
          await Promise.all(
            result.photos.map(async (photo, index) => {
              return await webPathToFile(
                Capacitor.isNativePlatform() ? photo.path! : photo.webPath,
                `${label}(${index}).${photo.format}`
              );
            })
          )
        );
      } catch (err) {
        if (new GalleryPickCancelled().message === (err as Error).message) {
          return;
        }

        toast.error(
          i18n._(
            t({
              id: 'FilePickerDialog.GalleryError',
              message: 'Unable to read image',
            })
          )
        );
        return;
      }
    } else {
      try {
        const result = await FilePicker.pickImages({
          multiple: true,
          readData: true,
        });

        return onPick(
          result.files.map((file) =>
            base64toFile(file.data!, file.name, file.mimeType)
          )
        );
      } catch (err) {
        if (new FilePickerCancelled().message === (err as Error).message) {
          return;
        }
        toast.error(
          i18n._(
            t({
              id: 'FilePickerDialog.GalleryError',
              message: 'Unable to read image',
            })
          )
        );
      }
    }
  };

  const cameraHandler = async () => {
    const hasPermission = await checkCameraPermission();

    if (hasPermission) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Base64,
          webUseInput: true,
          source: CameraSource.Camera,
        });

        onPick([
          base64toFile(
            photo.base64String!,
            `${label}.${photo.format}`,
            `image/${photo.format}`
          ),
        ]);
      } catch (err) {
        toast.error(
          i18n._(
            t({
              id: 'FilePickerDialog.PictureError',
              message: 'Unable to take picture',
            })
          )
        );
        return;
      }
    }
  };

  const fileHandler = async () => {
    try {
      const result = await FilePicker.pickFiles({
        types: ['application/pdf', 'application/doc', 'image/jpg', 'image/png'],
        readData: true,
      });

      return onPick(
        result.files.map((file) =>
          base64toFile(file.data!, file.name, file.mimeType)
        )
      );
    } catch (err) {
      if (new FilePickerCancelled().message === (err as Error).message) return;
      toast.error(
        i18n._(
          t({
            id: 'FilePickerDialog.FileError',
            message: 'Unable to select files',
          })
        )
      );
    }
  };

  return (
    <Drawer onClose={onClose} anchor="bottom" open={open} sx={{ zIndex: 9999 }}>
      <h3 className="text-center mt-2">{label}</h3>
      <div className="mt-4 px-2">
        {(fileType === 'image' || fileType === 'image+file') && (
          <>
            <DrawerActionBtn icon={<CameraAltIcon />} onClick={cameraHandler}>
              <Trans id="FilePicker.ClickPicture">Click a Picture</Trans>
            </DrawerActionBtn>
            <DrawerActionBtn
              icon={<CollectionsIcon />}
              onClick={galleryHandler}
            >
              <Trans id="FilePicker.SelectGallery">Select from Gallery</Trans>
            </DrawerActionBtn>
          </>
        )}
        {(fileType === 'file' || fileType === 'image+file') && (
          <DrawerActionBtn icon={<FolderIcon />} onClick={fileHandler}>
            <Trans id="FilePicker.SelectFile">Select from files</Trans>
          </DrawerActionBtn>
        )}
      </div>
    </Drawer>
  );
};
