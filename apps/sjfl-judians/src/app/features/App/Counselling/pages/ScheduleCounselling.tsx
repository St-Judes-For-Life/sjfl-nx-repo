import { zodResolver } from '@hookform/resolvers/zod';
import { i18n } from '@lingui/core';
import { Trans, t } from '@lingui/macro';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, FormControl, FormLabel } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';
import { TextArea } from '../../../../shared/components/inputs/TextArea';
import { ScheduleConfirmation } from './ScheduleConfirmation';
import {
  DateFormatter,
  TimeFormatter,
  createTimestamp,
} from '../../../../shared/lib/utils';
import { useCreateSession } from '../hooks/useCreateSession';
import LoadingButton from '@mui/lab/LoadingButton';

const createSessionSchema = z.object({
  date: z.custom<dayjs.Dayjs | null>((data) => dayjs.isDayjs(data)),
  time: z.custom<dayjs.Dayjs | null>((data) => dayjs.isDayjs(data)),
  note: z.string().optional(),
});

type CreateSessionForm = z.infer<typeof createSessionSchema>;

export const ScheduleCounselling = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string>();

  const { register, control, handleSubmit } = useForm<CreateSessionForm>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      date: null,
      time: null,
    },
  });

  const { mutateAsync: createSession, isPending: isCreating } =
    useCreateSession();

  const handleClose = () => {
    navigate('../..');
  };

  const submitHandler: SubmitHandler<CreateSessionForm> = async (form) => {
    if (form.date && form.time) {
      const resp = await createSession({
        requestDate: createTimestamp(form.date, form.time),
        note: form.note,
      });

      if (resp.status === 200) {
        setSessionId(resp.data.counsellingId);
      }
    }
  };

  const errorHandler: SubmitErrorHandler<CreateSessionForm> = (
    errors,
    event
  ) => {
    console.log(errors, event);
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
      {!sessionId && (
        <form
          onSubmit={handleSubmit(submitHandler, errorHandler)}
          className="m-5 grid gap-5"
        >
          <FormControl fullWidth required>
            <FormLabel htmlFor="date">
              <Trans id="ScheduleCouncelling.SelectDate">Select a Date</Trans>
            </FormLabel>

            <Controller
              control={control}
              name="date"
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  onChange={onChange}
                  value={value}
                  format="DD-MM-YYYY"
                />
              )}
            ></Controller>
          </FormControl>
          <FormControl fullWidth required>
            <FormLabel htmlFor="time">
              <Trans id="ScheduleCouncelling.SelectTime">Select a Time</Trans>
            </FormLabel>

            <Controller
              control={control}
              name="time"
              render={({ field: { onChange, value } }) => (
                <TimePicker ampm onChange={onChange} value={value} />
              )}
            ></Controller>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel htmlFor="note">
              <Trans id="ScheduleCouncelling.Note">Note</Trans>
            </FormLabel>
            <TextArea
              id="note"
              fullWidth
              minRows={6}
              {...register('note')}
              placeholder={i18n._(
                t({
                  id: 'ScheduleCouncelling.Notes_Placeholder',
                  message: 'Notes for Counseller',
                })
              )}
            />
          </FormControl>
          <LoadingButton
            size="large"
            fullWidth={true}
            variant="contained"
            color="primary"
            type="submit"
            loading={isCreating}
          >
            <Trans id="ScheduleCouncelling.Schedule">SCHEDULE</Trans>
          </LoadingButton>
        </form>
      )}
      {sessionId && (
        <ScheduleConfirmation sessionId={sessionId}></ScheduleConfirmation>
      )}
    </Scaffold>
  );
};
