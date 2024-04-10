import { clsx, type ClassValue } from 'clsx';
import { Dayjs } from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DateFormatter = Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export const TimeFormatter = Intl.DateTimeFormat('en-IN', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export function createTimestamp(date: Dayjs, time: Dayjs): string {
  const [
    { value: dateString },
    ,
    { value: monthString },
    ,
    { value: yearString },
  ] = DateFormatter.formatToParts(date.toDate());
  const timeString = TimeFormatter.format(time.toDate());

  return `${dateString}-${monthString}-${yearString} ${timeString}`;
}
