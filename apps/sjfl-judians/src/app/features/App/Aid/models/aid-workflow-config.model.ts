import { InfoType } from './aid-request.model';

export type AidWorkflowConfig = {
  streams: Stream[];
};

export type Stream = {
  id: number;
  name: string;
  categories: Category[];
  additionalInformation: AdditionalInformation[];
  documents: Document[];
};

export type AdditionalInformation = InfoType & {
  id: number;
  placeholder: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Document = {
  id: string;
  documentName: string;
};
