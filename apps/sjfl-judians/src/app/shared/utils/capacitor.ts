import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
export async function capacitorInit() {
  if (Capacitor.isNativePlatform()) {
    await StatusBar.setStyle({ style: Style.Light });
    // await Keyboard.setResizeMode({ mode: KeyboardResize.None });
    // await Keyboard.setScroll({ isDisabled: false });
  }
}
