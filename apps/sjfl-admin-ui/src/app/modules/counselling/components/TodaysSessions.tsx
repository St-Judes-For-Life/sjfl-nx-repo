import { Card, Text } from '@sjfl/ui';
import { SessionSnippet } from './SessionSnippet';
import { useTodaysSessions } from '../hooks/useTodaysSession';
import { CalendarDays } from 'lucide-react';
import { SessionSnippetSkeleton } from './skeletons/SessionSnippetSkeleton';

export const TodaysSessions = () => {
  const { data: sessionResponse, isLoading } = useTodaysSessions();

  const sessionsFound =
    sessionResponse?.data.data && sessionResponse?.data.data.length > 0;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <SessionSnippetSkeleton></SessionSnippetSkeleton>
        <SessionSnippetSkeleton></SessionSnippetSkeleton>
        <SessionSnippetSkeleton></SessionSnippetSkeleton>
        <SessionSnippetSkeleton></SessionSnippetSkeleton>
        <SessionSnippetSkeleton></SessionSnippetSkeleton>
      </div>
    );
  }

  if (sessionsFound) {
    return (
      <div className="flex flex-col gap-4">
        <Text as={'h4'}>Today's Sessions</Text>
        {sessionResponse?.data.data.map((session) => (
          <SessionSnippet
            key={session.counsellingId}
            session={session}
          ></SessionSnippet>
        ))}
      </div>
    );
  }

  return (
    <Card className="h-full p-4 flex flex-col justify-center items-center">
      <CalendarDays size={120} />
      <Text as={'h3'}>No Sessions for today</Text>
    </Card>
  );
};
