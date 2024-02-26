export type Person = {
  id: number;
  name: string;
  phone: string;
  dob?: Date;
  gender?: 'Male' | 'Female' | 'Other';
  email?: string;
};
