import { useForm } from 'react-hook-form';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  Input,
  Label,
  Text,
  filterEmptyProps,
  parseSearchParams,
} from '@sjfl/ui';
import { SearchItem } from '../models/Search';
import { useQueryClient } from '@tanstack/react-query';

type SearchWidgetProps = {
  title: string;
  fields: SearchItem[];
};

export const SearchWidget = ({ title, fields }: SearchWidgetProps) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: parseSearchParams(searchParams),
  });

  const handleReset = () => reset();

  const handleSearch = (query: Record<string, string>) => {
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
          <div className="grid grid-cols-3 gap-2">
            {fields.map((field) => (
              <div key={field.label}>
                <Label htmlFor={field.label}>{field.label}</Label>
                <Input
                  {...register(field.property)}
                  type={field.type}
                  id={field.label}
                  placeholder={field.placeholder}
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
