import { createContext, FC, PropsWithChildren, useState } from 'react';
import {
  AidRequest,
  AidRequestContextType,
  AidRequestState,
  EditorMode,
  RequestAidSteps,
} from '../models/aid-request.model';

export const AidRequestContext = createContext<
  AidRequestContextType | undefined
>(undefined);

export const AidRequestProvider: FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<EditorMode>('create');
  const [step, setStep] = useState<RequestAidSteps>(RequestAidSteps.stream);
  const [request, setRequest] = useState<Partial<AidRequest>>();

  const reset = () => {
    setStep(RequestAidSteps.stream);
    setRequest(undefined);
  };

  const startCreateMode = () => setMode('create');
  const startEditMode = (request: AidRequest) => {
    setMode('edit');
    setRequest(request);
    setStep(RequestAidSteps.info);
  };

  const previousStep = () => {
    if (step === 0 || step === RequestAidSteps.complete) {
      return;
    }

    if (mode === 'edit' && step === RequestAidSteps.info) {
      return;
    }

    setStep((step) => step - 1);
  };

  const nextStep = (updatedRequest: Partial<AidRequest>) => {
    if (step === RequestAidSteps.complete) {
      return;
    }
    setRequest((request) => ({ ...request, ...updatedRequest }));
    setStep((step) => step + 1);
  };

  const state: AidRequestState = { step, request, mode };

  return (
    <AidRequestContext.Provider
      value={{
        reset,
        startCreateMode,
        startEditMode,
        previousStep,
        nextStep,
        ...state,
      }}
    >
      {children}
    </AidRequestContext.Provider>
  );
};
