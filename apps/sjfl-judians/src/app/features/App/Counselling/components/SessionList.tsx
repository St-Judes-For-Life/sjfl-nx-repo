import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { ClientCounsellingSession } from '@sjfl/data';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoResults } from '../../../../shared/components/error-states/NoResults';
import { CounsellingSessionCard } from './CounsellingSessionCard';

type SessionListProps = {
  sessions: ClientCounsellingSession[] | undefined;
};

export const SessionList: FC<SessionListProps> = ({ sessions }) => {
  const navigate = useNavigate();
  const { i18n } = useLingui();
  if (!sessions || sessions.length === 0) {
    return (
      <NoResults
        message={i18n._(
          t({
            id: 'Counselling.Upcoming.NoResults',
            message: "You don't have any session scheduled",
          })
        )}
        imgUrl="/assets/schedule.svg"
        primaryAction={i18n._(
          t({
            id: 'Counselling.Upcoming.RaiseRequest',
            message: 'SCHEDULE A SESSION',
          })
        )}
        onPrimaryAction={() => navigate('../../schedule/new')}
      />
    );
  }
  return (
    <div className="grid gap-4 p-4">
      {sessions.map((session) => (
        <CounsellingSessionCard key={session.counsellingId} session={session} />
      ))}
    </div>
  );
};
