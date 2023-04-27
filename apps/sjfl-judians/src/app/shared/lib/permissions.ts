import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem } from '@capacitor/filesystem';
import { FilePicker } from '@capawesome/capacitor-file-picker';

export const checkCameraPermission = async () => {
  if (!Capacitor.isNativePlatform()) {
    return true;
  }
  const cameraPermission = await Camera.requestPermissions();
  return cameraPermission.camera === 'granted';
};
