import { Trans } from "@lingui/macro"
import { AppBar, Toolbar, IconButton, Button } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCallback, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Page } from '../../../../shared/components/containers/Page';
import { ScheduleConfirmation } from "./ScheduleConfirmation";


export const ScheduleCounselling = () => {
  const navigate = useNavigate();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const backHandler = useCallback(() => {
      navigate('../../');
  }, [navigate]);

  const createRequestHandler = () => {
    setHasSubmitted(true)
  }

  return (
    <Page>
      <AppBar position="sticky">
        <Toolbar>
            {
            !hasSubmitted && <IconButton size="large" edge="start" onClick={backHandler}>
              <ArrowBackIcon />
            </IconButton>
            }
            <h1 className="flex-grow">
              <Trans id="ScheduleCouncelling.Header">
                Schedule a session
              </Trans>
            </h1>
        </Toolbar>
      </AppBar>
      {(
        !hasSubmitted && <section className="m-5">
          <div className="date-ctrl-wrapper mb-5">
            <h5 className="font-bold mb-1">
              <Trans id="ScheduleCouncelling.SelectDate">
                Select a date
              </Trans>
            </h5>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar className="bg-white m-0"/>
            </LocalizationProvider>
          </div>
          <div className="notes-ctrl-wrapper mb-7">
            <h5 className="font-bold mb-1">
              <Trans id="ScheduleCouncelling.Note">
                Note
              </Trans>
            </h5>
            <textarea rows={4} cols={50} className="w-full"></textarea>
          </div>
          <Button
            size="large"
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={createRequestHandler}>
            <Trans id="ScheduleCouncelling.Schedule">SCHEDULE</Trans>
          </Button>
        </section>
      )}
      {
        hasSubmitted &&
        <ScheduleConfirmation></ScheduleConfirmation>
      }
    </Page>
  )
}
