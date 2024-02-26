import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DateFormatter = new Intl.DateTimeFormat('en-IN');
export const TimeFormatter = new Intl.DateTimeFormat('en-IN', {
  timeStyle: 'short',
});

export function filterEmptyProps(obj: Record<string, string>) {
  const object = { ...obj };
  Object.keys(object).forEach((prop) => {
    if (
      object[prop] === null ||
      object[prop] === undefined ||
      object[prop] === ''
    ) {
      delete object[prop];
    }
  });
  return object;
}
