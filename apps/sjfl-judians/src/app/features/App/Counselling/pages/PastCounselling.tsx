import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { NoResults } from "apps/sjfl-judians/src/app/shared/components/error-states/NoResults";

export const PastCounselling = () => {
  const { i18n } = useLingui();
  return (
    <NoResults
      message={i18n._(
        t({
          id: 'Counselling.past.NoResults',
          message: "You don't have any past sessions",
        })
      )}
      imgUrl="/assets/aid.svg"
    />
  );
};
