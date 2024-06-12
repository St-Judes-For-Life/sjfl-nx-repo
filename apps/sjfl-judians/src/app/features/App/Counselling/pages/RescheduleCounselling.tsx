import { CreateSessionRequest } from '@sjfl/data';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverValidationErrorToasts } from '../../../../shared/lib/utils';
import { SessionForm } from '../components/SessionForm';
import { useFetchSessionById } from '../hooks/useFetchSessionById';
import { useUpdateSession } from '../hooks/useUpdateSession';

export const RescheduleCounselling = () => {
  const navigate = useNavigate();

  const { sessionId } = useParams();
  if (!sessionId) {
    throw Error('ID not found');
  }

  const { data: counsellingResp } = useFetchSessionById(sessionId);

  const session = counsellingResp?.data;

  const { mutateAsync: updateSession, isPending } = useUpdateSession();

  const handleSubmit = async (session: CreateSessionRequest) => {
    try {
      const resp = await updateSession({ session, sessionId });

      if (resp.status === 200) {
        toast.success('Session rescheduled');
        handleBack();
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
      editMode="UPDATE"
      onSubmit={handleSubmit}
      onBack={handleBack}
      isUpdating={isPending}
      session={session}
    />
  );
};
