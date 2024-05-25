import { Page } from '../../components/Page';
import { RecentAidRequests } from './components/RecentAidRequests';
import { RecentSessions } from './components/RecentSessions';
import { Stats } from './components/Stats';

export const OverviewPage = () => {
  return (
    <Page title={'Overview'}>
      <div className="grid gap-4 grid-rows-[auto,1fr]">
        <Stats />
        <div className="grid gap-4 md:grid-cols-2 grid-cols-1 justify-between">
          <RecentAidRequests />
          <RecentSessions />
        </div>
      </div>
    </Page>
  );
};
