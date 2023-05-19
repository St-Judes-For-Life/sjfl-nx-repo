import { Trans } from '@lingui/macro';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { Maybe } from '../../../../shared/models/maybe.model';
import { useAidRequest, useSelectedStream } from '../hooks/useAidRequest';
import { AdditionalInformationConfig } from '../models/aid-workflow-config.model';

type FormValue = { [id: string]: string | number | Date };

export const AidAdditionalInfo = () => {
  const { request, nextStep } = useAidRequest();
  const stream = useSelectedStream();

  const { register, handleSubmit, setValue, control, setFocus } = useForm({
    reValidateMode: 'onSubmit',
  });

  useEffect(() => {
    request?.additionalInfo?.forEach((info) => {
      setValue(info.id.toString(), info.value, {
        shouldValidate: true,
      });
    });
  }, []);

  const onError: SubmitErrorHandler<FormValue> = (errors) => {
    nextStep({
      ...request,
    });

    return;

    const [key, err] = Object.entries(errors)?.[0];
    console.log(errors);

    const label = stream.additionalInformation.find(
      (info) => info.id === +key
    )?.label;

    if (label) {
      toast.error(<Trans id="Forms.ReqdError">Missing Input: {label}</Trans>);
      (err?.ref as HTMLInputElement)?.focus();
      setFocus(key);
    }
  };

  const onSubmit: SubmitHandler<FormValue> = (formValue) => {
    const additionalInfo: AdditionalInformationConfig[] = [];

    Object.entries(formValue).map(([key, value]) => {
      const info: Maybe<AdditionalInformationConfig> =
        stream.additionalInformation.find(
          (streamInfo) => streamInfo.id === +key
        );

      if (info) {
        switch (info.type) {
          case 'number':
          case 'currency':
            info.value = +value;
            break;
          case 'string':
          case 'select':
            info.value = value as string;
            break;
          case 'date':
            info.value = value as Date;
            break;
        }

        additionalInfo.push(info);
      }
    });

    nextStep({
      ...request,
      additionalInfo,
    });
  };

  const submitBtn = (
    <Button fullWidth variant="contained" type="submit" className="!mt-4">
      <Trans id="AidAdditionalInfo.next">NEXT</Trans>
    </Button>
  );

  if (stream.additionalInformation.length === 0) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4"
      >
        No Additional information required
        {submitBtn}
      </form>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex flex-col gap-4"
    >
      {stream.additionalInformation.map((info, index) => {
        return (
          <FormControl fullWidth key={info.id}>
            <FormLabel htmlFor={`input_${info.id}`}>{info.label}</FormLabel>

            {(() => {
              if (info.type === 'number') {
                return (
                  <OutlinedInput
                    type="number"
                    inputMode="numeric"
                    id={`input_${info.id}`}
                    {...register(info.id.toString(), { required: true })}
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
                    id={`input_${info.id}`}
                    {...register(info.id.toString(), { required: true })}
                    autoFocus={index === 0}
                    fullWidth
                    placeholder={info.placeholder}
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                  />
                );
              }

              if (info.type === 'date') {
                return (
                  <OutlinedInput
                    type="date"
                    id={`input_${info.id}`}
                    {...register(info.id.toString(), { required: true })}
                    autoFocus={index === 0}
                    fullWidth
                    placeholder={info.placeholder}
                    startAdornment={
                      <InputAdornment position="start">
                        <CalendarMonthIcon />
                      </InputAdornment>
                    }
                  />
                );
              }

              if (info.type === 'select') {
                return (
                  <Controller
                    control={control}
                    name={info.id.toString()}
                    rules={{ required: true }}
                    defaultValue={''}
                    render={({ field: { ref, ...field } }) => (
                      <Select
                        {...field}
                        inputRef={ref}
                        inputProps={{ id: `input_${info.id}` }}
                        autoFocus={index === 0}
                        fullWidth
                        displayEmpty={true}
                        renderValue={(value) => {
                          return value ? (
                            <>{value}</>
                          ) : (
                            <span className="text-gray-400">
                              {info.placeholder}
                            </span>
                          );
                        }}
                      >
                        {info.options.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                );
              }
              return (
                <OutlinedInput
                  id={`input_${info.id}`}
                  {...register(info.id.toString(), { required: true })}
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
