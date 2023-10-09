import React, { useState, useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Paper,
  Container,
  Box,
} from '@mui/material';
import { inputCss } from '../../components/css-components/text-field';
import { SchoolLayoutComponent } from '../../components/pagelayouts/SchoolLayoutComponent';
import toast from 'react-hot-toast';
import ImageInput from '../../components/ImageInput';
import axios from 'axios';

export default function NewStudent(props) {
  const [school, setSchool] = useState(props.currentUser);
  const { data, setData, errors, post, processing } = useForm({
    first_name: '',
    middle_name: '',
    last_name: '',
    temporary_address: '',
    permanent_address: '',
    scored_gpa: '',
    gender: '',
    school_id: '',
    phone_number: '',
    mother_name: '',
    father_name: '',
    mother_phone_number: '',
    father_phone_number: '',
    preferred_school: '',
    preferred_school_address:'',
    preferred_major: '',
    image:null,
    imagePath:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
        const response = await post('/register-student', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Set content type to multipart-formdata
            },
          });


    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with an error status code
        const errorMessage = error.response.data.error || 'An error occurred on the server.';
        toast.error(`Error: ${errorMessage}`);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an error
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleChange = (name, value) => {
    // Update the form data state
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <SchoolLayoutComponent currentUser={props.currentUser} title="New Student">
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" mb={4}>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ImageInput setData={setData} imagePath={data.imagePath} error={errors.image}/>
                </Grid>
                <Grid item xs={12}>
                <TextField
                  id="symbol_number"
                  name="symbol_number"
                  label="Symbol Number"
                  variant="outlined"
                  fullWidth sx={inputCss}
                  required
                  value={data.symbol_number || ''}
                  onChange={(e) => handleChange('symbol_number', e.target.value)}
                  error={!!errors.symbol_number}
                  helperText={errors.symbol_number || ''}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="first_name"
                  name="first_name"
                  label="First Name"
                  variant="outlined"
                  fullWidth sx={inputCss}
                  required
                  value={data.first_name || ''}
                  onChange={(e) => handleChange('first_name', e.target.value)}
                  error={!!errors.first_name}
                  helperText={errors.first_name || ''}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="middle_name"
                  name="middle_name"
                  label="Middle Name"
                  variant="outlined"
                  fullWidth sx={inputCss}
                  value={data.middle_name || ''}
                  onChange={(e) => handleChange('middle_name', e.target.value)}
                  error={!!errors.middle_name}
                  helperText={errors.middle_name || ''}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="last_name"
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth sx={inputCss}
                  required
                  value={data.last_name || ''}
                  onChange={(e) => handleChange('last_name', e.target.value)}
                  error={!!errors.last_name}
                  helperText={errors.last_name || ''}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <TextField
                  id="temporary_address"
                  name="temporary_address"
                  label="Temporary Address"
                  variant="outlined"
                  fullWidth sx={inputCss}
                  required
                  value={data.temporary_address || ''}
                  onChange={(e) => handleChange('temporary_address', e.target.value)}
                  error={!!errors.temporary_address}
                  helperText={errors.temporary_address || ''}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="permanent_address"
                  name="permanent_address"
                  label="Permanent Address"
                  variant="outlined"
                  fullWidth sx={inputCss}
                  required
                  value={data.permanent_address || ''}
                  onChange={(e) => handleChange('permanent_address', e.target.value)}
                  error={!!errors.permanent_address}
                  helperText={errors.permanent_address || ''}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <TextField
                  id="scored_gpa"
                  name="scored_gpa"
                  label="Scored GPA"
                  variant="outlined"
                  fullWidth sx={inputCss}
                  required
                  value={data.scored_gpa || ''}
                  onChange={(e) => handleChange('scored_gpa', e.target.value)}
                  error={!!errors.scored_gpa}
                  helperText={errors.scored_gpa || ''}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth sx={inputCss} required>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={data.gender || ''}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    label="Gender"
                    error={!!errors.gender}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth sx={inputCss} required>
                  <InputLabel id="school-label">School</InputLabel>
                  <Select
                    labelId="school-label"
                    id="school_id"
                    name="school_id"
                    value={data.school_id || ''}
                    onChange={(e) => handleChange('school_id', e.target.value)}
                    label="School"
                    error={!!errors.school_id}
                  >

                      <MenuItem key={school.id} value={school.id}>
                        {school.school_name}
                      </MenuItem>

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                    id="phone_number"
                    name="phone_number"
                    label="Phone Number"
                    variant="outlined"
                    type='tel'
                    fullWidth sx={inputCss}
                    required
                    value={data.phone_number || ''}
                    onChange={(e) => handleChange('phone_number', e.target.value)}
                    error={!!errors.phone_number}
                    helperText={errors.phone_number || ''}
                    />
              </Grid>
            </Grid>



            <Typography variant="h6" mt={4} mb={4}>
              Parents Information
            </Typography>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <TextField
                    id="mother_name"
                    name="mother_name"
                    label="Mother's Name"
                    variant="outlined"
                    fullWidth sx={inputCss}
                    required
                    value={data.mother_name || ''}
                    onChange={(e) => handleChange('mother_name', e.target.value)}
                    error={!!errors.mother_name}
                    helperText={errors.mother_name || ''}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                    id="father_name"
                    name="father_name"
                    label="Father's Name"
                    variant="outlined"
                    fullWidth sx={inputCss}
                    required
                    value={data.father_name || ''}
                    onChange={(e) => handleChange('father_name', e.target.value)}
                    error={!!errors.father_name}
                    helperText={errors.father_name || ''}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <TextField
                    id="mother_phone_number"
                    name="mother_phone_number"
                    label="Mother's Phone Number"
                    variant="outlined"
                    type='tel'
                    fullWidth sx={inputCss}
                    required
                    value={data.mother_phone_number || ''}
                    onChange={(e) => handleChange('mother_phone_number', e.target.value)}
                    error={!!errors.mother_phone_number}
                    helperText={errors.mother_phone_number || ''}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                    id="father_phone_number"
                    name="father_phone_number"
                    label="Father's Phone Number"
                    variant="outlined"
                    type='tel'
                    fullWidth sx={inputCss}
                    required
                    value={data.father_phone_number || ''}
                    onChange={(e) => handleChange('father_phone_number', e.target.value)}
                    error={!!errors.father_phone_number}
                    helperText={errors.father_phone_number || ''}
                    />
                </Grid>
            </Grid>

            <Typography variant="h6" mt={4} mb={4}>
              Preferences<span className='text-sm text-green-600'>(only fill if you are applying for scholarship)</span>
            </Typography>

            <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
            <TextField
              id="preferred_school"
              name="preferred_school"
              label="Preferred School"
              variant="outlined"
              fullWidth sx={inputCss}
              value={data.preferred_school || ''}
              onChange={(e) => handleChange('preferred_school', e.target.value)}
              error={!!errors.preferred_school}
              helperText={errors.preferred_school || ''}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              id="preferred_school_address"
              name="preferred_school_address"
              label="Preferred School Address"
              variant="outlined"
              fullWidth sx={inputCss}
              value={data.preferred_school_address || ''}
              onChange={(e) => handleChange('preferred_school_address', e.target.value)}
              error={!!errors.preferred_school_address}
              helperText={errors.preferred_school_address || ''}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
              id="preferred_major"
              name="preferred_major"
              label="Preferred Major"
              variant="outlined"
              fullWidth sx={inputCss}
              value={data.preferred_major || ''}
              onChange={(e) => handleChange('preferred_major', e.target.value)}
              error={!!errors.preferred_major}
              helperText={errors.preferred_major || ''}
            />
            </Grid>
            </Grid>

            <Box mt={3} display="flex" justifyContent="f<lex-end">
              <Button type="submit" variant="contained" color="primary" disabled={processing}>
                {processing?<span>Registering</span>:<span>Register</span>}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </SchoolLayoutComponent>
  );
}
