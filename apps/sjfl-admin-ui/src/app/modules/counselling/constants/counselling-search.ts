import { SearchItem } from '../../../models/Search';

export const CounsellingNameSearch: SearchItem = {
  label: 'Name',
  property: 'name',
  type: 'text',
  placeholder: 'Name of Judian',
};

export const CounsellingStatusSearch: SearchItem = {
  label: 'Status',
  property: 'counsellingStatuses',
  placeholder: 'Select Status',
  type: 'dropdown',
  options: [],
};

export const CounsellingDateSearch: SearchItem = {
  label: 'Date',
  type: 'daterange',
  property: 'range',
  placeholder: 'Select From and To Dates',
};
