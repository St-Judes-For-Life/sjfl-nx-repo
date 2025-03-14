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
import { AdminAidRequest, AidStatus } from '../../aid/models/AdminAidRequest';

export type AdminAidRequestSummary = {
  id: string;
  requesterName: string;
  natureOfSupport: string;
  status: AidStatus;
}

type Props = {
  resourceUrl: string;
  title: string;
  summaryData: AdminAidRequestSummary[];
};

export const AidRequestTableCard = ({
  resourceUrl,
  title,
  summaryData,
}: Props) => {
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
              <TableHead>Nature Of Support</TableHead>
              <TableHead>Status</TableHead>
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
                      {request.requesterName}
                    </Link>
                    {/* {request.subtitle && (
                      <Badge variant={'outline'}>{request.subtitle}</Badge>
                    )} */}
                  </TableCell>
                  <TableCell>{request.natureOfSupport}</TableCell>
                  <TableCell>{request.status}</TableCell>
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
