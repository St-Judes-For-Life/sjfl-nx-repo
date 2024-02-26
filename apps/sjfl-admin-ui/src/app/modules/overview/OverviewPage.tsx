import { Page } from '../../components/Page';
import { aidRequests, counsellingRequests } from '../../mock/requests';
import { StatsCard } from './components/StatsCard';
import { SummaryTableCard } from './components/SummaryTableCard';

export const OverviewPage = () => {
  return (
    <Page title={'Overview'}>
      <div className="grid gap-4 auto-cols-fr grid-flow-col justify-between">
        <StatsCard title="Judians Registered" stat="54" />
        <StatsCard title="Total Aid Provided" stat="₹5.4L" />
        <StatsCard title="Counselling Sessions" stat="125" />
        <StatsCard title="Pending Cases" stat="5" />
      </div>
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
