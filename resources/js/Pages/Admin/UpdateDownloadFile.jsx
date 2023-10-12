import React,{useEffect, useState} from 'react';
import { Button, Paper, Typography, TextField, Modal } from '@mui/material';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import { useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

export default function UpdateDownloadFile(props) {
  const { data, setData, errors, processing, post } = useForm({
    file: null,
    description: '',
    download:''
  });

  useEffect(()=>{
    setData(props.file)

  },[props.file])

  const [pdfUrl, setPdfUrl] = useState(null);
  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const newplugin = defaultLayoutPlugin()

  useEffect(()=>{
    if(props.file.download){
        setPdfUrl(`/storage/files/${props.file.download}`)
    }
  },[props.file.download])

  useEffect(()=>{
    if(props.error){
        toast.error(props.error);
    }
    },[props.error])

  const fileType = ['application/pdf']
  const handleFileChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      file: e.target.files[0]
    }));

    let selectedFile = e.target.files[0];
    if(selectedFile){
        if(selectedFile && fileType.includes(selectedFile.type)){
            let reader = new FileReader()
            reader.readAsDataURL(selectedFile)
            reader.onload = (e)=>{
                setPdfUrl(e.target.result)
            }
        }else{
            setPdfUrl(null)
        }
    }else{
        toast.error('Select pdf file.')
    }
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
                <div className='flex space-x-3'>
                <label htmlFor="file-input" >
                    <Button variant="contained" color="secondary" component="span">
                    Choose File
                    </Button>
                </label>
                {pdfUrl && <Button variant='outlined' color='secondary' onClick={()=> setIsFileModalOpen(true)}>View</Button>}
                </div>
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

        {/* Modal for displaying PDF */}
        <Modal
          open={isFileModalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClose={() => setIsFileModalOpen(false)}
        >
        <div className='flex flex-col items-center w-full h-full'>
          <Button color='error' variant='contained' onClick={() => setIsFileModalOpen(false)}>Close</Button>
          <div className='w-full h-full overflow-auto'>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                {pdfUrl && <>
                    <div
                        style={{
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            height: '750px',
                            width:'100%'
                        }}
                    >
                        <Viewer fileUrl={pdfUrl} plugins={[newplugin]}/>
                    </div>
                </>}
                {!pdfUrl && <>No PDF</>}
          </Worker>
          </div>
        </div>
        </Modal>
      </Paper>
    </AdminLayoutComponent>
  );
}
