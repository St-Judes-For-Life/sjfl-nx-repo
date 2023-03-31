import { Maybe } from '../../../../shared/models/maybe.model';

type StringInfoType = { type: 'string'; value: string };
type NumberInfoType = { type: 'number'; value: number };
type DateInfoType = { type: 'date'; value: Date };
type CurrencyInfoType = { type: 'currency'; value: Date };

type InfoType =
  | StringInfoType
  | NumberInfoType
  | CurrencyInfoType
  | DateInfoType;

export type EditorMode = 'create' | 'edit';

export enum RequestAidSteps {
  stream,
  nature,
  info,
  docs,
  summary,
  complete,
}

export type RequestSteps = keyof typeof RequestAidSteps;

type UploadFile = { file: File; documentName: string };

export type AidRequest = {
  stream: string;
  nature: string;
  additionalInfo: ({
    infoLabel: string;
  } & InfoType)[];
  files: UploadFile[];
};

export type AidRequestState = {
  mode: EditorMode;
  step: RequestAidSteps;
  request: Maybe<Partial<AidRequest>>;
};

export type AidRequestContextType = {
  reset: () => void;
  startEditMode: (request: AidRequest) => void;
  startCreateMode: () => void;
  previousStep: () => void;
  nextStep: (request: Partial<AidRequest>) => void;
} & AidRequestState;
