import { SearchItem } from '../../../models/Search';

export const AidSearchConfig: SearchItem[] = [
  {
    label: 'Name',
    property: 'name',
    type: 'text',
    placeholder: 'Name of Judian',
  },
  {
    label: 'Status',
    property: 'status',
    placeholder: 'Select Status',
    type: 'dropdown',
    options: [
      {
        id: 0,
        label: 'Pending',
        value: 'PENDING',
      },
      {
        id: 1,
        label: 'Rescheduled',
        value: 'RESCHEDULED',
      },
      {
        id: 3,
        label: 'Cancelled',
        value: 'CANCELLED',
      },
      {
        id: 4,
        label: 'Completed',
        value: 'COMPLETED',
      },
    ],
  },
  {
    label: 'Date',
    type: 'daterange',
    property: 'range',
    placeholder: 'Select From and To Dates',
  },
];
