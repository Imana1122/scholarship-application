import React from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayoutComponent from '../../../components/pagelayouts/GuestLayoutComponent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const ResetPassword = ({ phone_number, code }) => {
  const { data, setData, post, errors, processing } = useForm({
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post('/resetPassword', {
      phone_number: phone_number,
      password: data.password,
      password_confirmation: data.password_confirmation,
    }).then(() => {
    });
  };

  return (
    <GuestLayoutComponent title="Reset Password">
      <div className="mb-4 text-sm text-gray-600">
        This is the password reset field. Create a stronger password this time.
      </div>

      {data.message && (
        <div className="mb-4 font-medium text-sm text-green-600">{data.message}</div>
      )}

      <form onSubmit={submit} className="flex flex-col justify-center space-y-5">
        <div className="relative">
          <TextField
            fullWidth
            variant="outlined"
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            value={data.password}
            onChange={(e) => setData('password', e.target.value)}
            label="Password"
            error={!!errors.password}
            helperText={errors.password || ' '}
          />
        </div>
        <div className="relative">
          <TextField
            fullWidth
            variant="outlined"
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            autoComplete="password_confirmation"
            required
            value={data.password_confirmation}
            onChange={(e) => setData('password_confirmation', e.target.value)}
            label="Password Confirmation"
            error={!!errors.password_confirmation}
            helperText={errors.password_confirmation || ' '}
          />
        </div>
        <div className="flex items-center justify-end mt-4">
          <Button
            variant="contained"
            color="primary"
            disabled={processing}
            type="submit"
          >
            {processing ? 'Resetting' : 'Reset Password'}
          </Button>
        </div>
      </form>
    </GuestLayoutComponent>
  );
};

export default ResetPassword;
