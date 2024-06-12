import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { Page } from '../../../../shared/components/containers/Page';
import { FC } from 'react';

type ScheduleConfirmationProps = { sessionId: string };

export const ScheduleConfirmation: FC<ScheduleConfirmationProps> = ({
  sessionId,
}) => {
  const navigate = useNavigate();

  const goToHomeHandler = () => {
    navigate('/');
  };

  const viewScheduleHandler = () => {
    navigate('/counselling/history/' + sessionId, { replace: true });
  };

  return (
    <Page className="flex flex-col gap-6 items-center p-4 justify-center">
      <CheckCircleOutlineIcon
        color="success"
        sx={{ fontSize: '7rem' }}
        className="mt-6"
      />
      <h1 className="text-3xl font-light text-primary text-center">
        <Trans id="ScheduleCouncelling.ConfirmationMessagePart2">
          SJFL will reach out to you
        </Trans>
      </h1>
      <img src="/assets/schedule_success.svg" alt="scheduling successful" />
      <h2 className="text-xl font-light text-primary text-center">
        Meeting ID - {sessionId}
      </h2>
      <Button
        size="large"
        fullWidth
        variant="contained"
        color="primary"
        onClick={goToHomeHandler}
      >
        <Trans id="Btn.GoHome">GO TO HOME</Trans>
      </Button>
      <Button
        size="large"
        fullWidth={true}
        variant="outlined"
        color="primary"
        onClick={viewScheduleHandler}
      >
        <Trans id="ScheduleCouncelling.ViewSchedule">VIEW SCHEDULE</Trans>
      </Button>
    </Page>
  );
};
