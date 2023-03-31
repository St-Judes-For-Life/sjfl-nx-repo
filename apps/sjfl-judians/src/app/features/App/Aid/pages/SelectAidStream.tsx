import { useAidRequest } from '../hooks/useAidRequest';
import Button from '@mui/material/Button';

export const SelectAidStream = () => {
  const aidRequest = useAidRequest();

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={() => {
        aidRequest.nextStep({
          stream: 'Education',
        });
      }}
    >
      NEXT
    </Button>
  );
};
