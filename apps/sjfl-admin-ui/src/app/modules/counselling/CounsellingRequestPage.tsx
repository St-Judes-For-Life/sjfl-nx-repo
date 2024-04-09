import { Card, CardContent } from "../../../ui/components/Card";

import { Page } from "../../components/Page";
import { Text } from '../../../ui/components/Text';
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { judians } from "../../mock/judians";
import { useLocation } from "react-router-dom";
import { todaysSessions } from "../../mock/sessions";
import { Button } from "../../../ui/components/Button";
import { Table, TableRow, TableBody, TableCell, TableHead, TableHeader } from "../../../ui/components/Table";
import { CalendarDays, WatchIcon } from "lucide-react";

export const CounsellingRequestPage = () => {
  const location = useLocation();
  const counsellingID = location.pathname.split('/').pop() || -1;
  const matchedSession = todaysSessions.filter((session) => session.id === +counsellingID)[0];
  const matchedJudian = judians.filter((judian) => judian.id === matchedSession?.judian.id)[0]

  return (
    <Page title={'Counselling Request'}>
      <div className="grid gap-4 auto-cols-fr grid-flow-col justify-between">
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-2">
              <Avatar color="red">
                <AvatarImage
                  src={
                    `https://robohash.org/${matchedJudian?.id}`
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Text as="h2" className="text-base">{matchedJudian?.name}</Text>
              <Text className="text-base">{matchedJudian?.phone}</Text>
              <Button type="button" variant={'default'}>
                View Profile
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-2">
              <Text as="h2" className="text-base mb-3">Information</Text>
              <Table>
                <TableBody>
                <TableRow>
                  <TableCell>
                    <Text as="h2" className="text-base mb-3">Date Of Birth</Text>
                  </TableCell>
                  <TableCell>
                    <Text as="h2" className="text-base mb-3"></Text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Text as="h2" className="text-base mb-3">Gender</Text>
                  </TableCell>
                  <TableCell>
                    <Text as="h2" className="text-base mb-3"></Text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Text as="h2" className="text-base mb-3">UID</Text>
                  </TableCell>
                  <TableCell>
                    <Text as="h2" className="text-base mb-3"></Text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Text as="h2" className="text-base mb-3">Last Session</Text>
                  </TableCell>
                  <TableCell>
                    <Text as="h2" className="text-base mb-3"></Text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Text as="h2" className="text-base mb-3">Judian Since</Text>
                  </TableCell>
                  <TableCell>
                    <Text as="h2" className="text-base mb-3"></Text>
                  </TableCell>
                </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="gap-4">
          <Card>
            <CardContent className="flex flex-col justify-start gap-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Approved Date</TableHead>
                    <TableHead>Approved Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Text as="h2" className="text-base mb-3"></Text>
                    </TableCell>
                    <TableCell>
                      <Text as="h2" className="text-base mb-3"></Text>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="flex flex-col gap-2">
                <Text as="h2" className="text-base">Notes</Text>
                <Text className="text-base">Notes provided by Judian while creating the request.</Text>
              </div>
              <div className="flex gap-2">
                <Text as="h2" className="text-base">Status</Text>
                <Text className="text-base">Approved</Text>
              </div>
              <div className="flex gap-2">
                <Text className="text-base">Note for Judian</Text>
              </div>
              <div className="flex justify-center gap-4">
                <Button type="button">Cancel</Button>
                <Button type="submit">Reschedule</Button>
                <Button type="submit">Complete</Button>
          </div>
            </CardContent>
          </Card>
        </div>
        <div className="gap-4">
          <Card>
            <CardContent className="flex flex-col gap-2">
              <Text as="h2" className="text-base">Previous Sessions</Text>
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-2">
                    <CalendarDays />
                  </div>
                  <div className="flex gap-2">
                    <WatchIcon />
                  </div>
                  <Text className="text-base">Session Note</Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-2">
                <div className="flex gap-2">
                    <CalendarDays />
                  </div>
                  <div className="flex gap-2">
                    <WatchIcon />
                  </div>
                  <Text className="text-base">Session Note</Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-2">
                  <div className="flex gap-2">
                    <CalendarDays />
                  </div>
                  <div className="flex gap-2">
                    <WatchIcon />
                  </div>
                  <Text className="text-base">Session Note</Text>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};
