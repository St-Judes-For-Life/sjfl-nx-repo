import {
  AdditionalNote,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTrigger,
  HistoryItem,
  ScrollArea,
  Text,
} from '@sjfl/ui';
import { FC, useState } from 'react';
import { useSessionHistory } from '../../hooks/useSessionHistory';

type SessionHistoryDialog = {
  sessionId: string;
};

export const SessionHistoryDialog: FC<SessionHistoryDialog> = ({
  sessionId,
}) => {
  const [open, setOpen] = useState(false);
  const { data: history } = useSessionHistory(sessionId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Show full history</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <Text as="h5" className="text-center">
          Session History for {sessionId}
        </Text>
        <ScrollArea className="h-[60dvh]">
          {history?.map((entry) => (
            <div
              key={entry.eventTime + entry.statusNote + entry.counsellingStatus}
              className="grid"
            >
              <Card className="rounded-2xl">
                <CardContent>
                  <HistoryItem
                    name={'Status'}
                    value={entry.counsellingStatus}
                  />
                  <HistoryItem
                    name={'Session Time'}
                    value={entry.counsellingDate}
                  />

                  <AdditionalNote session={entry} />
                </CardContent>
              </Card>
              <p className="ml-auto italic text-sm font-light text-slate-500">
                {entry.eventTime}
              </p>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
