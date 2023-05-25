import { Trans } from "@lingui/macro"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

export const ScheduleConfirmation = () => {
  const navigate = useNavigate();

  const goToHomeHandler = () => {
    navigate('/');
  }

  const viewScheduleHandler = () => {
    navigate('../../');
  }

  return (
    <section className="grid gap-5 w-full px-8 mb-10">
      <img className="h-30 w-30 m-auto" src='/assets/checkmark-circle-outline.svg' alt="scheduling successful" />
      <div className="text-2xl text-primary">
        <Trans id="ScheduleCouncelling.ConfirmationMessagePart1">
          Your session has been scheduled.
        </Trans>
      </div>
      <div className="text-2xl text-primary">
        <Trans id="ScheduleCouncelling.ConfirmationMessagePart2">
          SJFL will reach out to you
        </Trans>
      </div>
      <img className="h-60 w-60 m-auto" src='/assets/undraw_schedule_re_2vro 1.svg' alt="scheduling successful" />
      <div className="mt-5 mb-10 text-2xl text-primary">
        <Trans id="ScheduleCouncelling.MeetingID">
          Meeting ID -
        </Trans>
      </div>
      <Button
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          onClick={goToHomeHandler}>
          <Trans id="Btn.GoHome">GO TO HOME</Trans>
      </Button>
      <Button
        size="large"
        fullWidth={true}
        variant="outlined"
        color="primary"
        onClick={viewScheduleHandler}>
        <Trans id="ScheduleCouncelling.ViewSchedule">
          VIEW SCHEDULE
        </Trans>
      </Button>
    </section>
  )
}
