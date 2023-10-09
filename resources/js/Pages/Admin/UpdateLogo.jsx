import { useEffect } from 'react';
import React from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import {  toast } from 'react-hot-toast';
import { useForm } from '@inertiajs/react';
import { Button, Grid } from '@mui/material';
import { BackgroundImageInput } from '../../components/BackgroundImageInput';

export default function UpdateLogo(props) {
  const { data, setData, post, errors, processing } = useForm({
    image: null,
    imagePath: '',
  });

  useEffect(()=>{
    props.message && (
        toast.success(props.message)
    )
  },[props.message])


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

    post(`/logo/update`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/formdata
        },})

    };
  return (
    <AdminLayoutComponent currentUser={props.currentUser} title='Update School'>
      <form onSubmit={handleSubmit} className='m-3'>
        <Grid container spacing={3}>

          <Grid item xs={12} md={12}>
          <BackgroundImageInput error={errors.image} background_image={data.imagePath} setData={setData}/>
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
