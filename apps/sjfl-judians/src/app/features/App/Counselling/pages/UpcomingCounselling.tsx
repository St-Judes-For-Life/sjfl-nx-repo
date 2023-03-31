import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { NoResults } from "apps/sjfl-judians/src/app/shared/components/error-states/NoResults";
import { useNavigate } from "react-router-dom";

export const UpcomingCounselling = () => {
  const { i18n } = useLingui();
  const navigate = useNavigate();
  return (
    <NoResults
      message={i18n._(
        t({
          id: 'Counselling.Upcoming.NoResults',
          message: "You don't have any session scheduled",
        })
      )}
      imgUrl="/assets/schedule_1.svg"
      primaryAction={i18n._(
        t({
          id: 'Counselling.Upcoming.RaiseRequest',
          message: 'SCHEDULE A SESSION',
        })
      )}
      onPrimaryAction={() => true}
    />
  );
};
