import { TableSkeleton } from '../../../components/skeletons/TableSkeleton';
import { useFetchRecentCounsellings } from '../hooks/useFetchRecentCounsellings';
import { SummaryData, SummaryTableCard } from './SummaryTableCard';

export const RecentSessions = () => {
  const { data: counsellingResp, isLoading } = useFetchRecentCounsellings();

  if (counsellingResp) {
    const counsellingRequests: SummaryData[] = counsellingResp?.data.data.map(
      (session) => ({
        id: session.counsellingId,
        date: session.counsellingDate,
        status: session.counsellingStatus,
        judian: {
          id: session.userResponse.uid,
          name: session.userResponse.name,
        },
      })
    );
    return (
      <SummaryTableCard
        resourceUrl="/counselling"
        title="Counselling Requests"
        summaryData={counsellingRequests}
      ></SummaryTableCard>
    );
  }
  if (isLoading) {
    return <TableSkeleton header columns={3} />;
  }
};
