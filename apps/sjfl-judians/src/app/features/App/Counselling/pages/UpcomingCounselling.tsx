import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { NoResults } from '../../../../shared/components/error-states/NoResults';
import { useNavigate } from 'react-router-dom';
import { useFetchCounselling } from '../hooks/useFetchCounselling';
import { CounsellingSessionCard } from '../components/CounsellingSessionCard';

export const UpcomingCounselling = () => {
  const { i18n } = useLingui();
  const navigate = useNavigate();
  const { data: counsellings, isLoading } = useFetchCounselling({
    type: 'upcoming',
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  console.log(counsellings);

  if (counsellings?.data.length === 0) {
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

  return counsellings?.data.map((session) => (
    <CounsellingSessionCard key={session.counsellingId} session={session} />
  ));
};
