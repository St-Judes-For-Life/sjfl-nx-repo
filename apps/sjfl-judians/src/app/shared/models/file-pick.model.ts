import { Maybe } from './maybe.model';

export type FilePickerProps = {
  docId?: string;
  fileType?: 'image' | 'file' | 'image+file';
  onPick: (files: File[]) => void;
  label?: string;
};
