import { Card, CardContent } from '../../../../ui/components/Card';
import { Text } from '../../../../ui/components/Text';

type StatsCardProps = {
  title: string;
  stat: string;
};

export const StatsCard = ({ title, stat }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <Text as="h2" className="text-base">
          {title}
        </Text>
        <Text className="text-4xl">{stat}</Text>
      </CardContent>
    </Card>
  );
};
