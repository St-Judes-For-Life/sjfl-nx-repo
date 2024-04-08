import { Trans, t } from '@lingui/macro';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Button,
  FormControl,
  FormLabel,
  TextareaAutosize,
} from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { i18n } from '@lingui/core';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';
import { ScheduleConfirmation } from './ScheduleConfirmation';
import TextArea from '../../../../shared/components/inputs/TextArea';

export const ScheduleCounselling = () => {
  const navigate = useNavigate();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleClose = () => {
    navigate('../..');
  };

  const createRequestHandler = () => {
    setHasSubmitted(true);
  };

  const header = (
    <AppHeader
      title={i18n._(
        t({ id: 'ScheduleCouncelling.Header', message: 'Schedule a session' })
      )}
      backEnabled={true}
      backIcon={<ArrowBackIcon />}
      onBack={handleClose}
    ></AppHeader>
  );

  return (
    <Scaffold header={header}>
      {!hasSubmitted && (
        <section className="m-5 grid gap-5">
          <FormControl fullWidth required>
            <FormLabel htmlFor="date">
              <Trans id="ScheduleCouncelling.SelectDate">Select a Date</Trans>
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={'en-IN'}
            >
              <DatePicker format="DD-MM-YYYY" />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth required>
            <FormLabel htmlFor="time">
              <Trans id="ScheduleCouncelling.SelectTime">Select a Time</Trans>
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={'en-IN'}
            >
              <TimePicker />
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="note">
              <Trans id="ScheduleCouncelling.Note">Note</Trans>
            </FormLabel>
            <TextArea
              id="note"
              fullWidth
              minRows={6}
              placeholder={i18n._(
                t({
                  id: 'ScheduleCouncelling.Notes_Placeholder',
                  message: 'Notes for Counseller',
                })
              )}
            />
          </FormControl>
          {/* <div className="notes-ctrl-wrapper mb-7">
            <h5 className="font-bold mb-1">
              <Trans id="ScheduleCouncelling.Note">Note</Trans>
            </h5>
            <textarea rows={4} cols={50} className="w-full"></textarea>
          </div> */}
          <Button
            size="large"
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={createRequestHandler}
          >
            <Trans id="ScheduleCouncelling.Schedule">SCHEDULE</Trans>
          </Button>
        </section>
      )}
      {hasSubmitted && <ScheduleConfirmation></ScheduleConfirmation>}
    </Scaffold>
  );
};
