import { Person } from './Person';

export type Judian = Person & {
  imageUrl?: string;
  guardian?: {
    relationship:
      | 'Father'
      | 'Mother'
      | 'Brother'
      | 'Sister'
      | 'Legal Guardian'
      | string;
    info: Person;
  };
  status: string;
};

export type JudianSearchResult = Omit<
  Judian,
  'guardian' | 'gender' | 'dob' | 'imageUrl'
>;
