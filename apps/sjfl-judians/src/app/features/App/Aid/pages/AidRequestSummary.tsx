import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import { useAidRequest } from '../hooks/useAidRequest';

export const AidRequestSummary = () => {
  const aidRequest = useAidRequest();

  return (
    <>
      <h2 className="text-xl font-bold text-center mb-8">
        <Trans id="AidRequestSummary.Title">Request Summary</Trans>
      </h2>
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          aidRequest.nextStep({
            ...aidRequest.request,
          });
        }}
      >
        SUBMIT
      </Button>
    </>
  );
};
