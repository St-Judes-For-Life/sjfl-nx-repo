import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DateFormatter = (date: Date) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(date)
    .replaceAll('/', '-');

export const TimeFormatter = new Intl.DateTimeFormat('en-IN', {
  timeStyle: 'short',
});

export const dateTimeToString = (date: Date, time: string) => {
  return DateFormatter(date) + ' ' + time;
};

export function filterEmptyProps(obj: Record<string, any>) {
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

export function parseSearchParams(
  params: URLSearchParams
): Record<string, any> {
  const record: Record<string, string> = {};
  params.forEach((value, key) => {
    if (value) {
      if (record[key]) {
        record[key] += `,${value}`;
      } else {
        record[key] = value;
      }
    }
  });
  return record;
}

export const randomValue = (from: number, to: number) => {
  return Math.floor(Math.random() * (to - from + 1)) + from;
};
