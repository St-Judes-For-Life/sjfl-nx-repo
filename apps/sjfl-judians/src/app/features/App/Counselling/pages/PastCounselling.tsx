import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { NoResults } from '../../../../shared/components/error-states/NoResults';
import { SessionList } from '../components/SessionList';
import { useFetchCounselling } from '../hooks/useFetchCounselling';
import PullToRefresh from 'react-simple-pull-to-refresh';

export const PastCounselling = () => {
  const { i18n } = useLingui();
  const {
    data: counsellings,
    isLoading,
    refetch,
  } = useFetchCounselling({
    type: 'past',
  });

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!counsellings || counsellings.data.length === 0) {
    return (
      <NoResults
        message={i18n._(
          t({
            id: 'Counselling.past.NoResults',
            message: "You don't have any past sessions",
          })
        )}
        imgUrl="/assets/aid.svg"
      />
    );
  }
  return (
    <PullToRefresh onRefresh={refetch} pullingContent={''}>
      <SessionList sessions={counsellings.data} />
    </PullToRefresh>
  );
};
