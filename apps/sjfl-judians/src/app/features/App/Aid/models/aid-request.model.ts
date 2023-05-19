import { Maybe } from '../../../../shared/models/maybe.model';
import {
  AdditionalInformationConfig,
  CategoryConfig,
  StreamConfig,
} from './aid-workflow-config.model';

type StringInfoType = { type: 'string'; value: string; label: string };
type NumberInfoType = { type: 'number'; value: number; label: string };
type DateInfoType = { type: 'date'; value: Date; label: string };
type CurrencyInfoType = { type: 'currency'; value: number; label: string };
type SelectType = {
  type: 'select';
  value: string;
  options: string[];
  label: string;
};

export type InfoType =
  | StringInfoType
  | NumberInfoType
  | CurrencyInfoType
  | DateInfoType
  | SelectType;

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

export type AidReqDocumentFiles = {
  files: { file: File; id: string }[];
  docId: string;
  documentName: string;
};

export type AidRequest = {
  stream: StreamConfig;
  nature: CategoryConfig;
  additionalInfo: AdditionalInformationConfig[];
  docs: AidReqDocumentFiles[];
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
  addFile: (files: File[], documentName: string, docId: string) => void;
  removeFile: (docId: string, fileId: string) => void;
} & AidRequestState;
