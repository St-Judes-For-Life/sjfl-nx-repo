import { Page } from '../../components/Page';
import { aidRequests, counsellingRequests } from '../../mock/requests';
import { StatsCard } from './components/StatsCard';
import { SummaryTableCard } from './components/SummaryTableCard';
import { useFetchStats } from './hooks/useFetchStats';

export const OverviewPage = () => {
  const { data: statsResp, isLoading: isFetchingStats } = useFetchStats();
  return (
    <Page title={'Overview'} className="grid gap-4 auto-rows-min">
      {!isFetchingStats && statsResp ? (
        <div className="grid gap-4 auto-cols-fr grid-flow-col justify-between">
          <StatsCard
            title="Judians Registered"
            stat={statsResp.data.totalJudiansActive}
          />
          <StatsCard
            title="Total Aid Provided"
            stat={statsResp.data.totalAidProvided}
          />
          <StatsCard
            title="Counselling Sessions"
            stat={statsResp.data.totalCounsellingSessionsRequested}
          />
          <StatsCard
            title="Pending Aid Cases"
            stat={statsResp.data.totalCounsellingSessionsPending}
          />
        </div>
      ) : (
        <>Fetching Stats</>
      )}

      <div className="grid gap-4 auto-cols-fr grid-flow-col justify-between">
        <SummaryTableCard
          resourceUrl="/aid"
          title="Aid Requests"
          summaryData={aidRequests}
        ></SummaryTableCard>
        <SummaryTableCard
          resourceUrl="/counselling"
          title="Counselling Requests"
          summaryData={counsellingRequests}
        ></SummaryTableCard>
      </div>
    </Page>
  );
};
