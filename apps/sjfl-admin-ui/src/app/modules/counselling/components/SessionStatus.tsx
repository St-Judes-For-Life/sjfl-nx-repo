import { AdminCounsellingSession } from '@sjfl/data';
import {
  Button,
  Card,
  CardContent,
  Text,
  TextColors,
  useToast,
} from '@sjfl/ui';
import { FC } from 'react';
import { ApproveSessionDialog } from './dialogs/ApproveSessionDialog';
import { RejectSessionDialog } from './dialogs/RejectSessionDialog';
import { RescheduleSessionDialog } from './dialogs/RescheduleSessionDialog';
import { CounsellingStatus } from '@sjfl/data';
import { useQueryClient } from '@tanstack/react-query';

type SessionStatusProps = {
  session: AdminCounsellingSession;
};

export const SessionStatus: FC<SessionStatusProps> = ({ session }) => {
  const [date, time] = session.counsellingDate.split(' ');
  const updateDisabled = ['cancelled', 'completed'].includes(
    session.counsellingStatus.toLowerCase()
  );

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleUpdate = () => {
    toast({
      title: 'Session',
      description: 'Update successful',
    });

    queryClient.invalidateQueries({
      queryKey: ['counselling', session.counsellingId],
    });
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-2 justify-between h-full">
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="font-bold">Session Date</div>
              <div className="font-bold">Session Time</div>
            </div>
            <div className="flex justify-between">
              <div>{date}</div>
              <div>{time}</div>
            </div>
          </div>
          <div className="flex flex-col">
            <Text as="h2" className="text-base">
              Notes
            </Text>
            <Text className="text-base">{session.note}</Text>
          </div>
          <div className="flex gap-2">
            <Text as="h2" className="text-base">
              Status
            </Text>
            <Text
              color={getStatusColor(session.counsellingStatus)}
              className="text-base font-bold"
            >
              {session.counsellingStatus}
            </Text>
          </div>
          <div className="flex gap-2">
            <Text as="h2" className="text-base">
              {session.counsellingStatus.toLowerCase() === 'completed'
                ? 'Counseller Notes'
                : 'Reason'}
            </Text>
            <Text className="text-base">{session.statusNote ?? 'N/A'}</Text>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 justify-center gap-4 mt-4">
            <RejectSessionDialog
              id={session.counsellingId}
              currentStatus={session.counsellingStatus}
              disabled={updateDisabled}
              onUpdate={handleUpdate}
            />
            <RescheduleSessionDialog
              id={session.counsellingId}
              currentStatus={session.counsellingStatus}
              disabled={updateDisabled}
              onUpdate={handleUpdate}
            />
            <ApproveSessionDialog
              id={session.counsellingId}
              currentStatus={session.counsellingStatus}
              disabled={updateDisabled}
              onUpdate={handleUpdate}
            />
          </div>
        </div>
        <Button className="mt-auto" variant={'link'}>
          Show full history
        </Button>
      </CardContent>
    </Card>
  );
};

const getStatusColor = (status: CounsellingStatus): TextColors => {
  switch (status.toLocaleLowerCase()) {
    case 'requested':
      return 'muted';
    case 'rescheduled':
      return 'tertiary';
    case 'accepted':
    case 'completed':
      return 'success';
    case 'rejected':
      return 'error';
    default:
      return 'primary';
  }
};
