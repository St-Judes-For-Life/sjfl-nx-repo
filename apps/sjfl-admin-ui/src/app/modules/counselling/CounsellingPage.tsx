import { Page } from '../../components/Page';
import { SearchResults } from '../../components/SearchResults';
import { SearchWidget } from '../../components/SearchWidget';
import { useLookupValues } from '../../hooks/useLookupValues';
import { DropdownSearch, SearchItem } from '../../models/Search';
import { TodaysSessions } from './components/TodaysSessions';
import {
  CounsellingNameSearch,
  CounsellingStatusSearch,
  CounsellingDateSearch,
} from './constants/counselling-search';
import { startCase } from 'lodash-es';

export const CounsellingPage = () => {
  const lookup = useLookupValues();

  const searchConfig: SearchItem[] = [
    CounsellingNameSearch,
    {
      ...CounsellingStatusSearch,
      options: lookup.counsellingStatuses.toSorted().map((item, index) => ({
        id: index,
        label: startCase(item.toLowerCase()),
        value: item,
      })),
    } as DropdownSearch<string>,
    CounsellingDateSearch,
  ];

  return (
    <Page title={'Counselling Sessions'}>
      <div className="grid grid-cols-[1fr,3fr] gap-6">
        <TodaysSessions />
        <div className="grid gap-4 grid-rows-[auto,1fr]">
          <SearchWidget title="Counselling Sessions" fields={searchConfig} />
          <SearchResults item="counselling"></SearchResults>
        </div>
      </div>
    </Page>
  );
};
