import { FC, PropsWithChildren } from 'react';
import { useFetchStats } from '../hooks/useFetchStats';
import { StatsCard } from './StatsCard';
import { StatSkeleton } from './skeletons/StatSkeleton';

export const Stats = () => {
  const { data: statsResp, isLoading: isFetchingStats } = useFetchStats();

  if (statsResp) {
    const stats = statsResp.data;
    return (
      <StatsGrid>
        <StatsCard title="Judians Registered" stat={stats.totalJudiansActive} />
        <StatsCard title="Total Aid Provided" stat={stats.totalAidProvided} />
        <StatsCard
          title="Counselling Sessions"
          stat={stats.totalCounsellingSessionsRequested}
        />
        <StatsCard
          title="Pending Aid Cases"
          stat={stats.totalCounsellingSessionsPending}
        />
      </StatsGrid>
    );
  }

  if (isFetchingStats) {
    return (
      <StatsGrid>
        <StatSkeleton></StatSkeleton>
        <StatSkeleton></StatSkeleton>
        <StatSkeleton></StatSkeleton>
        <StatSkeleton></StatSkeleton>
      </StatsGrid>
    );
  }
};

const StatsGrid: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid gap-4 auto-cols-fr grid-flow-col justify-between">
      {children}
    </div>
  );
};
