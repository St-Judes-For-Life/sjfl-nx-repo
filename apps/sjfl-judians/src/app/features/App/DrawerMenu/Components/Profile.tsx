import { i18n } from "@lingui/core";
import { Trans, t } from "@lingui/macro";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useForm } from "react-hook-form";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

import { useLoggedInUser } from "apps/sjfl-judians/src/app/shared/hooks/useAuth";
import { FilePickerDialog } from "apps/sjfl-judians/src/app/shared/components/dialogs/FilePickerDialog";
import { useState } from "react";

export const Profile = () => {
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const { register, handleSubmit} = useForm();
  const user = useLoggedInUser();

  return (
    <section>
      <div style={{position: 'relative'}}>
        <Avatar
            src={user.imageUrl}
            sx={{ width: '6rem', height: '6rem', fontSize: '3rem', margin: '0 auto' }}
          >
            {user.name.substring(0, 1).toLocaleUpperCase()}
        </Avatar>
        <IconButton size="small" onClick={() => setFileDialogOpen(true)} sx={{ position: 'absolute', top:'60%', left: '50%', borderRadius: '50%' }}>
          <EditIcon />
        </IconButton>
      </div>
      <form className="flex flex-col gap-4">
        <FormControl fullWidth required>
          <FormLabel htmlFor="name">
            <Trans id="Auth.Name">Name</Trans>
          </FormLabel>
          <OutlinedInput
            id="name"
            fullWidth
            autoComplete="name"
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
          <Select
            id="gender"
            MenuProps={{
              PaperProps: {
                sx: {
                  zIndex: 9999, // Set the desired z-index value
                },
              },
            }}
            displayEmpty={true}
            renderValue={(value) => {
              return value ? (
                <>{value}</>
              ) : (
                <span className="text-gray-400">
                  Please select gender
                </span>
              );
            }}
            value="">
            <MenuItem value="male" key="male">
              <Trans id="Profile.Gender_Male">Male</Trans>
            </MenuItem>
            <MenuItem value="female" key="female">
              <Trans id="Profile.Gender_Female">Female</Trans>
            </MenuItem>
            <MenuItem value="other" key="other">
              <Trans id="Profile.Gender_Other">Other</Trans>
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required={false}>
          <FormLabel htmlFor="dateOfBirth">
            <Trans id="Profile.DOB">Date Of Birth</Trans>
          </FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </FormControl>
        <Button fullWidth variant="contained" type="submit" className="!mt-4">
          <Trans id="Profile.Save">Save</Trans>
        </Button>
      </form>
      <FilePickerDialog
        fileType='image'
        open={fileDialogOpen}
        onClose={() => setFileDialogOpen(false)}
        label='Select A Profile Picture'
        onPick={(files) => { }}
      />
    </section>
  )
}
