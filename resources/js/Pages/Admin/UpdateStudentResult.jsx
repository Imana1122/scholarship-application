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
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import toast from 'react-hot-toast';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import { inputCss } from '../../components/css-components/text-field';

export default function UpdateStudentResult(props) {
  const [school, setSchool] = useState(props.currentUser);

  const { data, setData, errors, put, processing } = useForm({
    rank: '',
    marks: '',
    result: 'On Hold',
  });

  useEffect(() => {
    setData(props.student);
  }, [props.student]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      put(`/student/updateResult/${props.student.id}`, data);
    } catch (error) {
      if (error.request) {
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
    <AdminLayoutComponent currentUser={props.currentUser} title="Update Student Result">
      <Container maxWidth="lg" className="">
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <form onSubmit={handleSubmit}>


            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <TextField
                  id="marks"
                  name="marks"
                  label="Marks"
                  variant="outlined"
                  fullWidth
                  value={data.marks}
                  onChange={(e) => handleChange('marks', e.target.value)}
                  error={!!errors.marks}
                  helperText={errors.marks || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="rank"
                  name="rank"
                  label="Rank"
                  variant="outlined"
                  fullWidth
                  value={data.rank}
                  onChange={(e) => handleChange('rank', e.target.value)}
                  error={!!errors.rank}
                  helperText={errors.rank || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel >Result</InputLabel>
                <FormControl >
                  <RadioGroup
                    name="result"
                    value={data.result}
                    onChange={(e) => handleChange('result', e.target.value)}

                  >
                    <FormControlLabel value="Passed" control={<Radio color="success" />} label="Passed" />
                    <FormControlLabel value="Failed" control={<Radio color="error" />} label="Failed" />
                    <FormControlLabel value="On Hold" control={<Radio />} label="On Hold" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Box mt={3} display="flex" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="primary" disabled={processing}>
                {processing ? <span>Updating</span> : <span>Update</span>}
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </AdminLayoutComponent>
  );
}
