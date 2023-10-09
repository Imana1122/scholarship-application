import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { router } from '@inertiajs/react';

export const UpdateUserProfileInformation = ({
  currentUser,
  className = '',
}) => {
  const [data, setData] = useState({
    name: currentUser.name,
    phone_number: currentUser.phone_number,
  });

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const recentlySuccessfulModal = () => {
    setRecentlySuccessful(true);

    const timer = setTimeout(() => {
      setRecentlySuccessful(false);
      router.visit('/user/profile')
    }, 1000);

    return () => clearTimeout(timer);
  };

  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);


    // Send a POST request with FormData
    axios
      .put('/user/update-profile', data,)
      .then((response) => {
        if (response.data.message) {
          recentlySuccessfulModal();

        }
        setErrors({});
      })
      .catch((error) => {
        if (error.response && error.response.data.errors) {
          setErrors(error.response.data.errors);
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
          Profile Information
        </Typography>
        <Typography variant="body2" className="mt-1 text-gray-600">
          Update your user's profile information.
        </Typography>

      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        {/* Name */}
        <div className="relative">
          <TextField
            id="name"
            name="name"
            type="text"
            placeholder=" "
            required
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            label="Name"
            variant="outlined"
            fullWidth
            error={!!errors.name}
            helperText={errors.name ? errors.name : ''}
          />
        </div>
        {/* Name */}





        {/*  Phone Number */}
        <div className="relative">
          <TextField
            id="phone_number"
            name="phone_number"
            type="tel"
            placeholder=" "
            required
            value={data.phone_number}
            onChange={(e) =>
              setData({ ...data, phone_number: e.target.value })
            }
            label="Phone Number"
            variant="outlined"
            fullWidth
            error={!!errors.phone_number}
            helperText={errors.phone_number ? errors.phone_number : ''}
          />
        </div>



        <div className="flex items-center gap-4">
          {/* Button to update profile information */}
          <Button variant='contained' color='primary' disabled={processing} type='submit'>Save</Button>

          {/* Success Message */}
          <Transition
            show={recentlySuccessful}
            enterFrom="opacity-0"
            leaveTo="opacity-0"
            className="transition ease-in-out"
          >
            <Typography variant="body2" className="text-green-600 flex space-x-5">
              Saved. <FaCheckCircle />
            </Typography>
          </Transition>
        </div>
      </form>
    </section>
  );
}
