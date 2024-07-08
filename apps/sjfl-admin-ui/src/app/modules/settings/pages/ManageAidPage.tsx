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
import { Page } from '../../../components/Page';
import { NoResults } from '../../../components/NoResults';

export const ManageAidPage = () => {
  return (
    <Page
      title={'Manage Aid'}
      breadcrumbs={[
        { title: 'Settings', link: '/settings' },
        { title: 'Manage Aid' },
      ]} className="flex flex-col"
    >
      <Card className="h-full">
        <CardHeader className="pb-3 flex items-center justify-between">
          <Text as={'h3'}>Supported Aids</Text>
        </CardHeader>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stream</TableHead>
                <TableHead>Nature Of Support</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4}>
                  <NoResults />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className='flex'>

      </div>
    </Page>
  );
};
