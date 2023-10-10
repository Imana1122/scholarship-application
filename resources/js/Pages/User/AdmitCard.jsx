import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { generatePDF } from '../../utility/GeneratePDF';
import { router } from '@inertiajs/react';
import { Button } from '@mui/material';

export default function AdmitCard(props) {

  const {
    first_name,
    last_name,
    temporary_address,
    permanent_address,
    scored_gpa,
    phone_number,
    gender,
    preferred_major,
    preferred_school,
    preferred_school_address,
    imagePath, // Assuming imagePath is in the public directory
  } = props.student;

  const [loader,setLoader] = useState(false);

    // Function to generate PDF on button click
    const handleDownloadPDF = () => {
        generatePDF({'download':'admit-card','setLoader':setLoader});
      };

      useEffect(()=>{
        console.log(props.student)
        if(props.student.length < 0){
            router.visit('/scholarship-admit-card/request-form');
        }
    });


  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
         <div className='flex justify-end mb-5'>
            <Button type='secondary' variant='contained' onClick={handleDownloadPDF} disabled={!(loader === false)}>
                {loader?(<span>Downloading</span>):(<span>Download</span>)}
            </Button>
        </div>
        <div id='admit-card'>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                <Typography variant="h5" align="center">
                    Exam Admit Card
                </Typography>
                </Grid>

                <Grid item xs={12}>
                <img src={`/storage/images/${imagePath}`} alt="Student Image" width="100%" />
                </Grid>
                <Grid item xs={6}>
                <Typography variant="subtitle1">
                    Name: {first_name} {last_name}
                </Typography>
                <Typography variant="subtitle1">Gender: Male</Typography>
                <Typography variant="subtitle1">
                    Temporary Address: {temporary_address}
                </Typography>
                <Typography variant="subtitle1">
                    Permanent Address: {permanent_address}
                </Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography variant="subtitle1">GPA: {scored_gpa}</Typography>
                <Typography variant="subtitle1">
                    Phone Number: {phone_number}
                </Typography>
                <Typography variant="subtitle1">
                    Preferred School: {preferred_school}
                </Typography>
                <Typography variant="subtitle1">
                    Preferred Major: {preferred_major}
                </Typography>
                <Typography variant="subtitle1">
                    Preferred School's Address: {preferred_school_address}
                </Typography>
                <Typography variant="subtitle1">
                    Gender: {gender}
                </Typography>
                </Grid>
            </Grid>
        </div>
    </Paper>
  );
};

