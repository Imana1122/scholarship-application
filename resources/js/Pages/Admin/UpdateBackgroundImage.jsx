import { useEffect } from 'react';
import React from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import {  toast } from 'react-hot-toast';
import { useForm } from '@inertiajs/react';
import { Button, Grid, TextField } from '@mui/material';
import { BackgroundImageInput } from '../../components/BackgroundImageInput';

export default function UpdateBackgroundImage(props) {
  const { data, setData, post, errors, processing } = useForm({
    title: '',
    image: null,
    background_image: '',
  });


  useEffect(()=>{
    setData(props.image)

  },[props.image])

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

    post(`/background-image/update/${props.image.id}`,formData,{
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
              id="title"
              name="title"
              label="Name"
              variant="outlined"
              required
              value={data.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              error={!!errors.title}
              helperText={errors.title || ''}
              fullWidth

            />
          </Grid>


          <Grid item xs={12} md={12}>
          <BackgroundImageInput error={errors.image} background_image={data.background_image} setData={setData}/>

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
