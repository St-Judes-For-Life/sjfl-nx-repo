import { Session } from '../models/Session';

export const todaysSessions: Session[] = [
  {
    id: 1,
    judian: {
      id: '1',
      name: 'Rohit Sharma',
    },
    notes: 'some notes',
    date: new Date(2023, 6, 22, 12, 0),
    status: 'Pending',
  },
  {
    id: 2,
    judian: {
      id: '2',
      name: 'Rahul Kumar',
    },
    notes: 'some notes',
    date: new Date(2023, 6, 22, 12, 0),
    status: 'Pending',
  },
  {
    id: 3,
    judian: {
      id: '3',
      name: 'Amit Patel',
    },
    notes: 'some notes',
    date: new Date(2023, 6, 22, 12, 0),
    status: 'Pending',
  },
];
