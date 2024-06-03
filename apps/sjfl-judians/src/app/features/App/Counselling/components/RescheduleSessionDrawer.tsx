import { Trans } from '@lingui/macro';
import { Drawer, DrawerProps } from '@mui/material';
import { FC } from 'react';

type RescheduleSessionProps = {
  sessionId: string;
};

export const RescheduleSessionDrawer: FC<
  RescheduleSessionProps & DrawerProps
> = ({ sessionId, ...drawerProps }) => {
  return (
    <Drawer anchor="bottom" {...drawerProps}>
      <h3 className="text-center mt-2">
        <Trans id="session.reschedule">Reschedule Session</Trans>
      </h3>
      <div className="mt-4 px-2"></div>
    </Drawer>
  );
};
