import { Card, CardContent, Skeleton } from '@sjfl/ui';

export const PreviousSessionsSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <Skeleton className="h-6 w-48" />
        <PreviousSessionSnippetSkeleton />
        <PreviousSessionSnippetSkeleton />
        <PreviousSessionSnippetSkeleton />
      </CardContent>
    </Card>
  );
};

const PreviousSessionSnippetSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </CardContent>
    </Card>
  );
};
