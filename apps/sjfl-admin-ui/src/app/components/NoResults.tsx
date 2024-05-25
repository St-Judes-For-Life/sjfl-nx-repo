import { Text } from '@sjfl/ui';
import { BookX } from 'lucide-react';

export const NoResults = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <Text as={'h3'}>No Records</Text>
      <BookX size={120} />
    </div>
  );
};
