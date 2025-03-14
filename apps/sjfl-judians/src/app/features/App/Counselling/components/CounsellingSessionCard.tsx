import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CounsellingSession } from '@sjfl/data';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type CounsellingSessionCardProps = {
  session: CounsellingSession;
};

export const CounsellingSessionCard: FC<CounsellingSessionCardProps> = ({
  session,
}) => {
  const navigate = useNavigate();

  const handleShowSession = () => {
    navigate(`/counselling/history/${session.counsellingId}`);
  };

  return (
    <Card
      variant="outlined"
      className="border-tertiary border-2"
      onClick={handleShowSession}
    >
      <CardContent>
        <h4 className="font-bold text-base text-tertiary">
          {session.counsellingId}
        </h4>
        <h5 className="text-md font-medium mb-2">{session.counsellingDate}</h5>
        <p>
          <span className="font-semibold">Status:</span>{' '}
          {session.counsellingStatus}
        </p>
        <p>
          <span className="font-semibold">Note:</span> {session.note || '-'}
        </p>
      </CardContent>
    </Card>
  );
};
