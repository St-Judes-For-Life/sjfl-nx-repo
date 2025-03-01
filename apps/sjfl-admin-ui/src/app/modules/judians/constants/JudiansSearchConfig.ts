import { SearchItem } from '../../../models/Search';

export const JudiansSearchConfig: SearchItem[] = [
  {
    label: 'UID',
    property: 'uid',
    type: 'text',
    placeholder: 'UID of Judian',
  },
  {
    label: 'Name',
    property: 'name',
    type: 'text',
    placeholder: 'Name of Judian',
  },
  {
    label: 'Phone',
    property: 'phone',
    type: 'tel',
    placeholder: 'Mobile number of Judian',
  },
  {
    label: 'Email',
    property: 'email',
    type: 'email',
    placeholder: 'Email ID of Judian',
  },
  {
    label: 'Status',
    property: 'status',
    placeholder: 'Select Status',
    type: 'dropdown',
    defaultValue: 'ACTIVE',
    options: [
      {
        id: 0,
        label: 'Active',
        value: 'ACTIVE',
      },
      {
        id: 1,
        label: 'Inactive',
        value: 'INACTIVE',
      },
    ],
  },
];
