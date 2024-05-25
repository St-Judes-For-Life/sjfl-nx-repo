import { Table, TableBody, TableHead, TableHeader, TableRow } from '@sjfl/ui';
import { FC, PropsWithChildren } from 'react';
type SearchTableProps = {
  columns: string[];
};

export const SearchResultTable: FC<PropsWithChildren<SearchTableProps>> = ({
  columns,
  children,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col}>{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};
