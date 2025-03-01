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

export type DropdownSearch<T> = RegularSearchItem & {
  type: 'dropdown';
  defaultValue: string,
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
  | DatedaterangeItem
  | DropdownSearch<T>;
