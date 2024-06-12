'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { FC, useState } from 'react';
import { DateRange, SelectRangeEventHandler } from 'react-day-picker';
import { cn } from '../lib/utils';
import { Button } from './Button';
import { Calendar } from './Calendar';
import { Popover, PopoverContent, PopoverTrigger } from './Popover';

type DateRangePickerProps = {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
};

export const DateRangePicker: FC<DateRangePickerProps> = ({
  value,
  onChange,
}) => {
  const handleChange: SelectRangeEventHandler = (range) => {
    onChange(range);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal h-9',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, 'LLL dd, y')} -{' '}
                {format(value.to, 'LLL dd, y')}
              </>
            ) : (
              format(value.from, 'LLL dd, y')
            )
          ) : (
            <span className="text-slate-500">Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={handleChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
};
