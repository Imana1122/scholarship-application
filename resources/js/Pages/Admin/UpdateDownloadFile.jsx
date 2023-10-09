import React,{useEffect} from 'react';
import { Button, Paper, Typography, TextField } from '@mui/material';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';

export default function UpdateDownloadFile(props) {
  const { data, setData, errors, processing, post } = useForm({
    file: null,
    description: '',
    download:''
  });

  useEffect(()=>{
    setData(props.file)

  },[props.file])

  useEffect(()=>{
    if(props.error){
        toast.error(props.error);
    }
    },[props.error])

  const handleFileChange = (e) => {

    setData((prevData) => ({
      ...prevData,
      file: e.target.files[0]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle text input fields
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form submission
    post(`/download-file/update/${props.file.id}`, data);
  };

  return (
    <AdminLayoutComponent currentUser={props.currentUser} title='Update Download File'>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <TextField
                id="description"
                name="description"
                type="text"
                required
                value={data.description}
                onChange={handleChange}
                label="Description"
                variant="outlined"
                error={!!errors.description}
                helperText={errors.description || ' '}
                fullWidth
                multiline
                rows={3}
              />
            </div>

            <div className='flex flex-col space-y-3'>
                <TextField
                    label="Upload a PDF file"
                    variant="outlined"
                    fullWidth
                    readOnly
                    value={data.file ? data.file.name : data.download ? data.download :""}
                />
                <input
                    accept=".pdf"
                    id="file-input"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}

                />
                <label htmlFor="file-input" >
                    <Button variant="contained" color="secondary" component="span">
                    Choose File
                    </Button>
                </label>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={processing}
              >
                {processing ? <span>Submitting</span> : <span>Submit</span>}
              </Button>
            </div>
        </form>
      </Paper>
    </AdminLayoutComponent>
  );
}
