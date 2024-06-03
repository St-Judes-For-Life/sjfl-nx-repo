import { CounsellingStatus } from '@sjfl/data';

export type UpdateSessionModal = {
  id: string;
  currentStatus: CounsellingStatus;
  onUpdate: VoidFunction;
  onError?: VoidFunction;
  disabled?: boolean;
};
