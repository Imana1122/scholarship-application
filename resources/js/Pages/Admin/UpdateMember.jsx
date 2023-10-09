import { useEffect, useState } from 'react';
import React from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import {  toast } from 'react-hot-toast';
import { useForm } from '@inertiajs/react';
import { Button, Grid, TextField } from '@mui/material';
import ImageInput from '../../components/ImageInput';

export default function UpdateMember(props) {
  const { data, setData, post, errors, processing } = useForm({
    name: '',
    phone_number: '',
    image: null,
    imagePath: '',
    description: '',
  });


  useEffect(()=>{
    setData(props.member)

  },[props.member])

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

    post(`/member/update/${props.member.id}`,formData,{
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




  return (
    <AdminLayoutComponent currentUser={props.currentUser} title='Update School'>
      <form onSubmit={handleSubmit} className='m-3'>
        <Grid container spacing={3}>

          <Grid item xs={12} md={6}>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              required
              value={data.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name || ''}
              fullWidth

            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="phone_number"
              name="phone_number"
              label="Phone Number"
              variant="outlined"
              required
              value={data.phone_number || ''}
              onChange={(e) => handleChange('phone_number', e.target.value)}
              error={!!errors.phone_number}
              helperText={errors.phone_number || ''}
              fullWidth

            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              required
              value={data.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              error={!!errors.description}
              helperText={errors.description || ''}
              fullWidth
              multiline
              rows={3}

            />
          </Grid>

          <Grid item xs={12} md={12}>
          <ImageInput error={errors.image} imagePath={data.imagePath} setData={setData}/>

          </Grid>

          <Grid item xs={12} className='flex justify-end'>
            <Button type="submit" variant="contained" color="primary" disabled={processing}>
              {processing?<span>Updating</span>:<span>Update</span>}
            </Button>
          </Grid>
        </Grid>
      </form>
    </AdminLayoutComponent>
  );
}
