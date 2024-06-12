import { Trans } from '@lingui/macro';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import { CounsellingStatus } from '@sjfl/data';
import { useQueryClient } from '@tanstack/react-query';
import { CalendarClockIcon, CalendarX2Icon } from 'lucide-react';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DrawerActionBtn } from '../../../../shared/components/buttons/DrawerActionBtn';
import { ConfirmationDialog } from '../../../../shared/components/dialogs/ConfirmationDialog';
import { useCancelSession } from '../hooks/useCancelSession';

type CounsellingActionsDrawerProps = {
  sessionId: string;
  sessionStatus: CounsellingStatus;
};

export const CounsellingActionsDrawer: FC<
  DrawerProps & CounsellingActionsDrawerProps
> = ({ sessionId, sessionStatus, ...drawerProps }) => {
  const navigate = useNavigate();

  const actionsDisabled = ['COMPLETED', 'CANCELLED', 'REJECTED'].includes(
    sessionStatus.toUpperCase()
  );

  const queryClient = useQueryClient();

  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const { mutateAsync: cancelSession, isPending: isCancellingSession } =
    useCancelSession();

  const handleCancelSession = () => {
    closeActionDrawer();
    setShowConfirmCancel(true);
  };

  const handleRescheduleSession = () => {
    closeActionDrawer();
    navigate('/counselling/update/' + sessionId);
  };

  const closeActionDrawer = () => {
    drawerProps.onClose?.({}, 'escapeKeyDown');
  };

  const handleConfirmCancelSession = async () => {
    const resp = await cancelSession(sessionId);

    if (resp.status === 200) {
      queryClient.invalidateQueries({ queryKey: ['counselling', sessionId] });
      queryClient.invalidateQueries({
        queryKey: ['counselling', 'history', sessionId],
      });
      handleCloseConfirmCancel();
      toast.success('Session Cancelled');
    }
  };

  const handleCloseConfirmCancel = () => {
    setShowConfirmCancel(false);
  };

  return (
    <>
      <Drawer anchor="bottom" {...drawerProps}>
        <h3 className="text-center mt-2">
          <Trans id="session.actions">Session Actions</Trans>
        </h3>
        <div className="mt-4 px-2">
          <DrawerActionBtn
            icon={<CalendarClockIcon />}
            onClick={handleRescheduleSession}
            disabled={actionsDisabled}
          >
            <Trans id="session.reschedule">Reschedule</Trans>
          </DrawerActionBtn>
          <DrawerActionBtn
            destructive
            icon={<CalendarX2Icon />}
            onClick={handleCancelSession}
            disabled={actionsDisabled}
          >
            <Trans id="session.cancel">Cancel</Trans>
          </DrawerActionBtn>
        </div>
      </Drawer>

      <ConfirmationDialog
        open={showConfirmCancel}
        onClose={handleCloseConfirmCancel}
        // TODO: Add translations
        title="Cancel Session"
        text="Are you sure you want to Cancel this session?"
        destructive
        onConfirm={handleConfirmCancelSession}
        confirmText="YES"
        cancelText="NO"
        onCancel={handleCloseConfirmCancel}
        loading={isCancellingSession}
      />
    </>
  );
};
