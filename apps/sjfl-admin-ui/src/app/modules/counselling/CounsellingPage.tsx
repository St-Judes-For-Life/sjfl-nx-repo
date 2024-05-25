import { Page } from '../../components/Page';
import { SearchResults } from '../../components/SearchResults';
import { SearchWidget } from '../../components/SearchWidget';
import { CounsellingSearchConfig } from './constants/counselling-search';
import { TodaysSessions } from './components/TodaysSessions';

export const CounsellingPage = () => {
  return (
    <Page title={'Counselling Sessions'}>
      <div className="grid grid-cols-[1fr,3fr] gap-6">
        <TodaysSessions />
        <div className="grid gap-4 auto-rows-min">
          <SearchWidget
            title="Counselling Sessions"
            fields={CounsellingSearchConfig}
          />
          <SearchResults item="counselling"></SearchResults>
        </div>
      </div>
    </Page>
  );
};
