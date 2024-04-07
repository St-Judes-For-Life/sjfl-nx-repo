import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { filterEmptyProps, parseSearchParams } from '../../lib/utils';
import { Button } from '../../ui/components/Button';
import { Card, CardContent, CardTitle } from '../../ui/components/Card';
import { Input } from '../../ui/components/Input';
import { Label } from '../../ui/components/Label';
import { Text } from '../../ui/components/Text';
import { SearchItem } from '../models/Search';

type SearchWidgetProps = {
  title: string;
  fields: SearchItem[];
};

export const SearchWidget = ({ title, fields }: SearchWidgetProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: parseSearchParams(searchParams),
  });

  const handleReset = () => reset();

  const handleSearch = (query: Record<string, string>) => {
    const filtered = filterEmptyProps(query);
    console.log(query, filtered);
    setSearchParams(filtered);
  };

  return (
    <Card>
      <CardTitle>
        <Text className="text-muted font-thin">Search for {title}</Text>
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
