import { ClientCounsellingSession } from '@sjfl/data';
import { FC } from 'react';
import { CounsellingSessionCard } from './CounsellingSessionCard';

type SessionListProps = {
  sessions: ClientCounsellingSession[];
};

export const SessionList: FC<SessionListProps> = ({ sessions }) => {
  return (
    <div className="grid gap-4 p-4">
      {sessions.map((session) => (
        <CounsellingSessionCard key={session.counsellingId} session={session} />
      ))}
    </div>
  );
};
