import { Page } from '../../components/Page';
import { SearchResults } from '../../components/SearchResults';
import { SearchWidget } from '../../components/SearchWidget';
import { AidSearchConfig } from './constants/aid-search';

export const AidPage = () => {
  return (
    <Page title={'Aid Requests'}>
      <div className="grid gap-4 grid-rows-[auto,1fr]">
        <SearchWidget title="Aid Requests" fields={AidSearchConfig} />
        <SearchResults item="aid"></SearchResults>
      </div>
    </Page>
  );
};
