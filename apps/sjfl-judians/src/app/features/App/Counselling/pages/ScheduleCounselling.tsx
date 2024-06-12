import { useNavigate } from 'react-router-dom';
import { SessionForm } from '../components/SessionForm';
import { CreateSessionRequest } from '@sjfl/data';
import { useCreateSession } from '../hooks/useCreateSession';
import { serverValidationErrorToasts } from '../../../../shared/lib/utils';
import { useState } from 'react';

export const ScheduleCounselling = () => {
  const navigate = useNavigate();

  const [sessionId, setSessionId] = useState<string>();
  const { mutateAsync: createSession, isPending } = useCreateSession();

  const handleSubmit = async (req: CreateSessionRequest) => {
    try {
      const resp = await createSession(req);

      if (resp.status === 200) {
        setSessionId(resp.data.counsellingId);
      }
    } catch (err) {
      serverValidationErrorToasts(err);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <SessionForm
      editMode="CREATE"
      onSubmit={handleSubmit}
      onBack={handleBack}
      isUpdating={isPending}
      sessionId={sessionId}
    />
  );
};
