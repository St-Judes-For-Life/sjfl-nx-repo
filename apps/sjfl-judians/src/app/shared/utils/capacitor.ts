import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
// import { Keyboard, KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';
export async function capacitorInit() {
  if (Capacitor.isNativePlatform()) {
    await StatusBar.setStyle({ style: Style.Light });
    // await Keyboard.setAccessoryBarVisible({ isVisible: false });
    // await Keyboard.setResizeMode({ mode: KeyboardResize.Body });

    // await Keyboard.setScroll({ isDisabled: false });
  }
}
