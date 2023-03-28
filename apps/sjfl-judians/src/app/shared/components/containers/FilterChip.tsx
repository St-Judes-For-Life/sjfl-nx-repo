import Chip, { ChipProps } from '@mui/material/Chip';
import { FC } from 'react';

export const FilterChip: FC<ChipProps & { selected?: boolean }> = ({
  selected = false,
  ...props
}) => {
  return (
    <Chip
      className="w-full"
      variant={selected ? 'filled' : 'outlined'}
      color="primary"
      {...props}
    />
  );
};
