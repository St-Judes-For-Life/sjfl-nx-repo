import { AdminCounsellingSession } from '@sjfl/data';
import { Button, Card, CardContent, Text, TextColors } from '@sjfl/ui';
import { FC } from 'react';
import { ApproveSessionDialog } from './dialogs/ApproveSessionDialog';
import { RejectSessionDialog } from './dialogs/RejectSessionDialog';
import { RescheduleSessionDialog } from './dialogs/RescheduleSessionDialog';

type SessionStatusProps = {
  session: AdminCounsellingSession;
};

export const SessionStatus: FC<SessionStatusProps> = ({ session }) => {
  const statusTitle =
    session.counsellingStatus.toLowerCase() === 'approved'
      ? 'Approved'
      : 'Requested';
  const [date, time] = session.counsellingDate.split(' ');

  return (
    <Card>
      <CardContent className="flex flex-col gap-2 justify-between h-full">
        <div className="flex flex-col gap-4 ">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="font-bold">{statusTitle} Date</div>
              <div className="font-bold">{statusTitle} Time</div>
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
            <Text className="text-base">{session.statusNote}</Text>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 justify-center gap-4 mt-4">
            <RejectSessionDialog id={session.counsellingId} />
            <RescheduleSessionDialog id={session.counsellingId} />
            <ApproveSessionDialog id={session.counsellingId} />
          </div>
        </div>
        <Button className="mt-auto" variant={'link'}>
          Show full history
        </Button>
      </CardContent>
    </Card>
  );
};

const getStatusColor = (status: string): TextColors => {
  switch (status) {
    case 'Requested':
      return 'muted';
    case 'Approved':
      return 'success';
    default:
      return 'primary';
  }
};
