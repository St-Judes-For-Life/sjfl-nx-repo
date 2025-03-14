import {
  Button,
  Card,
  CardContent,
  CardTitle,
  DateRangePicker,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
  filterEmptyProps,
  parseSearchParams,
} from '@sjfl/ui';
import { useQueryClient } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { useLocation, useSearchParams } from 'react-router-dom';
import { SearchItem } from '../models/Search';
import { DateFormatter } from '@sjfl/data';

type SearchWidgetProps = {
  title: string;
  fields: SearchItem[];
};

export const SearchWidget = ({ title, fields }: SearchWidgetProps) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { control, register, handleSubmit, reset } = useForm({
    defaultValues: parseSearchParams(searchParams),
  });

  const handleReset = () => {
    reset(
      fields.reduce((acc, val) => {
        acc[val.property] = '';
        return acc;
      }, {} as Record<string, string>)
    );
    handleSearch({});
  };

  const handleSearch = (query: Record<string, any>) => {
    if ('range' in query) {
      const { from, to } = query['range'] as DateRange;
      delete query['range'];

      if (from) {
        query['fromDate'] = DateFormatter(from) + ' 00:00';
      }
      if (to) {
        query['toDate'] = DateFormatter(to) + ' 23:59';
      }
    }
    const filtered: Record<string, string> = filterEmptyProps(query);
    const item = location.pathname.replace('/', '');
    const queryKey = ['search', item, new URLSearchParams(filtered).toString()];
    queryClient.invalidateQueries({
      queryKey: queryKey,
    });
    setSearchParams(filtered);
  };

  return (
    <Card>
      <CardTitle>
        <Text className="text-slate-500 font-thin">Search for {title}</Text>
      </CardTitle>
      <CardContent>
        <form onSubmit={handleSubmit(handleSearch)} className="grid gap-2">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {fields.map((field) => (
              <div key={field.label}>
                <Label htmlFor={field.label}>{field.label}</Label>

                <SearchField
                  field={field}
                  register={register}
                  control={control}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4">
            <Button type="button" onClick={handleReset} variant={'secondary'}>
              Clear
            </Button>
            <Button type="submit">Search</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const SearchField = <T extends FieldValues>({
  field,
  control,
  register,
}: {
  field: SearchItem;
  register: UseFormRegister<T>;
  control: Control<T>;
}) => {
  if (field.type === 'dropdown') {
    return (
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select value={value} onValueChange={onChange} defaultValue={field.defaultValue}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {field.options.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        // @ts-ignore: Ignore type error as it is expected
        name={field.property}
      ></Controller>
    );
  }
  if (field.type === 'daterange') {
    return (
      <Controller
        control={control}
        // @ts-ignore: Ignore type error as it is expected
        name={field.property}
        render={({ field: { onChange, value } }) => (
          <DateRangePicker value={value} onChange={onChange} />
        )}
      />
    );
  }
  return (
    <Input
      // @ts-ignore: Ignore type error as it is expected
      {...register(field.property)}
      type={field.type}
      id={field.label}
      placeholder={field.placeholder}
    />
  );
};
