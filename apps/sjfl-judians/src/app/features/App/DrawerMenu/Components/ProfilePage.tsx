import { i18n } from '@lingui/core';
import { Trans, t } from '@lingui/macro';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AppHeader } from '../../../../shared/components/containers/AppHeader';
import { FilePickerDialog } from '../../../../shared/components/dialogs/FilePickerDialog';
import { useLoggedInUser } from '../../../../shared/hooks/useAuth';

import CloseIcon from '@mui/icons-material/Close';
import { z } from 'zod';
import { Scaffold } from '../../../../shared/components/containers/Scaffold';
import { UserProfile } from '../../../Auth/models/Profile';

const profileSchema = z.object({
  name: z.string(),
  mobileNumber: z.string().min(10).max(10),
  email: z.preprocess(
    (arg) => (arg === '' ? undefined : arg),
    z.string().email().optional()
  ),
  dateOfBirth: z.string(),
  gender: z.string(),
  imageUrl: z.preprocess(
    (arg) => (arg === '' ? undefined : arg),
    z.string().url().optional()
  ),
});

export type ProfilePageProps = {
  onClose: VoidFunction;
};

export const ProfilePage = ({ onClose: handleClose }: ProfilePageProps) => {
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const user = useLoggedInUser();
  const { control, register, handleSubmit } = useForm<UserProfile>({
    defaultValues: user,
  });

  const header = (
    <AppHeader
      title={i18n._(t({ id: 'Settings.Profile', message: 'Profile' }))}
      backEnabled
      backIcon={<CloseIcon />}
      onBack={handleClose}
    ></AppHeader>
  );

  return (
    <Scaffold header={header}>
      <div className="mt-4 p-4">
        <Avatar
          onClick={() => setFileDialogOpen(true)}
          src={user.imageUrl}
          sx={{
            width: '6rem',
            height: '6rem',
            fontSize: '3rem',
            margin: '0 auto',
          }}
        >
          {user.name.substring(0, 1).toLocaleUpperCase()}
        </Avatar>
        <form className="flex flex-col gap-4">
          <FormControl fullWidth required>
            <FormLabel htmlFor="name">
              <Trans id="Auth.Name">Name</Trans>
            </FormLabel>
            <OutlinedInput
              id="name"
              fullWidth
              autoComplete="name"
              {...register('name')}
              placeholder={i18n._(
                t({
                  id: 'Auth.Name_Placeholder',
                  message: 'Enter your full name',
                })
              )}
            />
          </FormControl>
          <FormControl fullWidth required>
            <FormLabel htmlFor="mobile">
              <Trans id="Auth.Mobile">Mobile</Trans>
            </FormLabel>
            <OutlinedInput
              id="mobile"
              fullWidth
              autoComplete="tel"
              {...register('mobileNumber')}
              type="tel"
              inputMode="tel"
              placeholder={i18n._(
                t({
                  id: 'Auth.Mobile_Placeholder',
                  message: 'Enter your mobile number',
                })
              )}
            />
          </FormControl>
          <FormControl fullWidth required={false}>
            <FormLabel htmlFor="email">
              <Trans id="Auth.Email">Email</Trans>
            </FormLabel>
            <OutlinedInput
              id="email"
              fullWidth
              autoComplete="email"
              type="email"
              inputMode="email"
              {...register('email')}
              placeholder={i18n._(
                t({
                  id: 'Auth.Email_Placeholder',
                  message: 'Enter your email id',
                })
              )}
            />
          </FormControl>
          <FormControl fullWidth required={false}>
            <FormLabel htmlFor="gender">
              <Trans id="Profile.Gender">Gender</Trans>
            </FormLabel>
            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <Select
                  id="gender"
                  onChange={onChange}
                  displayEmpty={true}
                  renderValue={(value) => {
                    return value ? (
                      value
                    ) : (
                      <span className="text-gray-400">
                        <Trans id="Profile.SelectGender">
                          Please select gender
                        </Trans>
                      </span>
                    );
                  }}
                  value={value}
                >
                  <MenuItem value="Male" key="male">
                    <Trans id="Profile.Gender_Male">Male</Trans>
                  </MenuItem>
                  <MenuItem value="Female" key="female">
                    <Trans id="Profile.Gender_Female">Female</Trans>
                  </MenuItem>
                  <MenuItem value="Other" key="other">
                    <Trans id="Profile.Gender_Other">Other</Trans>
                  </MenuItem>
                </Select>
              )}
            ></Controller>
          </FormControl>
          <FormControl fullWidth required={false}>
            <FormLabel htmlFor="dateOfBirth">
              <Trans id="Profile.DOB">Date Of Birth</Trans>
            </FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={'en-IN'}
            >
              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    onChange={onChange}
                    value={value}
                    format="DD-MM-YYYY"
                  />
                )}
              ></Controller>
            </LocalizationProvider>
          </FormControl>
          <Button fullWidth variant="contained" type="submit" className="!mt-4">
            <Trans id="Profile.Save">Save</Trans>
          </Button>
        </form>
        <FilePickerDialog
          fileType="image"
          open={fileDialogOpen}
          onClose={() => setFileDialogOpen(false)}
          label="Select A Profile Picture"
          onPick={(files) => null}
        />
      </div>
    </Scaffold>
  );
};
