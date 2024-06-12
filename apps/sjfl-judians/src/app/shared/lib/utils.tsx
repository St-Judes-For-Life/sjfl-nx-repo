import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { Dayjs } from 'dayjs';
import { startCase } from 'lodash-es';
import { FieldErrors } from 'react-hook-form';
import { toast } from 'react-toastify';
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

export function createDate(date: Dayjs | null) {
  if (!date) {
    return undefined;
  }
  const [
    { value: dateString },
    ,
    { value: monthString },
    ,
    { value: yearString },
  ] = DateFormatter.formatToParts(date.toDate());

  return `${dateString}-${monthString}-${yearString}`;
}

export function createTimestamp(date: Dayjs | null, time: Dayjs | null) {
  if (!date || !time) {
    return undefined;
  }
  const timeString = TimeFormatter.format(time.toDate());

  return `${createDate(date)} ${timeString}`;
}

export function filterProps<T extends object>(input: T | undefined) {
  if (input) {
    const filtered: Partial<T> = {};
    for (const [key, val] of Object.entries(input)) {
      if (val) {
        filtered[key as keyof T] = val as T[keyof T];
      }
    }
    return filtered as T;
  } else {
    return undefined;
  }
}

export function serverValidationErrorToasts(err: unknown) {
  const error = err as AxiosError<Record<string, string>>;
  const errors = error.response?.data;
  if (errors) {
    Object.entries(errors).forEach(([key, value]) => {
      toast.error(
        <>
          <em>{startCase(key)}</em> : {startCase(value)}
        </>
      );
    });
  }
}

export function zodValidationErrors<T extends Record<string, unknown>>(
  errors: FieldErrors<T>
) {
  Object.entries(errors).forEach(([field, error]) => {
    if (error) {
      const { message } = error;
      if (message) {
        toast.error(
          <>
            <em>{startCase(field)}</em> : {error.message}
          </>
        );
      }
    }
  });
}
