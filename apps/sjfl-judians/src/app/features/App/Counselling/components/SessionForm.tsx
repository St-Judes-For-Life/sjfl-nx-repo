import { zodResolver } from '@hookform/resolvers/zod';
import { i18n } from '@lingui/core';
import { Trans, t } from '@lingui/macro';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, FormLabel } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import {
  ClientCounsellingSession,
  CreateSessionRequest,
  MaybeNull,
} from '@sjfl/data';
import dayjs, { Dayjs } from 'dayjs';
import { FC } from 'react';
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
import { DATE_FORMAT } from '../../../../shared/constants/formats';
import {
  createTimestamp,
  serverValidationErrorToasts,
  zodValidationErrors,
} from '../../../../shared/lib/utils';
import { useCreateSession } from '../hooks/useCreateSession';
import { ScheduleConfirmation } from '../pages/ScheduleConfirmation';

type SessionFormProps = {
  isUpdating: boolean;
  onSubmit: (form: CreateSessionRequest) => void;
  onBack: VoidFunction;
} & (
  | { editMode: 'CREATE'; sessionId?: string }
  | {
      editMode: 'UPDATE';
      session?: ClientCounsellingSession;
    }
);

const editSessionSchema = z
  .object({
    date: z
      .custom<Dayjs | null>((data) => dayjs.isDayjs(data), {
        message: 'Invalid Date',
      })
      .refine((date) => (date as Dayjs).diff(new Date(), 'days') >= 0, {
        message: 'Session should be greater than current date',
      }),
    time: z.custom<dayjs.Dayjs | null>((data) => dayjs.isDayjs(data), {
      message: 'Invalid Time',
    }),
    note: z.string().optional().nullable(),
  })
  .superRefine(({ date, time }, ctx) => {
    const fullDate = dayjs(createTimestamp(date, time), 'DD-MM-YYYY hh24:mm');
    if (fullDate.diff() < 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Session Time cannot be in the past',
      });
    }
  });

type SessionFormSchema = z.infer<typeof editSessionSchema>;

export const SessionForm: FC<SessionFormProps> = ({
  isUpdating,
  onSubmit,
  editMode,
  onBack,
  ...props
}) => {
  const navigate = useNavigate();
  let date: MaybeNull<string> = null;
  let time: MaybeNull<string> = null;
  let note: MaybeNull<string> = null;
  if (editMode === 'UPDATE' && 'session' in props && !!props.session) {
    [date, time] = props.session.counsellingDate.split(' ');
    note = props.session.note;
  }

  const createMode = editMode === 'CREATE' && 'sessionId' in props;
  const sessionCreated = createMode && !!props.sessionId;

  const { register, control, handleSubmit } = useForm<SessionFormSchema>({
    resolver: zodResolver(editSessionSchema),
    defaultValues: {
      date: date ? dayjs(date, 'DD-MM-YYYY') : null,
      time: date ? dayjs(time, 'HH:mm') : null,
      note,
    },
  });

  const handleClose = () => {
    onBack();
  };

  const submitHandler: SubmitHandler<SessionFormSchema> = async (form) => {
    const { date, time } = form;
    if (date && time) {
      onSubmit({
        requestDate: createTimestamp(date, time) as string,
        note: form.note,
      });
    }
  };

  const errorHandler: SubmitErrorHandler<SessionFormSchema> = (errors) => {
    zodValidationErrors(errors);
  };

  const header = (
    <AppHeader
      title={
        createMode
          ? sessionCreated
            ? i18n._(
                t({
                  id: 'ScheduleCouncelling.CreatedHeader',
                  message: 'Session Created',
                })
              )
            : i18n._(
                t({
                  id: 'ScheduleCouncelling.Header',
                  message: 'Schedule a session',
                })
              )
          : i18n._(
              t({
                id: 'ScheduleCouncelling.RescheduleHeader',
                message: 'Reschedule your session',
              })
            )
      }
      backEnabled={!sessionCreated}
      backIcon={<ArrowBackIcon />}
      onBack={handleClose}
    ></AppHeader>
  );

  return (
    <Scaffold header={header}>
      {!sessionCreated && (
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
                  format={DATE_FORMAT}
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
            loading={isUpdating}
          >
            <Trans id="ScheduleCouncelling.Schedule">SCHEDULE</Trans>
          </LoadingButton>
        </form>
      )}
      {sessionCreated && !!props.sessionId && (
        <ScheduleConfirmation
          sessionId={props.sessionId}
        ></ScheduleConfirmation>
      )}
    </Scaffold>
  );
};
