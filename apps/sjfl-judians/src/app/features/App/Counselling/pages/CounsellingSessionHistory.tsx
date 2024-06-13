import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { Card, CardContent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { AdditionalNote, HistoryItem } from '@sjfl/ui';
import { HistoryIcon, MoreVerticalIcon } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { DataPage } from '../../../../shared/components/containers/DataPage';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';
import { CounsellingActionsDrawer } from '../components/CounsellingActionsDrawer';
import { useSessionHistory } from '../hooks/useSessionHistory';

export const CounsellingSessionHistory = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  if (!sessionId) {
    throw Error('ID not found');
  }

  const {
    data: history,
    isLoading,
    refetch,
    isError,
  } = useSessionHistory(sessionId);

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

  const handleRefresh = async () => {
    await refetch();
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
      <DataPage onRefresh={handleRefresh} hasError={isError}>
        <>
          <div className="p-4 grid gap-4">
            {history?.map((entry) => (
              <div
                key={
                  entry.eventTime + entry.statusNote + entry.counsellingStatus
                }
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
        </>
      </DataPage>
    </Scaffold>
  );
};
