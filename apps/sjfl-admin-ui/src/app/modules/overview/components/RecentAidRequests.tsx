import { TableSkeleton } from '../../../components/skeletons/TableSkeleton';
import { useFetchRecentAidRequests } from '../hooks/useFetchRecentAidRequests';
import { AdminAidRequestSummary, AidRequestTableCard } from './AidRequestTableCard';
import { SummaryData, SummaryTableCard } from './SummaryTableCard';

export const RecentAidRequests = () => {
  const { data: aidRequest, isLoading } = useFetchRecentAidRequests();

  if (aidRequest) {
    
    const aidRequests: AdminAidRequestSummary[] = aidRequest?.data.data.map(
      (aidReq) => ({
        id: aidReq.reqId,
        requesterName: aidReq.userName,
        natureOfSupport: aidReq.natureOfSupport,
        status: aidReq.aidStatus,
      })
    );
    return (
      <AidRequestTableCard
        resourceUrl="/aid"
        title="Aid Requests"
        summaryData={aidRequests}
      ></AidRequestTableCard>
    );
  }
  if (isLoading) {
    return <TableSkeleton header columns={3} />;
  }
};
