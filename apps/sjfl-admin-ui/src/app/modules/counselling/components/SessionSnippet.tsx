import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  Text,
} from '@sjfl/ui';
import { Link } from 'react-router-dom';

import { CalendarDays } from 'lucide-react';
import { getStatusColor } from './SessionStatus';
import { AdminCounsellingSession } from '../models/AdminCounselling';

type SessionSnippetProps = {
  session: Pick<
    AdminCounsellingSession,
    | 'counsellingId'
    | 'counsellingDate'
    | 'userResponse'
    | 'statusNote'
    | 'counsellingStatus'
  >;
};

export const SessionSnippet = ({ session }: SessionSnippetProps) => {
  return (
    <Link to={`/counselling/${session.counsellingId}`}>
      <Card>
        <CardContent className="flex gap-4">
          <Avatar color="red">
            <AvatarImage
              src={
                session.userResponse.imageUrl ||
                `https://robohash.org/${session.userResponse.name}`
              }
              alt={session.userResponse.name}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <CalendarDays />
              <time dateTime={session.counsellingDate}>
                {session.counsellingDate}
              </time>
            </div>
            <Text as={'h5'}>{session.userResponse.name}</Text>
            <Text as={'p'}>{session.statusNote}</Text>
            <Text color={getStatusColor(session.counsellingStatus)} as={'p'}>
              {session.counsellingStatus}
            </Text>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
