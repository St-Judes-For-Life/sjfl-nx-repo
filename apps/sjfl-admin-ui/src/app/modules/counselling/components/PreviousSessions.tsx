import { Card, CardContent, Text } from '@sjfl/ui';
import { FC } from 'react';
import { useFetchPreviousSessions } from '../hooks/useFetchPreviousSessions';
import { CalendarDays, WatchIcon } from 'lucide-react';
import { PreviousSessionsSkeleton } from './skeletons/PreviousSessionsSkeleton';

type PreviousSessionsProps = {
  uid: string;
};

export const PreviousSessions: FC<PreviousSessionsProps> = ({ uid }) => {
  const { data: previousSessionResp, isLoading: isFetchingPreviousSessions } =
    useFetchPreviousSessions(uid);

  if (isFetchingPreviousSessions) {
    return <PreviousSessionsSkeleton />;
  }

  if (previousSessionResp) {
    const sessions = previousSessionResp.data.data;

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
        <CardContent className="flex flex-col gap-2">
          <Text as="h2" className="text-base font-bold">
            Previous Sessions
          </Text>

          {sessions.map((session) => {
            const [date, time] = session.counsellingDate.split(' ');
            return (
              <Card key={session.counsellingId}>
                <CardContent className="flex flex-col justify-center gap-2">
                  <div className="flex gap-2">
                    <CalendarDays />
                    <Text className="text-base">{date}</Text>
                  </div>
                  <div className="flex gap-2">
                    <WatchIcon />
                    <Text className="text-base">{time}</Text>
                  </div>
                  <Text className="text-base">{session.note}</Text>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>
    );
  }
};
