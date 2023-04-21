import { useCallback } from 'react';
import { Page } from '../../../../shared/components/containers/Page';
import { AidRequestHeader } from '../components/AidRequestHeader';
import { AidRequestStepper } from '../components/AidRequestStepper';
import { useAidRequest } from '../hooks/useAidRequest';
import { RequestAidSteps } from '../models/aid-request.model';
import { AidAdditionalInfo } from './AidAdditionalInfo';
import { AidRequestSuccess } from './AidRequestSuccess';
import { AidRequestSummary } from './AidRequestSummary';
import { SelectAidNature } from './SelectAidNature';
import { SelectAidStream } from './SelectAidStream';
import { UploadAidDocs } from './UploadAidDocs';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';

export const AidRequestFlow = () => {
  const aidRequest = useAidRequest();

  const renderStep = useCallback(() => {
    switch (aidRequest.step) {
      case RequestAidSteps.stream:
        return <SelectAidStream />;
      case RequestAidSteps.nature:
        return <SelectAidNature />;
      case RequestAidSteps.info:
        return <AidAdditionalInfo />;
      case RequestAidSteps.docs:
        return <UploadAidDocs />;
      case RequestAidSteps.summary:
        return <AidRequestSummary />;
      case RequestAidSteps.complete:
        return <AidRequestSuccess />;
    }
  }, [aidRequest.step]);

  return (
    <Scaffold header={<AidRequestHeader />}>
      <section className="px-6">
        <AidRequestStepper />
        {renderStep()}
      </section>
    </Scaffold>
  );
};
