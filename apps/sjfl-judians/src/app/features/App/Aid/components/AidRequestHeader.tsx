import { Trans, t } from '@lingui/macro';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAidRequest } from '../hooks/useAidRequest';
import { RequestAidSteps } from '../models/aid-request.model';
import { useLingui } from '@lingui/react';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { Maybe } from '../../../../shared/models/maybe.model';

export const AidRequestHeader = () => {
  const { i18n } = useLingui();
  const aidRequest = useAidRequest();
  const navigate = useNavigate();

  let title: string;
  let subtitle: Maybe<string>;

  const backEnabled = !(
    aidRequest.step === RequestAidSteps.complete ||
    (aidRequest.mode === 'edit' && aidRequest.step === RequestAidSteps.info)
  );

  const backHandler = useCallback(() => {
    if (aidRequest.step === 0) {
      navigate('../../');
    }

    if (
      aidRequest.step === RequestAidSteps.info &&
      aidRequest.mode === 'edit'
    ) {
      return;
    }

    aidRequest.previousStep();
  }, [aidRequest, navigate]);

  switch (aidRequest.step) {
    case RequestAidSteps.stream:
      title = i18n._(
        t({ id: 'SelectAidStream.Header', message: 'Raise a new request' })
      );
      break;
    case RequestAidSteps.nature:
      title = i18n._(
        t({
          id: 'SelectAidNature.Header',
          message: `${aidRequest.request?.stream?.name} Aid`,
        })
      );
      break;
    case RequestAidSteps.info:
    case RequestAidSteps.docs:
    case RequestAidSteps.summary:
    case RequestAidSteps.complete:
    case RequestAidSteps.nature:
      title = i18n._(
        t({
          id: 'SelectAidNature.Header',
          message: `${aidRequest.request?.stream?.name} Aid`,
        })
      );
      subtitle = aidRequest.request?.nature?.name;
      break;
  }
  return (
    <AppHeader
      title={title}
      subtitle={subtitle}
      backEnabled={backEnabled}
      onBack={backHandler}
    />
  );
};
