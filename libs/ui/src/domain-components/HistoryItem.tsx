export const HistoryItem = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  return (
    <p>
      <span className="text-md font-semibold text-primary">{name}:</span>{' '}
      {value}
    </p>
  );
};
