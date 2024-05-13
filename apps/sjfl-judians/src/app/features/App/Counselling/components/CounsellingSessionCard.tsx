import { FC } from 'react';
import { CounsellingSession } from '../models/CounsellingSession';

type CounsellingSessionCardProps = {
  session: CounsellingSession;
};

export const CounsellingSessionCard: FC<CounsellingSessionCardProps> = ({
  session,
}) => {
  return (
    <div className="m-4 rounded-xl border-tertiary border-2 p-2">
      <h4 className="font-bold text-tertiary">{session.counsellingId}</h4>
      <h5 className="font-medium">{session.counsellingDate}</h5>
      <p>Note: {session.note || '-'}</p>
    </div>
  );
};
