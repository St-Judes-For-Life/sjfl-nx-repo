import { FC, PropsWithChildren } from 'react';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  DateFormatter,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@sjfl/ui';
import { Link } from 'react-router-dom';
import { Judian } from '../../../models/Judian';

type SummaryTableCardProps = {
  resourceUrl: string;
  title: string;
  summaryData: {
    id: number;
    judian: Pick<Judian, 'id' | 'name'>;
    subtitle?: string;
    status: string;
    date: Date;
  }[];
};

export const SummaryTableCard: FC<PropsWithChildren<SummaryTableCardProps>> = ({
  resourceUrl,
  title,
  summaryData,
}) => {
  return (
    <Card className="h-full">
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
            {summaryData.map((request) => (
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
                <TableCell>{DateFormatter.format(request.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
