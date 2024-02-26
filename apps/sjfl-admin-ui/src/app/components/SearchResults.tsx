import { Link, useSearchParams } from 'react-router-dom';
import { DateFormatter } from '../../lib/utils';
import { Badge } from '../../ui/components/Badge';
import { Card, CardContent } from '../../ui/components/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/components/Table';
import { fetchSearchResults, useItemSearch } from '../hooks/useItemSearch';
import { Aid } from '../models/Aid';
import { JudianSearchResult } from '../models/Judian';
import { SearchBy } from '../models/Search';
import { Session } from '../models/Session';

type SearchResultsProps = {
  item: SearchBy;
};

export const SearchResults = ({ item }: SearchResultsProps) => {
  const [searchParams] = useSearchParams();
  const { data } = useItemSearch(item, searchParams);

  if (data)
    return (
      <Card>
        <CardContent>{renderSearchResults(item, data)}</CardContent>
      </Card>
    );
};

function renderSearchResults(
  item: SearchBy,
  data: ReturnType<typeof fetchSearchResults>
) {
  if (item === 'counselling') {
    return renderCounsellingSearchResults(data as Session[]);
  }
  if (item === 'aid') {
    return renderAidSearchResults(data as Aid[]);
  }
  if (item === 'judian') {
    return renderJudianSearchResults(data as JudianSearchResult[]);
  }
}

function renderAidSearchResults(data: Aid[]) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Requester</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="flex gap-2 items-center">
              <Link to={`/aid/${record.id}`} className="font-medium underline">
                {record.judian.name}
              </Link>
              {record.stream && (
                <Badge variant={'outline'}>{record.stream}</Badge>
              )}
            </TableCell>
            <TableCell>{record.status}</TableCell>
            <TableCell>{DateFormatter.format(record.date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function renderCounsellingSearchResults(data: Session[]) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Requester</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="flex gap-2 items-center">
              <Link
                to={`/counselling/${record.id}`}
                className="font-medium underline"
              >
                {record.judian.name}
              </Link>
            </TableCell>
            <TableCell>{record.status}</TableCell>
            <TableCell>{DateFormatter.format(record.date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function renderJudianSearchResults(data: JudianSearchResult[]) {
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
        {data.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="flex gap-2 items-center">
              <Link
                to={`/judians/${record.id}`}
                className="font-medium underline"
              >
                {record.id}
              </Link>
            </TableCell>

            <TableCell>{record.name}</TableCell>
            <TableCell>{record.phone}</TableCell>
            <TableCell>{record.email}</TableCell>
            <TableCell>{record.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
