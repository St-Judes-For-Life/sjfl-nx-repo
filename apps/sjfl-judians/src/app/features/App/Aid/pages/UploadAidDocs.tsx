import Button from '@mui/material/Button';
import { useAidRequest } from '../hooks/useAidRequest';

export const UploadAidDocs = () => {
  const aidRequest = useAidRequest();

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={() => {
        aidRequest.nextStep({
          ...aidRequest.request,
        });
      }}
    >
      NEXT
    </Button>
  );
};
