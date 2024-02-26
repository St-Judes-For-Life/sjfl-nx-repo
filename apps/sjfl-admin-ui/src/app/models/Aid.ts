import { Judian } from './Judian';

export type Aid = {
  id: number;
  status: string;
  category: string;
  judian: Judian;
  stream: string;
  date: Date;
};
