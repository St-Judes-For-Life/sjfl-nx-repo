import { CounsellingSearchTypeClient } from '@sjfl/data';
import { DataPage } from '../../../../shared/components/containers/DataPage';
import { SessionList } from '../components/SessionList';
import { useFetchCounselling } from '../hooks/useFetchCounselling';
import { FullScreenSpinner } from '../../../../shared/components/progress/FullScreenSpinner';

export const CounsellingSearchPage = ({
  searchType,
}: {
  searchType: CounsellingSearchTypeClient;
}) => {
  const {
    data: counsellings,
    isLoading,
    refetch,
    isError: hasError,
  } = useFetchCounselling({
    type: searchType,
  });

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  return (
    <DataPage hasError={hasError} onRefresh={refetch}>
      <SessionList sessions={counsellings?.data} />
    </DataPage>
  );
};
