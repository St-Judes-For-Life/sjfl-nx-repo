import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

export async function capacitorInit() {
  if (Capacitor.isNativePlatform())
    await StatusBar.setStyle({ style: Style.Light });
}
