import { useEffect, useState } from 'react';
import React from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import { Toaster, toast } from 'react-hot-toast';
import { useForm } from '@inertiajs/react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { inputCss } from '../../components/css-components/text-field';
import { LargeImageInput } from '../../components/LargeImageInput';
import { schoolCategory, schoolTypes } from '../../components/admin/const/schoolData';

export default function UpdateSchool(props) {
  const { data, setData, post, errors, processing } = useForm({
    school_name: '',
    school_type: '',
    school_email: '',
    school_phone: '',
    school_address: '',
    school_category: '',
    established_date: null,
    principal_name: '',
    principal_email: '',
    principal_phone: '',
    school_license_file:null,
    school_license:'',
  });


  useEffect(()=>{
    setData(props.school)
    setData((prev) => ({
        ...prev,
        ['password']: ''
      }));
  },[props.school])

  useEffect(()=>{
    if(props.error){
        toast.error(props.error);
    }
},[props.error])


  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object and append the form data to it
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    post(`/school/update/${props.school.id}`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/formdata
        },})

  };

  const handleChange = (field, value) => {
    // Update the form data state
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = async (e) => {

    setData((prevData) => ({
        ...prevData,
        school_license_file: e.target.files[0],
    }));
  };



  return (
    <AdminLayoutComponent currentUser={props.currentUser} title='Update School'>
      <form onSubmit={handleSubmit} className='m-3'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Official Information
            </Typography>
            <Toaster />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="school_name"
              name="school_name"
              label="School Name"
              variant="outlined"
              required
              value={data.school_name || ''}
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
                value={data.school_type || ''}

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
              value={data.school_email || ''}
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
              value={data.school_phone || ''}
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
              value={data.school_address || ''}
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
                value={data.school_category || ''}
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
            <Typography variant="h4" gutterBottom>
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
              value={data.principal_name || ''}
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
              value={data.principal_email || ''}
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
              type="tel"
              required
              value={data.principal_phone || ''}
              onChange={(e) => handleChange('principal_phone', e.target.value)}
              error={!!errors.principal_phone}
              helperText={errors.principal_phone || ''}
              fullWidth
              sx={inputCss}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Official Documents Needed<span className="text-green-600 text-sm">(Only fill if you want to update official documents)</span>
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
          <LargeImageInput error={errors.school_license_file} imagePath={data.school_license} setData={setData}/>

          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" disabled={processing}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </AdminLayoutComponent>
  );
}
