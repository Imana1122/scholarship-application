import React from 'react';
import { useForm } from '@inertiajs/react'; // Import useForm from inertia-react
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BiArrowBack } from 'react-icons/bi';
import { inputCss } from '../css-components/text-field';

export const ScholarshipApplication = () => {
  const { data, setData, post, processing, errors } = useForm({
    id: '',
    preferred_major: '',
    preferred_school: '',
    preferred_school_address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    post(`/scholarship-apply/${data.id}`, { data });
  };

  return (
    <>
      <div className="w-full p-5">
        <form className="flex flex-col space-y-7" onSubmit={onSubmit}>
          {/* Symbol Number */}
          <div>
            <TextField
              id="id"
              name="id"
              type="text"
              autoComplete="text"
              autoFocus
              required
              value={data.id}
              onChange={handleChange}
              label="Symbol Number or Phone Number"
              variant="outlined"
              error={!!errors.id}
              helperText={errors.id || ' '}
              sx={inputCss}
              fullWidth
            />
          </div>

          {/* Preferred Major */}
          <div>
            <TextField
              id="preferred_major"
              name="preferred_major"
              type="text"
              autoComplete="text"
              autoFocus
              required
              value={data.preferred_major}
              onChange={handleChange}
              label="Preferred Major"
              variant="outlined"
              error={!!errors.preferred_major}
              helperText={errors.preferred_major || ' '}
              sx={inputCss}
              fullWidth
            />
          </div>

          {/* Desired School */}
          <div>
            <TextField
              id="preferred_school"
              name="preferred_school"
              type="text"
              autoComplete="text"
              autoFocus
              required
              value={data.preferred_school}
              onChange={handleChange}
              label="Desired School"
              variant="outlined"
              error={!!errors.preferred_school}
              helperText={errors.preferred_school || ' '}
              sx={inputCss}
              fullWidth
            />
          </div>

          {/* Desired School Address */}
          <div>
            <TextField
              id="preferred_school_address"
              name="preferred_school_address"
              type="text"
              autoComplete="text"
              autoFocus
              required
              value={data.preferred_school_address}
              onChange={handleChange}
              label="Desired School Address"
              variant="outlined"
              error={!!errors.preferred_school_address}
              helperText={errors.preferred_school_address || ' '}
              sx={inputCss}
              fullWidth
            />
          </div>

          <div className="flex justify-end mt-4">
            <Button disabled={processing} color="primary" variant='contained' type='submit'>
              {processing ? 'Applying' : 'Apply'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
