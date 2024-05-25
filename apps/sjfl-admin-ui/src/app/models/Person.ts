export type Person = {
  id: string;
  name: string;
  phone: string;
  dob?: Date;
  gender?: 'Male' | 'Female' | 'Other';
  email?: string;
};
