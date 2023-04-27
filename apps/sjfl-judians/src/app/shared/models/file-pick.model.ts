import { Maybe } from './maybe.model';

export type FilePickerProps = {
  docId?: string;
  fileType?: 'image' | 'file' | 'image+file';
  onPick: (files: File[]) => void;
  files?: Maybe<File[]>;
  label?: string;
};
