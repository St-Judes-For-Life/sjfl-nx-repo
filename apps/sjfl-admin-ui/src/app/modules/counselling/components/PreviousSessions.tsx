import { Card, CardContent, Text } from '@sjfl/ui';
import { FC } from 'react';
import { useFetchPreviousSessions } from '../hooks/useFetchPreviousSessions';
import { CalendarDays, WatchIcon } from 'lucide-react';
import { PreviousSessionsSkeleton } from './skeletons/PreviousSessionsSkeleton';
import { Link } from 'react-router-dom';
import { getStatusColor } from './SessionStatus';

type PreviousSessionsProps = {
  uid: string;
  currentSessionId: string;
};

export const PreviousSessions: FC<PreviousSessionsProps> = ({
  uid,
  currentSessionId,
}) => {
  const { data: previousSessionResp, isLoading: isFetchingPreviousSessions } =
    useFetchPreviousSessions(uid);

  if (isFetchingPreviousSessions) {
    return <PreviousSessionsSkeleton />;
  }

  if (previousSessionResp) {
    const sessions = previousSessionResp.data.data.filter(
      (session) => session.counsellingId !== currentSessionId
    );

    if (sessions.length === 0) {
      return (
        <Card className="h-full p-4 flex flex-col justify-center items-center">
          <CalendarDays size={120} />
          <Text as={'h3'}>No previous sessions</Text>
        </Card>
      );
    }

    return (
      <Card>
        <CardContent className="flex flex-col gap-2 h-0 min-h-full overflow-y-auto">
          <Text as="h2" className="text-base font-bold">
            Previous Sessions
          </Text>

          {sessions.map((session) => {
            const [date, time] = session.counsellingDate.split(' ');
            return (
              <Card key={session.counsellingId}>
                <Link to={'/counselling/' + session.counsellingId}>
                  <CardContent className="flex flex-col justify-center gap-2">
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <CalendarDays />
                        <Text className="text-base">{date}</Text>
                      </div>
                      <Text className="font-semibold">
                        {session.counsellingId}
                      </Text>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <WatchIcon />
                        <Text className="text-base">{time}</Text>
                      </div>
                      <Text
                        color={getStatusColor(session.counsellingStatus)}
                        className="font-semibold"
                      >
                        {session.counsellingStatus}
                      </Text>
                    </div>
                    <Text className="text-base">{session.note}</Text>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    );
  }
};
