import { Link } from 'react-router-dom';
import { DateFormatter, TimeFormatter } from '../../../../lib/utils';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../ui/components/Avatar';
import { Card, CardContent } from '../../../../ui/components/Card';
import { Session } from '../../../models/Session';
import { CalendarDays } from 'lucide-react';
import { Text } from '../../../../ui/components/Text';

type SessionSnippetProps = {
  session: Pick<Session, 'id' | 'date' | 'judian' | 'notes'>;
};

export const SessionSnippet = ({ session }: SessionSnippetProps) => {
  return (
    <Link to={`/counselling/${session.id}`}>
      <Card>
        <CardContent className="flex gap-4">
          <Avatar color="red">
            <AvatarImage
              src={
                session.judian.imageUrl ||
                `https://robohash.org/${session.judian.id}`
              }
              alt={session.judian.name}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <CalendarDays />
              <time dateTime={session.date.toDateString()}>
                {DateFormatter.format(session.date)} &nbsp;
                {TimeFormatter.format(session.date)}
              </time>
            </div>
            <Text as={'h5'}>{session.judian.name}</Text>
            <Text as={'p'}>{session.notes}</Text>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
