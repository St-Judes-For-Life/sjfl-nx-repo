import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useForm } from 'react-hook-form';
import { useAidRequest, useSelectedStream } from '../hooks/useAidRequest';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Trans } from '@lingui/macro';

export const AidAdditionalInfo = () => {
  const aidRequest = useAidRequest();
  const stream = useSelectedStream();
  const { register, handleSubmit } = useForm();

  const onSubmit = (event: any) => {
    aidRequest.nextStep({
      ...aidRequest.request,
    });
  };

  const submitBtn = (
    <Button fullWidth variant="contained" type="submit" className="!mt-4">
      <Trans id="AidAdditionalInfo.next">NEXT</Trans>
    </Button>
  );

  if (stream.additionalInformation.length === 0) {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        No Additional information required
        {submitBtn}
      </form>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {stream.additionalInformation.map((info, index) => {
        return (
          <FormControl fullWidth key={info.id}>
            <FormLabel htmlFor={info.label}>{info.label}</FormLabel>

            {(() => {
              if (info.type === 'number') {
                return (
                  <OutlinedInput
                    type="number"
                    inputMode="numeric"
                    id={info.label}
                    {...register(info.label)}
                    autoFocus={index === 0}
                    fullWidth
                    placeholder={info.placeholder}
                  />
                );
              }

              if (info.type === 'currency') {
                return (
                  <OutlinedInput
                    type="number"
                    inputMode="tel"
                    id={info.label}
                    {...register(info.label)}
                    autoFocus={index === 0}
                    fullWidth
                    placeholder={info.placeholder}
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                  />
                );
              }
              return (
                <OutlinedInput
                  id={info.label}
                  {...register(info.label)}
                  autoFocus={index === 0}
                  fullWidth
                  placeholder={info.placeholder}
                />
              );
            })()}
          </FormControl>
        );
      })}
      {submitBtn}
    </form>
  );
};
