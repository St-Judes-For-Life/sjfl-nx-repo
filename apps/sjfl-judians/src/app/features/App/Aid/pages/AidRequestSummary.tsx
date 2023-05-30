import { Trans } from '@lingui/macro';
import Button from '@mui/material/Button';
import { useAidRequest } from '../hooks/useAidRequest';

export const AidRequestSummary = () => {
  const { request, nextStep } = useAidRequest();

  return (
    <>
      <h2 className="text-xl font-bold text-center mb-6">
        <Trans id="AidRequestSummary.Title">Request Summary</Trans>
      </h2>
      <div className="grid gap-6">
        <section>
          <h3 className="text-primary text-lg font-semibold">
            <Trans id="AidRequestSteps.Stream">Support Stream</Trans>
          </h3>
          <p>{request?.stream?.name}</p>
        </section>

        <section>
          <h3 className="text-primary text-lg font-semibold">
            <Trans id="AidRequestSteps.Nature">Nature of Support</Trans>
          </h3>
          <p>{request?.nature?.name}</p>
        </section>

        {request &&
          request.additionalInfo &&
          request?.additionalInfo?.length > 0 && (
            <section>
              <h3 className="text-primary text-lg font-semibold">
                <Trans id="AidRequestSteps.Info">Additional Info</Trans>
              </h3>
              {request?.additionalInfo?.map((info) => (
                <p>
                  <span className="font-medium">{info.label}</span> -{' '}
                  {info.value.toString()}
                </p>
              ))}
            </section>
          )}
        {request && request.docs && request?.docs?.length > 0 && (
          <section>
            <h3 className="text-primary text-lg font-semibold">
              <Trans id="AidRequestSteps.Docs">Documents Upload</Trans>
            </h3>
            {request?.docs?.map((doc) => (
              <p>{doc.documentName}</p>
            ))}
          </section>
        )}
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            nextStep({
              ...request,
            });
          }}
        >
          SUBMIT
        </Button>
      </div>
    </>
  );
};
