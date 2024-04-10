import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import { NoResults } from '../../../../shared/components/error-states/NoResults';
import { useNavigate } from 'react-router-dom';
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

  if (counsellings?.data.length === 0) {
    return (
      <NoResults
        message={i18n._(
          t({
            id: 'Counselling.Upcoming.NoResults',
            message: "You don't have any session scheduled",
          })
        )}
        imgUrl="/assets/schedule_1.svg"
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
};
