import { Trans } from '@lingui/macro';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAidRequest } from '../hooks/useAidRequest';
import { RequestAidSteps } from '../models/aid-request.model';

export const AidRequestHeader = () => {
  const aidRequest = useAidRequest();
  const navigate = useNavigate();

  const canGoBack = !(
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

  const createTitle = useCallback(() => {
    switch (aidRequest.step) {
      case RequestAidSteps.stream:
        return (
          <h1 className="flex-grow">
            <Trans id="SelectAidStream.Header">Raise a new request</Trans>
          </h1>
        );
      case RequestAidSteps.nature:
        return (
          <h1 className="flex-grow">
            <Trans id="SelectAidNature.Header">
              {aidRequest.request?.stream} Aid
            </Trans>
          </h1>
        );
      case RequestAidSteps.info:
      case RequestAidSteps.docs:
      case RequestAidSteps.summary:
      case RequestAidSteps.complete:
        return (
          <span className="flex-grow">
            <h1 className="text-sm">
              <Trans id="SelectAidNature.Header">
                {aidRequest.request?.stream} Aid
              </Trans>
            </h1>
            <h3 className="text-xs">{aidRequest.request?.nature}</h3>
          </span>
        );
    }
  }, [aidRequest]);
  return (
    <AppBar position="sticky">
      <Toolbar>
        {canGoBack && (
          <IconButton size="large" edge="start" onClick={backHandler}>
            <ArrowBackIcon />
          </IconButton>
        )}
        {createTitle()}
      </Toolbar>
    </AppBar>
  );
};
