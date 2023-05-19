import { InfoType } from './aid-request.model';

export type AidWorkflowConfig = {
  streams: StreamConfig[];
};

export type StreamConfig = {
  id: number;
  name: string;
  categories: CategoryConfig[];
  additionalInformation: AdditionalInformationConfig[];
  docs: DocumentConfig[];
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
