import { Camera } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

export const checkCameraPermission = async () => {
  if (!Capacitor.isNativePlatform()) {
    return true;
  }
  const cameraPermission = await Camera.requestPermissions();
  return cameraPermission.camera === 'granted';
};
