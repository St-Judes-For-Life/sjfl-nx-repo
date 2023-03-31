import { Trans } from '@lingui/macro';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useAidRequest } from '../hooks/useAidRequest';
import { RequestAidSteps } from '../models/aid-request.model';

export const AidRequestStepper = () => {
  const aidRequest = useAidRequest();
  return (
    <div className="py-8 px-4">
      <Stepper activeStep={aidRequest.step} alternativeLabel>
        <Step
          key={RequestAidSteps.stream}
          disabled={aidRequest.mode === 'edit'}
        >
          <StepLabel>
            <Trans id="AidRequestSteps.Stream">Select Stream</Trans>
          </StepLabel>
        </Step>
        <Step
          key={RequestAidSteps.nature}
          disabled={aidRequest.mode === 'edit'}
        >
          <StepLabel>
            <Trans id="AidRequestSteps.Nature">Nature of support</Trans>
          </StepLabel>
        </Step>
        <Step key={RequestAidSteps.info}>
          <StepLabel>
            <Trans id="AidRequestSteps.Info">Additional Info</Trans>
          </StepLabel>
        </Step>
        <Step key={RequestAidSteps.docs}>
          <StepLabel>
            <Trans id="AidRequestSteps.Docs">Upload Documents</Trans>
          </StepLabel>
        </Step>
      </Stepper>
    </div>
  );
};
