import React,{useState} from 'react';
import PrimaryButton from '../PrimaryButton';
import { Link, router, useForm } from '@inertiajs/react';
import { inputCss } from '../css-components/text-field';
import { TextField } from '@mui/material';

export const ScholarshipBanner = ({errors}) => {
  // Initialize the useForm hook
  const { data, setData, processing } = useForm({
    id: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update the form data using the setData function
    setData(name, value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    router.visit(`/scholarship-result/${data.id}`);
  };

  return (
    <div className="bg-blue-400 p-5 flex flex-col items-center justify-between gap-y-10">
      <div>
        <h1 className="text-white font-bold text-xl md:text-4xl ">Scholarship Program</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center md:space-x-5 space-y-5 w-full">
        <p className="text-white w-full md:w-1/2 text-sm md:text-xl">
          Apply for a scholarship for SEE passed students using symbol number or phone number
        </p>
        <div className="bg-white flex py-5 rounded-md justify-between items-center space-y-5 flex-col w-full md:w-1/2">
          <form onSubmit={onSubmit} className="w-full">
            {/* Symbol Number or Phone Number */}
            <div className="p-3 grid items-start gap-5 w-full">
            <TextField
                id="id"
                name="id"
                type="number"
                autoComplete="Number"
                autoFocus
                required
                value={data.id}
                onChange={handleChange}
                label="Symbol Number or Phone Number"
                variant="standard"
                error={!!errors.id}
                helperText={errors.id||''}
                sx={inputCss}
                className="text-gray-900 shadow-sm placeholder-transparent focus:outline-none focus:border-indigo-600 sm:text-sm sm:leading-6"
            />
              <div className="flex flex-col items-center justify-center">
                <div className="flex justify-center items-center">
                  {/* Submit Button */}
                  <PrimaryButton disabled={processing}>
                    {processing ? 'Checking in' : 'Check in'}
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </form>
          <p className="mt-5 text-center text-sm text-gray-500">
            Not applied for a scholarship?<br />
            <Link
              href="/scholarship-apply"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Apply
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
