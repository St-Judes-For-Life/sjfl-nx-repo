import { Text } from '../../../ui/components/Text';
import { Page } from '../../components/Page';
import { SearchResults } from '../../components/SearchResults';
import { SearchWidget } from '../../components/SearchWidget';
import { todaysSessions } from '../../mock/sessions';
import { SessionSnippet } from './components/SessionSnippet';
import { CounsellingSearchConfig } from './constants/counselling-search';

export const CounsellingPage = () => {
  return (
    <Page title={'Counselling Sessions'}>
      <div className="grid grid-cols-[1fr,3fr] gap-6">
        <div className="flex flex-col gap-4">
          <Text as={'h4'}>Today's Sessions</Text>
          {todaysSessions.map((session) => (
            <SessionSnippet key={session.id} session={session}></SessionSnippet>
          ))}
        </div>
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
