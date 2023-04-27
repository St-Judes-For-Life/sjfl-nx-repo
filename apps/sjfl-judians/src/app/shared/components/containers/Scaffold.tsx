import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import classNames from 'classnames';
import React, {
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Page } from './Page';

const defaultPadding = 'calc(3em + env(safe-area-inset-bottom))';

type ScaffoldProps = {
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export const Scaffold: FC<PropsWithChildren<ScaffoldProps>> = ({
  header,
  children,
  footer,
}) => {
  const [keyboardHeight, setKeyboardHeight] = useState<string>(defaultPadding);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasChildScaffold = !!ref.current?.querySelector('.scaffold-content');

    if (Capacitor.getPlatform() === 'ios' && !hasChildScaffold) {
      Keyboard.addListener('keyboardWillShow', (e) => {
        setKeyboardHeight(e.keyboardHeight + 'px');
      });
      Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardHeight(defaultPadding);
      });

      return () => {
        Keyboard.removeAllListeners();
      };
    }
  }, []);

  return (
    <Page
      className={classNames(
        'grid',
        header && footer && 'grid-rows-[auto,1fr,auto]',
        !header && footer && 'grid-rows-[1fr,auto]',
        header && !footer && 'grid-rows-[auto,1fr]',
        !header && !footer && 'grid-rows-[1fr]'
      )}
    >
      {header}
      <div
        className="scaffold-content flex flex-col"
        ref={ref}
        style={{ '--padding-bottom': keyboardHeight } as React.CSSProperties}
      >
        {children}
      </div>
      {footer}
    </Page>
  );
};
