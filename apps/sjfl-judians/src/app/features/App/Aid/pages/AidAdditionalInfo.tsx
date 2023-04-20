import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useForm } from 'react-hook-form';
import { useAidRequest, useSelectedStream } from '../hooks/useAidRequest';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export const AidAdditionalInfo = () => {
  const aidRequest = useAidRequest();
  const stream = useSelectedStream();
  const { register, handleSubmit } = useForm();

  const onSubmit = (event: any) => {
    console.log(event);
  };

  if (stream.additionalInformation.length === 0) {
    return (
      <>
        No Additional information required
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            aidRequest.nextStep({
              ...aidRequest.request,
            });
          }}
        >
          NEXT
        </Button>
      </>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmit)}></form>
      {stream.additionalInformation.map((info, index) => {
        return (
          <FormControl fullWidth={true} key={info.id}>
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
    </div>
  );
};
