import { Page } from '../../../components/Page';
import { SearchResults } from '../../../components/SearchResults';
import { SearchWidget } from '../../../components/SearchWidget';
import { JudiansSearchConfig } from '../constants/JudiansSearchConfig';

export const JudiansPage = () => {
  return (
    <Page title={'Judians'}>
      <div className="grid gap-4 grid-rows-[auto,1fr]">
        <SearchWidget title="Judians" fields={JudiansSearchConfig} />
        <SearchResults item="judians"></SearchResults>
      </div>
    </Page>
  );
};
