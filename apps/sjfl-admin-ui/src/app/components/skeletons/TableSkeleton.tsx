import {
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@sjfl/ui';
import { FC } from 'react';

type TableSkeletonProps = {
  header?: boolean;
  columns: number;
  rows?: number;
};

export const TableSkeleton: FC<TableSkeletonProps> = ({
  header = false,
  columns = 2,
  rows = 4,
}) => {
  const columnArray = Array.from(Array(columns).keys());
  const rowArray = Array.from(Array(rows).keys());

  return (
    <Card className="h-full">
      {header && (
        <CardHeader className="pb-3 flex items-center justify-between">
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
      )}

      <CardContent className="pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              {columnArray.map((col) => (
                <TableHead key={col}>
                  <Skeleton className="h-4 w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowArray.map((row) => (
              <TableRow key={row}>
                {columnArray.map((col) => (
                  <TableCell key={col}>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
