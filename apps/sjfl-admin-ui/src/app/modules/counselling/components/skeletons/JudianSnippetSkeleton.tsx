import { Card, CardContent, Skeleton } from '@sjfl/ui';

export const JudianSnippetSkeleton = () => {
  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <Skeleton className="rounded-full w-12 h-12" />
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-32 h-5" />
          <Skeleton className="w-32 h-8" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-4">
          <Skeleton className="w-40 h-8 mb-6" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-32 h-5" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-32 h-5" />
              <Skeleton className="w-32 h-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
