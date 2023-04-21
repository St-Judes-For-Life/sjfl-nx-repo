import React from 'react';
import { Page } from './Page';
import classNames from 'classnames';

type ScaffoldProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export const Scaffold = ({ header, children, footer }: ScaffoldProps) => {
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
      <div className="scaffold-content flex flex-col overflow-y-auto">
        {children}
      </div>
      {footer}
    </Page>
  );
};
