import { useLocation, useNavigate } from 'react-router-dom';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  Text,
} from '@sjfl/ui';

import { judians } from '../../mock/judians';
import { todaysSessions } from '../../mock/sessions';
import { CalendarDays, WatchIcon } from 'lucide-react';
import { Page } from '../../components/Page';

export const CounsellingRequestPage = () => {
  const location = useLocation();
  const counsellingID = location.pathname.split('/').pop() || -1;
  const matchedSession = todaysSessions.filter(
    (session) => session.id === +counsellingID
  )[0];
  const matchedJudian = judians.filter(
    (judian) => judian.id === matchedSession?.judian.id
  )[0];
  const navigate = useNavigate();

  const onViewProfileBtnClick = () => {
    navigate(`/judians/${matchedJudian.id}`);
  };

  return (
    <Page title={'Counselling Request'}>
      <div className="grid gap-4 auto-cols-fr grid-flow-col justify-between">
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center gap-2">
              <div className="w-32 h-32">
                <Avatar color="red">
                  <AvatarImage
                    src={`https://robohash.org/${matchedJudian?.id}`}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <Text as="h2" className="text-base">
                {matchedJudian?.name}
              </Text>
              <Text className="text-base">{matchedJudian?.phone}</Text>
              <Button
                type="button"
                variant={'default'}
                onClick={onViewProfileBtnClick}
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-2">
              <Text as="h2" className="text-base mb-3 font-bold">
                Information
              </Text>
              <div className="flex flex-col gap-2">
                <div className="flex">
                  <div>Date Of Birth</div>
                  <div></div>
                </div>
                <div className="flex">
                  <div>Gender</div>
                  <div></div>
                </div>
                <div className="flex">
                  <div>UID</div>
                  <div></div>
                </div>
                <div className="flex">
                  <div>Last Session</div>
                  <div></div>
                </div>
                <div className="flex">
                  <div>Judian Since</div>
                  <div></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="gap-4">
          <Card>
            <CardContent className="flex flex-col justify-start gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <div className="font-bold">Approved Date</div>
                  <div className="font-bold">Approved Time</div>
                </div>
                <div className="flex">
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Text as="h2" className="text-base">
                  Notes
                </Text>
                <Text className="text-base">
                  Notes provided by Judian while creating the request.
                </Text>
              </div>
              <div className="flex gap-2">
                <Text as="h2" className="text-base">
                  Status
                </Text>
                <Text className="text-base text-xl text-green-600 font-bold">
                  Approved
                </Text>
              </div>
              <div className="flex gap-2">
                <Text className="text-base">Note for Judian</Text>
              </div>
              <div className="flex justify-center gap-4">
                <Button type="button" variant="default">
                  Cancel
                </Button>
                <Button type="submit" variant="destructive">
                  Reschedule
                </Button>
                <Button type="submit" variant="secondary">
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="gap-4">
          <Card>
            <CardContent className="flex flex-col gap-2">
              <Text as="h2" className="text-base font-bold">
                Previous Sessions
              </Text>
              <Card>
                <CardContent className="flex flex-col justify-center gap-2">
                  <div className="flex gap-2">
                    <CalendarDays />
                    <Text className="text-base">29/12/2023</Text>
                  </div>
                  <div className="flex gap-2">
                    <WatchIcon />
                    <Text className="text-base">6:00 PM</Text>
                  </div>
                  <Text className="text-base">Session Note</Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col justify-center gap-2">
                  <div className="flex gap-2">
                    <CalendarDays />
                    <Text className="text-base">29/12/2023</Text>
                  </div>
                  <div className="flex gap-2">
                    <WatchIcon />
                    <Text className="text-base">6:00 PM</Text>
                  </div>
                  <Text className="text-base">Session Note</Text>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col justify-center gap-2">
                  <div className="flex gap-2">
                    <CalendarDays />
                    <Text className="text-base">29/12/2023</Text>
                  </div>
                  <div className="flex gap-2">
                    <WatchIcon />
                    <Text className="text-base">6:00 PM</Text>
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
