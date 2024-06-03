import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { Card, CardContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { ClientCounsellingSession } from '@sjfl/data';
import { HistoryIcon, MoreVerticalIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';
import { CounsellingActionsDrawer } from '../components/CounsellingActionsDrawer';
import { useSessionHistory } from '../hooks/useSessionHistory';

export const CounsellingSessionHistory = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  if (!sessionId) {
    throw Error('ID not found');
  }

  const { data: history, isLoading } = useSessionHistory(sessionId);

  console.log(history);

  const [openDrawer, setDrawerOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAction = () => {
    setDrawerOpen(true);
  };
  const handleClose = () => {
    setDrawerOpen(false);
  };

  const header = (
    <AppHeader
      backEnabled
      onBack={handleBack}
      slots={{
        left: <HistoryIcon />,
        right: (
          <IconButton size="large" edge="end" onClick={handleAction}>
            <MoreVerticalIcon />
          </IconButton>
        ),
      }}
      title={i18n._(
        t({ id: 'Counselling.Header.History', message: 'Session History' })
      )}
      subtitle={sessionId}
    />
  );
  return (
    <Scaffold header={header}>
      <div className="p-4 grid gap-4">
        {history?.map((entry) => (
          <div
            key={entry.eventTime + entry.statusNote + entry.counsellingStatus}
            className="grid"
          >
            <Card className="rounded-2xl">
              <CardContent>
                <HistoryItem name={'Status'} value={entry.counsellingStatus} />
                <HistoryItem name={'Time'} value={entry.counsellingDate} />

                <AdditionalNote session={entry} />
              </CardContent>
            </Card>
            <p className="ml-auto italic text-sm font-light text-secondary">
              {entry.eventTime}
            </p>
          </div>
        ))}
      </div>

      <CounsellingActionsDrawer
        open={openDrawer}
        onClose={handleClose}
        sessionId={sessionId}
        sessionStatus={history?.[0].counsellingStatus || 'REQUESTED'}
      ></CounsellingActionsDrawer>
    </Scaffold>
  );
};

const AdditionalNote = ({ session }: { session: ClientCounsellingSession }) => {
  // TODO: remove uppercase when fixed
  switch (session.counsellingStatus.toUpperCase()) {
    case 'REQUESTED':
    case 'RESCHEDULED':
    case 'CANCELLED': {
      if (session.note)
        return <HistoryItem name={'Your Notes'} value={session.note} />;
      break;
    }
    case 'ACCEPTED':
    case 'REJECTED':
    case 'COMPLETED':
      if (session.statusNote)
        return (
          <HistoryItem name={'Counsellor Note'} value={session.statusNote} />
        );
  }
};

const HistoryItem = ({ name, value }: { name: string; value: string }) => {
  return (
    <p>
      <span className="text-md font-semibold text-primary">{name}:</span>{' '}
      {value}
    </p>
  );
};
