import { Judian } from './Judian';

export type Session = {
  id: number;
  judian: Pick<Judian, 'id' | 'name' | 'imageUrl'>;
  date: Date;
  status: string;
  notes?: string;
};
