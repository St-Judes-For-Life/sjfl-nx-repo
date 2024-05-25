import { Card, CardContent, Skeleton } from '@sjfl/ui';

export const StatSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 items-center justify-center">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-8 w-[10px]" />
      </CardContent>
    </Card>
  );
};
