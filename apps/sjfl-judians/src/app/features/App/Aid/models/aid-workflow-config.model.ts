import { InfoType } from './aid-request.model';

export type AidWorkflowConfig = {
  stream: StreamConfig[];
};

export type StreamConfig = {
  id: number;
  name: string;
  categories: CategoryConfig[];
  additionalInfos: AdditionalInformationConfig[];
  documents: DocumentConfig[];
};

export type AdditionalInformationConfig = InfoType & {
  id: number;
  placeholder?: string;
};

export type CategoryConfig = {
  id: number;
  name: string;
};

export type DocumentConfig = {
  id: string;
  documentName: string;
};
