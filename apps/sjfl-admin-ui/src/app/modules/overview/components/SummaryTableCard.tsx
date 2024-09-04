import { FC, PropsWithChildren } from 'react';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@sjfl/ui';
import { Link } from 'react-router-dom';
import { NoResults } from '../../../components/NoResults';
import { Judian } from '../../../models/Judian';

export type SummaryData = {
  id: string;
  judian: Pick<Judian, 'id' | 'name'>;
  subtitle?: string;
  status: string;
  date: string;
};

type SummaryTableCardProps = {
  resourceUrl: string;
  title: string;
  summaryData: SummaryData[];
};

export const SummaryTableCard: FC<PropsWithChildren<SummaryTableCardProps>> = ({
  resourceUrl,
  title,
  summaryData,
}) => {
  return (
    <Card className="h-0 min-h-full overflow-y-auto">
      <CardHeader className="pb-3 flex items-center justify-between">
        <Text as={'h3'}>{title}</Text>
        <Link to={resourceUrl}>View All</Link>
      </CardHeader>
      <CardContent className="pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Requester</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summaryData.length > 0 ? (
              summaryData.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="flex gap-2 items-center">
                    <Link
                      to={`${resourceUrl}/${request.id}`}
                      className="font-medium underline"
                    >
                      {request.judian.name}
                    </Link>
                    {request.subtitle && (
                      <Badge variant={'outline'}>{request.subtitle}</Badge>
                    )}
                  </TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{request.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>
                  <NoResults />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
