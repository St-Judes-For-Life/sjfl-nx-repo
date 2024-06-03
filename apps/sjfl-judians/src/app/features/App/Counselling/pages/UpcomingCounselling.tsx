import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { useNavigate } from 'react-router-dom';
import { NoResults } from '../../../../shared/components/error-states/NoResults';
import { SessionList } from '../components/SessionList';
import { useFetchCounselling } from '../hooks/useFetchCounselling';

export const UpcomingCounselling = () => {
  const { i18n } = useLingui();
  const navigate = useNavigate();
  const { data: counsellings, isLoading } = useFetchCounselling({
    type: 'upcoming',
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!counsellings || counsellings.data.length === 0) {
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

  return <SessionList sessions={counsellings.data} />;
};
