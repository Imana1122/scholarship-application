import React, { useState, useEffect } from 'react';
import { FormControlLabel, Switch, Typography, Paper } from '@mui/material';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import toast from 'react-hot-toast';
import axios from 'axios';
import { MaterialUISwitch } from '../../components/MaterialUISwitch';

function ScholarshipStatus(props) {
  const [is_open, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(!!props.scholarship.is_open); // Convert to boolean using double negation (!!)
  }, [props.scholarship]);

  const handleStatusChange = () => {
    const newStatus = !is_open;

    // Update the local state immediately for a smoother UI experience
    setIsOpen(newStatus);

    // Make an API call to update the status
    axios
      .post('/scholarship/update-status', { is_open: newStatus })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error updating scholarship status:', error);
        // Revert the local state back to the original value
        setIsOpen(!newStatus);
      });
  };

  const submit = (e) => {};

  return (
    <AdminLayoutComponent currentUser={props.currentUser}>
      <Paper elevation={0} style={{ padding: '20px' }} >
        <Typography variant="h5" gutterBottom mb={3}>
          Scholarship Application Status
        </Typography>
        <FormControlLabel
          control={
            <MaterialUISwitch
              checked={is_open}
              onChange={handleStatusChange}
              color="primary"

            />
          }
          label={is_open ? 'Open' : 'Closed'}
        />
      </Paper>
    </AdminLayoutComponent>
  );
}

export default ScholarshipStatus;
