import Button from '@mui/material/Button';
import { useAidRequest } from '../hooks/useAidRequest';

export const SelectAidNature = () => {
  const aidRequest = useAidRequest();

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={() => {
        aidRequest.nextStep({
          stream: aidRequest.request?.stream,
          nature: 'School / College Fee',
        });
      }}
    >
      NEXT
    </Button>
  );
};
