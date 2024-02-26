import { Page } from '../../../components/Page';
import { SearchResults } from '../../../components/SearchResults';
import { SearchWidget } from '../../../components/SearchWidget';
import { JudiansSearchConfig } from '../constants/JudiansSearchConfig';

export const JudiansPage = () => {
  return (
    <Page title={'Judians'}>
      <div className="grid gap-4 auto-rows-min">
        <SearchWidget title="Judians" fields={JudiansSearchConfig} />
        <SearchResults item="judian"></SearchResults>
      </div>
    </Page>
  );
};
