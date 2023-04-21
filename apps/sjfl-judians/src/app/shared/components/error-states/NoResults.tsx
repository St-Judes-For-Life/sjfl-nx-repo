import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Button } from '@mui/material';
import { FC } from 'react';

type NoResultsProps = {
  message?: string;
  imgUrl?: string;
  primaryAction?: string;
  onPrimaryAction?: () => void;
};

export const NoResults: FC<NoResultsProps> = ({
  message,
  imgUrl,
  primaryAction,
  onPrimaryAction,
}) => {
  const { i18n } = useLingui();
  message ??= i18n._(
    t({
      id: 'NoResults.DefaultMessage',
      message: 'No results found',
    })
  );
  imgUrl ??= '/assets/empty.svg';
  return (
    <div className="p-6 flex-grow flex flex-col items-center justify-center gap-5">
      <img className="h-60 w-60" src={imgUrl} alt="no results" />
      <h2 className="text-2xl text-center font-bold mb-10">{message}</h2>
      {primaryAction && onPrimaryAction && (
        <Button
          fullWidth
          color="primary"
          variant="contained"
          onClick={onPrimaryAction}
        >
          {primaryAction}
        </Button>
      )}
    </div>
  );
};
