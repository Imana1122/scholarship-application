import { useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Transition } from "@headlessui/react";
import { FaCheckCircle } from "react-icons/fa";
import { router } from "@inertiajs/react";

export const UpdateUserPasswordForm=({ className = "" }) =>{
  const [data, setData] = useState({
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  });

  const [processing, setProcessing] = useState(false);

  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const recentlySuccessfulModal = () => {
    setRecentlySuccessful(true);

    const timer = setTimeout(() => {
      setRecentlySuccessful(false);
      router.visit('/user/profile');
    }, 1000);

    return () => clearTimeout(timer);
  };

  const updatePassword = (e) => {
    e.preventDefault();
    setProcessing(true);

    axios
      .put("/user/update-password", {
        currentPassword: data.currentPassword,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      })
      .then((response) => {
        if (response.data.message) {
          recentlySuccessfulModal();
        }
        setErrors({
          currentPassword: "",
          password: "",
          passwordConfirmation: "",
        });
      })
      .catch((error) => {
        setRecentlySuccessful(false);
        if (error.response && error.response.data.errors) {
          const validationErrors = error.response.data.errors;
          setErrors(validationErrors);
        } else {
          toast.error("An error occurred:", error);
        }
      })
      .finally(() => {
        setProcessing(false);
      });
  };

  return (
    <section className={className}>
      <header>
        <Typography variant="h6" className="text-gray-900">
          Update Password
        </Typography>
        <Typography variant="body2" className="mt-1 text-gray-600">
          Ensure your account is using a long, random password to stay secure.
        </Typography>

      </header>

      <form onSubmit={updatePassword} className="mt-6 space-y-6">
        {/* Current Password */}
        <div className="relative">
          <TextField
            id="currentPassword"
            name="currentPassword"
            type="password"
            autoComplete="currentPassword"
            required
            value={data.currentPassword}
            onChange={(e) =>
              setData({ ...data, currentPassword: e.target.value })
            }
            label="Current Password"
            variant="outlined"
            fullWidth
            error={!!errors.currentPassword}
            helperText={errors.currentPassword || " "}
          />
        </div>
        {/* Current Password */}

        {/* Password */}
        <div className="relative">
          <TextField
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            label="Password"
            variant="outlined"
            fullWidth
            error={!!errors.password}
            helperText={errors.password || " "}
          />
        </div>
        {/* Password */}

        {/* Password Confirmation */}
        <div className="relative">
          <TextField
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            autoComplete="passwordConfirmation"
            required
            value={data.passwordConfirmation}
            onChange={(e) =>
              setData({ ...data, passwordConfirmation: e.target.value })
            }
            label="Password Confirmation"
            variant="outlined"
            fullWidth
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation || " "}
          />
        </div>
        {/* Password Confirmation */}

        <div className="flex items-center gap-4">
          {/* Button to update password */}
          <Button
            variant="contained"
            color="primary"
            disabled={processing}
            type="submit"
          >
            Save
          </Button>

          {/* Success Message */}
          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <Typography
              variant="body2"
              className="text-green-600 flex space-x-5"
            >
              Saved. <FaCheckCircle />
            </Typography>
          </Transition>
        </div>
      </form>
    </section>
  );
}
