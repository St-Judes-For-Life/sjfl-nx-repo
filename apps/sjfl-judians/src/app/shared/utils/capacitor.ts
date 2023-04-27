import { Capacitor } from '@capacitor/core';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { StatusBar, Style } from '@capacitor/status-bar';
export async function capacitorInit() {
  if (Capacitor.isNativePlatform()) {
    await StatusBar.setStyle({ style: Style.Light });
    if (Capacitor.getPlatform() === 'ios') {
      await Keyboard.setAccessoryBarVisible({ isVisible: false });
      await Keyboard.setResizeMode({ mode: KeyboardResize.Body });
      await Keyboard.setScroll({ isDisabled: true });
    }
  }
}
