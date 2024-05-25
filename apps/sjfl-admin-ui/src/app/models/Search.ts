import { Aid } from './Aid';
import { JudianSearchResult } from './Judian';
import { Session } from './Session';

export type SearchBy = 'aid' | 'counselling' | 'judians';

export type SearchResultTypeMap = {
  judian: JudianSearchResult[];
  aid: Aid[];
  counselling: Session[];
};

type RegularSearchItem = {
  label: string;
  type: 'text' | 'number' | 'tel' | 'email' | 'date' | 'dropdown' | 'daterange';
  placeholder: string;
  property: string;
};

type StringSearchItem = RegularSearchItem & {
  type: 'text';
};
type TelSearchItem = RegularSearchItem & {
  type: 'tel';
};
type EmailSearchItem = RegularSearchItem & {
  type: 'email';
};
type DateSearchItem = RegularSearchItem & {
  type: 'date';
};
type NumberSearchItem = RegularSearchItem & {
  type: 'number';
};

type DatedaterangeItem = RegularSearchItem & {
  type: 'daterange';
};

type DropdownSearch<T> = RegularSearchItem & {
  type: 'dropdown';
  options: {
    id: number;
    label: string;
    value: T;
  }[];
};

export type SearchItem<T = string> =
  | EmailSearchItem
  | TelSearchItem
  | NumberSearchItem
  | DateSearchItem
  | StringSearchItem
  | RegularSearchItem
  | DatedaterangeItem
  | DropdownSearch<T>;
