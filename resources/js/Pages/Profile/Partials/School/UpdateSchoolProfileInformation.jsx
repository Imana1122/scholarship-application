import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Link, router } from '@inertiajs/react';
import { inputCss } from '../../../../components/css-components/text-field';
import { LargeImageInput } from '../../../../components/LargeImageInput';
import { schoolCategory, schoolTypes } from '../../../../components/admin/const/schoolData';

export const UpdateSchoolProfileInformation = ({
  currentUser, className=''
}) =>{
  const [data, setData] = useState({
    school_name: currentUser.school_name,
    school_type: currentUser.school_type,
    school_email: currentUser.school_email,
    school_phone: currentUser.school_phone,
    school_address: currentUser.school_address,
    school_category: currentUser.school_category,
    established_date: currentUser.established_date,
    principal_name: currentUser.principal_name,
    principal_email: currentUser.principal_email,
    principal_phone: currentUser.principal_phone,
    school_license: currentUser.school_license,
  });

  const [schoolLicenseFile, setSchoolLicenseFile] = useState(null); // State to hold the file

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);

  const recentlySuccessfulModal = () => {
    setRecentlySuccessful(true);

    const timer = setTimeout(() => {
      setRecentlySuccessful(false);
      router.visit('/school/profile');
    }, 2000);

    return () => clearTimeout(timer);
  };

  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);

    // Create a FormData object to send multipart form data
    const formData = new FormData();

    // Append all fields to FormData
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Append the school license file if it exists
    if (schoolLicenseFile) {
      formData.append('school_license_file', schoolLicenseFile);
    }

    // Send a POST request with FormData
    axios
      .post('/school/update-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type
        },
      })
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






  const handleChange = (field, value) => {
    // Update the form data state
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section>
      <header>
        <Typography variant="h5" className="text-gray-900">
          Profile Information
        </Typography>
        <Typography variant="body1" className="mt-1 text-gray-600">
          Update your school's profile information.
        </Typography>

      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
      <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Official Information
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="school_name"
              name="school_name"
              label="School Name"
              variant="outlined"
              required
              value={data.school_name}
              onChange={(e) => handleChange('school_name', e.target.value)}
              error={!!errors.school_name}
              helperText={errors.school_name || ''}
              fullWidth
              sx={inputCss}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl variant="outlined" required fullWidth sx={inputCss}>
              <InputLabel id="school-type-label">School Type</InputLabel>
              <Select
                labelId="school-type-label"
                id="school_type"
                name="school_type"
                value={data.school_type}
                onChange={(e) => handleChange('school_type', e.target.value)}
                label="School Type"
                error={!!errors.school_type}
              >
                {schoolTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="school_email"
              name="school_email"
              label="School Email"
              variant="outlined"
              required
              value={data.school_email}
              onChange={(e) => handleChange('school_email', e.target.value)}
              error={!!errors.school_email}
              helperText={errors.school_email || ''}
              fullWidth
              sx={inputCss}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="school_phone"
              name="school_phone"
              label="School Phone"
              variant="outlined"
              required
              value={data.school_phone}
              onChange={(e) => handleChange('school_phone', e.target.value)}
              error={!!errors.school_phone}
              helperText={errors.school_phone || ''}
              fullWidth
              sx={inputCss}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="school_address"
              name="school_address"
              label="School Address"
              variant="outlined"
              required
              value={data.school_address}
              onChange={(e) => handleChange('school_address', e.target.value)}
              error={!!errors.school_address}
              helperText={errors.school_address || ''}
              fullWidth
              sx={inputCss}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl variant="outlined" required fullWidth sx={inputCss}>
              <InputLabel id="school-category-label">School Category</InputLabel>
              <Select
                labelId="school-category-label"
                id="school_category"
                name="school_category"
                value={data.school_category}
                onChange={(e) => handleChange('school_category', e.target.value)}
                label="School Category"
                error={!!errors.school_category}
              >
                {schoolCategory.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="established_date"
              name="established_date"
              label="Established Date"
              variant="outlined"
              type="date"
              required
              value={data.established_date || ''}
              onChange={(e) => handleChange('established_date', e.target.value)}
              error={!!errors.established_date}
              helperText={errors.established_date || ''}
              fullWidth
              sx={inputCss}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Administrative Details
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="principal_name"
              name="principal_name"
              label="Principal Name"
              variant="outlined"
              required
              value={data.principal_name}
              onChange={(e) => handleChange('principal_name', e.target.value)}
              error={!!errors.principal_name}
              helperText={errors.principal_name || ''}
              fullWidth
              sx={inputCss}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="principal_email"
              name="principal_email"
              label="Principal Email"
              variant="outlined"
              required
              value={data.principal_email}
              onChange={(e) => handleChange('principal_email', e.target.value)}
              error={!!errors.principal_email}
              helperText={errors.principal_email || ''}
              fullWidth
              sx={inputCss}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="principal_phone"
              name="principal_phone"
              label="Principal Phone"
              variant="outlined"
              required
              value={data.principal_phone}
              onChange={(e) => handleChange('principal_phone', e.target.value)}
              error={!!errors.principal_phone}
              helperText={errors.principal_phone || ''}
              fullWidth
              sx={inputCss}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Official Documents Needed
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <LargeImageInput error={errors.school_license_file} imagePath={data.school_license} setData={setData}/>
          </Grid>

        </Grid>


        <div className="flex items-end justify-end space-x-4">
          {/* Button to update profile information */}
          <Button variant='contained' color='primary' disabled={processing} type='submit'>{processing?<span>Saving</span>:<span>Save</span>}</Button>

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
