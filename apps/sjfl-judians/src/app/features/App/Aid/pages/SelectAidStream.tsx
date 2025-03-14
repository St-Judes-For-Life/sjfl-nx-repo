import Button from '@mui/material/Button';
import { useAidRequest } from '../hooks/useAidRequest';
import { useAidWorkflowConfig } from '../hooks/useAidWorkflowConfig';

export const SelectAidStream = () => {
  const aidRequest = useAidRequest();
  const { data } = useAidWorkflowConfig();
  if (!data) {
    return <>Loading...</>;
  }
  return (
    <div className="grid grid-cols-3 gap-3 auto-rows-[8rem]">
      {data.stream.map((stream) => (
        <Button
          variant="contained"
          sx={{
            fontSize: '14px',
          }}
          color="primary"
          key={stream.id}
          onClick={() => {
            aidRequest.nextStep({
              stream: stream,
              nature: undefined,
              additionalInfo: undefined,
            });
          }}
        >
          {stream.name}
        </Button>
      ))}
    </div>
  );
};
