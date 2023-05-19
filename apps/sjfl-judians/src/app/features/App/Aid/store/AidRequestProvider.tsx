import { createContext, FC, PropsWithChildren, useState } from 'react';
import {
  AidRequest,
  AidRequestContextType,
  AidRequestState,
  EditorMode,
  RequestAidSteps,
} from '../models/aid-request.model';

import { v4 as uuid } from 'uuid';

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

  const addFile = (files: File[], documentName: string, docId: string) => {
    setRequest((request) => {
      let { docs = [] } = request!;
      const docIndex = docs.findIndex((doc) => doc.docId === docId);
      if (docIndex < 0) {
        docs = [
          ...docs,
          {
            docId: docId,
            documentName: documentName,
            files: files.map((file) => ({
              id: uuid(),
              file: file,
            })),
          },
        ];
      } else {
        const document = docs[docIndex];
        document.files = [
          ...document.files,
          ...files.map((file) => ({ id: uuid(), file })),
        ];
        docs = [...docs];
      }
      return {
        ...request,
        docs: docs,
      };
    });
  };

  const removeFile = (docId: string, fileId: string) => {
    setRequest((request) => {
      let { docs = [] } = request!;
      const docIndex = docs.findIndex((doc) => doc.docId === docId);

      if (docIndex < 0) {
        return request;
      }

      const fileIndex = docs[docIndex].files.findIndex(
        (file) => file.id === fileId
      );

      if (fileIndex >= 0) {
        docs[docIndex].files.splice(fileIndex, 1);
      }

      return {
        ...request,
        docs,
      };
    });
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
        addFile,
        removeFile,
        ...state,
      }}
    >
      {children}
    </AidRequestContext.Provider>
  );
};
