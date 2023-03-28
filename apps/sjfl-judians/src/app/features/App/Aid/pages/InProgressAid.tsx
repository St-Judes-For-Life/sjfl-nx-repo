import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { NoResults } from '../../../../shared/components/error-states/NoResults';

export const InProgressAid = () => {
  const { i18n } = useLingui();
  return (
    <NoResults
      message={i18n._(
        t({
          id: 'Aid.InProgress.NoResults',
          message: "You don't have any in progress requests",
        })
      )}
      imgUrl="/assets/aid.svg"
      primaryAction={i18n._(
        t({
          id: 'Aid.RaiseRequest',
          message: 'RAISE A REQUEST',
        })
      )}
      onPrimaryAction={() => true}
    />
  );
};
