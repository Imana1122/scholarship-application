import { useEffect } from 'react';
import React from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import {  toast } from 'react-hot-toast';
import { useForm } from '@inertiajs/react';
import { Button, Grid, TextField } from '@mui/material';
import { BackgroundImageInput } from '../../components/BackgroundImageInput';
import AboutImages from '../../components/admin/AboutImages';
import TButton from "../../components/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function UpdateAboutPage(props) {
  const { data, setData, post, errors, processing } = useForm({
    about_description1: '',
    about_description2: '',
    mission_image_path: '',
    image:null,
    mission_description:''
  });


  useEffect(()=>{
    if(props.details){
        setData(props.details)
    }
  },[props.details])

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

    post(`/update-about-details`,formData,{
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
    <AdminLayoutComponent currentUser={props.currentUser} about_description1='Update School' buttons={
        <TButton color="blue" to="/about-image/create">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          New Image
        </TButton>
      }>
      <form onSubmit={handleSubmit} className='m-3'>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <AboutImages images={props.images}/>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="about_description1"
              name="about_description1"
              label="About Description 1"
              variant="outlined"
              required
              value={data.about_description1 || ''}
              onChange={(e) => handleChange('about_description1', e.target.value)}
              error={!!errors.about_description1}
              helperText={errors.about_description1 || ''}
              fullWidth
              multiline
              rows={3}

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="about_description2"
              name="about_description2"
              label="About Description 2"
              variant="outlined"
              required
              value={data.about_description2 || ''}
              onChange={(e) => handleChange('about_description2', e.target.value)}
              error={!!errors.about_description2}
              helperText={errors.about_description2 || ''}
              fullWidth
              multiline
              rows={3}

            />
          </Grid>
          <Grid item xs={12} md={12}>
          <BackgroundImageInput error={errors.image} background_image={data.mission_image_path} setData={setData}/>

          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mission_description"
              name="mission_description"
              label="Mission Description"
              variant="outlined"
              required
              value={data.mission_description || ''}
              onChange={(e) => handleChange('mission_description', e.target.value)}
              error={!!errors.mission_description}
              helperText={errors.mission_description || ''}
              fullWidth
              multiline
              rows={3}

            />
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
