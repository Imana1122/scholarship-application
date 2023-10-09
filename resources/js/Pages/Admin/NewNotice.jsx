import { useEffect, useState } from 'react';
import React from 'react';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import { Toaster, toast } from 'react-hot-toast';
import { useForm } from '@inertiajs/react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { inputCss } from '../../components/css-components/text-field';
import { noticeOptions } from '../../components/admin/const/noticeData';

export default function NewNotice(props) {
  const { data, setData, post, errors, processing } = useForm({
    type: '',
    content: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a FormData object and append the form data to it

    post('/register-notice', data)
  };

  const handleChange = (field, value) => {
    // Update the form data state
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };





  return (
    <AdminLayoutComponent currentUser={props.currentUser} title='Create New Notice'>
      <form onSubmit={handleSubmit} className='m-3'>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <FormControl variant="outlined" required fullWidth sx={inputCss}>
              <InputLabel id="notice-type-label">Notice Type</InputLabel>
              <Select
                labelId="notice-type-label"
                id="type"
                name="type"
                value={data.type}
                onChange={(e) => handleChange('type', e.target.value)}
                label="Notice Type"
                error={!!errors.type}
              >
                {noticeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="content"
              name="content"
              label="Notice Content"
              variant="outlined"
              required
              value={data.content}
              onChange={(e) => handleChange('content', e.target.value)}
              error={!!errors.content}
              helperText={errors.content || ''}
              fullWidth
              sx={inputCss}
              multiline
              rows={4}
            />
          </Grid>

        <Grid item xs={12} className='flex justify-end'>
            <Button type="submit" variant="contained" color="primary" disabled={processing}>
              {processing?<span>Registering</span>:<span>Register</span>}
            </Button>
          </Grid>
        </Grid>
      </form>
    </AdminLayoutComponent>
  );
}
