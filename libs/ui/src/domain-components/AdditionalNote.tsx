import { CounsellingSession } from '@sjfl/data';

export const AdditionalNote = ({
  session,
}: {
  session: CounsellingSession;
}) => {
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
