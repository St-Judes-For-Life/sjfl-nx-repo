import {
  Badge,
  Card,
  CardContent,
  DateFormatter,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@sjfl/ui';
import { Link } from 'react-router-dom';

import { PaginatedResponse } from '@sjfl/data';
import { AxiosResponse } from 'axios';
import { fetchSearchResults, useItemSearch } from '../hooks/useItemSearch';
import { SearchBy } from '../models/Search';
import { AdminAidRequest } from '../modules/aid/models/AdminAidRequest';
import { AdminCounsellingSession } from '../modules/counselling/models/AdminCounselling';
import { AdminJudian } from '../modules/judians/models/Judians';
import { NoResults } from './NoResults';
import { RetrySearch } from './RetrySearch';
import { SearchResultTable } from './SearchResultTable';
import { TableSkeleton } from './skeletons/TableSkeleton';

type SearchResultsProps = {
  item: SearchBy;
};

export const SearchResults = ({ item }: SearchResultsProps) => {
  const { data, isLoading, isFetching, isError, refetch } = useItemSearch(item);

  const cols =
    item === 'aid' || item === 'counselling'
      ? ['Requester', 'Status', 'Date']
      : ['UID', 'Name', 'Phone', 'Email', 'Status'];

  if (isLoading || isFetching) {
    return <TableSkeleton columns={cols.length} />;
  }

  if (isError) {
    return (
      <Card>
        <CardContent>
          <SearchResultTable columns={cols}>
            <TableRow>
              <TableCell colSpan={cols.length}>
                <RetrySearch onRetry={refetch} />
              </TableCell>
            </TableRow>
          </SearchResultTable>
        </CardContent>
      </Card>
    );
  }

  if (data) {
    return (
      <Card className="h-0 min-h-full overflow-x-auto">
        <CardContent>{renderSearchResults(item, data)}</CardContent>
      </Card>
    );
  }
};

function renderSearchResults(
  item: SearchBy,
  data: Awaited<ReturnType<typeof fetchSearchResults>>
) {
  if (item === 'counselling') {
    return renderCounsellingSearchResults(
      data as AxiosResponse<PaginatedResponse<AdminCounsellingSession>>
    );
  }
  if (item === 'aid') {
    return renderAidSearchResults(
      data as AxiosResponse<PaginatedResponse<AdminAidRequest>>
    );
  }
  if (item === 'judians') {
    return renderJudianSearchResults(
      data as AxiosResponse<PaginatedResponse<AdminJudian>>
    );
  }
}

function renderAidSearchResults(
  response: AxiosResponse<PaginatedResponse<AdminAidRequest>>
) {
  return (
    <SearchResultTable columns={['Requester', 'Status', 'Date']}>
      {response && response.data?.data?.length > 0 ? (
        response.data?.data.map((record) => (
          <TableRow key={record.reqId}>
            <TableCell className="flex gap-2 items-center">
              <Link
                to={`/aid/${record.reqId}`}
                className="font-medium underline"
              >
                {record.userName}
              </Link>
              {record.natureOfSupport && (
                <Badge variant={'outline'}>{record.natureOfSupport}</Badge>
              )}
            </TableCell>
            <TableCell>{record.aidStatus}</TableCell>
            <TableCell>{DateFormatter.format(new Date())}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3}>
            <NoResults />
          </TableCell>
        </TableRow>
      )}
    </SearchResultTable>
  );
}

function renderCounsellingSearchResults(
  response: AxiosResponse<PaginatedResponse<AdminCounsellingSession>>
) {
  return (
    <SearchResultTable columns={['Requester', 'Status', 'Date']}>
      {response.data.data && response.data.data.length > 0 ? (
        response.data.data.map((record) => (
          <TableRow key={record.counsellingId}>
            <TableCell className="flex gap-2 items-center">
              <Link
                to={`/counselling/${record.counsellingId}`}
                className="font-medium underline"
              >
                {record.userResponse.name}
              </Link>
            </TableCell>
            <TableCell>{record.counsellingStatus}</TableCell>
            <TableCell>{record.counsellingDate}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3}>
            <NoResults />
          </TableCell>
        </TableRow>
      )}
    </SearchResultTable>
  );
}

function renderJudianSearchResults(
  response: AxiosResponse<PaginatedResponse<AdminJudian>>
) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>UID</TableHead>
          <TableHead>Requester</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {response.data.data && response.data.data.length > 0 ? (
          response.data.data.map((record) => (
            <TableRow key={record.uid}>
              <TableCell className="flex gap-2 items-center">
                <Link
                  to={`/judians/${record.uid}`}
                  className="font-medium underline"
                >
                  {record.uid}
                </Link>
              </TableCell>

              <TableCell>{record.fullName}</TableCell>
              <TableCell>{record.mobileNo}</TableCell>
              <TableCell>{record.email}</TableCell>
              <TableCell>{record.accountLocked}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5}>
              <NoResults />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
