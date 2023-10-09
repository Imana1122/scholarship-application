import React from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayoutComponent from '../../../components/pagelayouts/GuestLayoutComponent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ErrorIcon from "@mui/icons-material/Error";
import Alert from "@mui/material/Alert";

const ResetPassword = (props) => {
  const { data, setData, put, errors, processing } = useForm({
    school_phone:props.school_phone,
    password: '',
    password_confirmation: '',
  });


  const submit = (e) => {
    e.preventDefault();

    put('/school/reset-password');
  }

  return (
    <GuestLayoutComponent title="Reset Password">
      <div className="mb-4 text-sm text-gray-600">
        This is the password reset field. Create a stronger password this time.
      </div>

       { props.errors.error &&(
          <Alert severity="error" sx={{ display: "flex", alignItems: "center", marginBottom:3 }}>
              <span className="flex items-center">
                {props.errors.error}
                <ErrorIcon sx={{ ml: 1 }} />
              </span>
          </Alert>
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
