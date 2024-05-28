import { useParams } from 'react-router-dom';

import { Page } from '../../components/Page';
import { JudianSnippet } from './components/JudianSnippet';
import { PreviousSessions } from './components/PreviousSessions';
import { SessionStatus } from './components/SessionStatus';
import { JudianSnippetSkeleton } from './components/skeletons/JudianSnippetSkeleton';
import { PreviousSessionsSkeleton } from './components/skeletons/PreviousSessionsSkeleton';
import { SessionStatusSkeleton } from './components/skeletons/SessionStatusSkeleton';
import { useFetchCounsellingSessionById } from './hooks/useFetchCounsellingSessionById';

export const CounsellingRequestPage = () => {
  const { id: counsellingID } = useParams();
  if (!counsellingID) {
    throw Error('ID not found');
  }

  const { data: counsellingResp, isLoading: isFetchingCounsellingDetails } =
    useFetchCounsellingSessionById(counsellingID);
  const judian = counsellingResp?.data.userResponse;

  if (isFetchingCounsellingDetails) {
    return (
      <Page title="Counselling">
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 justify-between">
          <JudianSnippetSkeleton />
          <SessionStatusSkeleton />
          <PreviousSessionsSkeleton />
        </div>
      </Page>
    );
  }

  if (counsellingResp && judian)
    return (
      <Page
        breadcrumbs={[
          { title: 'Counselling', link: '/counselling' },
          { title: counsellingID },
        ]}
      >
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 justify-between">
          <JudianSnippet judian={judian} />
          <SessionStatus session={counsellingResp.data} />
          <PreviousSessions uid={judian.uid} />
        </div>
      </Page>
    );
};
