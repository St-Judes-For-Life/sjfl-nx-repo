import Button from '@mui/material/Button';
import { useAidRequest, useSelectedStream } from '../hooks/useAidRequest';

export const SelectAidNature = () => {
  const aidRequest = useAidRequest();
  const stream = useSelectedStream();
  return (
    <div className="grid auto-rows-[4rem] gap-4">
      {stream.categories.map((category) => (
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          key={category.id}
          onClick={() => {
            aidRequest.nextStep({
              nature: category,
            });
          }}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};
