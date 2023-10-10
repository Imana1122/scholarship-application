import React, { useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Modal from '../Modal';
import { CiWarning } from 'react-icons/ci';
import axios from 'axios';
import toast from 'react-hot-toast';
import { router } from '@inertiajs/react';

export default function AboutImages({ images }) {
  // Define state for the selected image and confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageIdToDelete, setImageIdToDelete] = useState(null);
  const [processing, setProcessing] = useState(false);

  const onDeleteClick = (imageId) => {
    setIsModalOpen(true);
    setImageIdToDelete(imageId);
  };


  const handleDelete=(imageId) =>{
    setProcessing(true);
    axios
      .delete(`/about-image/delete/${imageId}`)
      .then((response) => {
        setProcessing(false);
        console.log(response)
        if (response.data.message) {
          // Deletion was successful
          toast.success('Image Deleted Successfully.');
          setIsModalOpen(false)
          router.visit('/about-details/update-form')
        } else {
          // Handle other response statuses if needed
          toast.error('Failed to delete image.');
        }
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response) {
          // The request was made and the server responded with an error status code
          toast.error(`Error: ${error.response.data.error}`);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error('No response received from the server.');
        } else {
          // Something happened in setting up the request that triggered an error
          toast.error(`Error: ${error.message}`);
        }
      })
    }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        About Images
      </Typography>
      <Grid container spacing={2} alignContent={'center'}>
        {images.length > 0 ?
          images.map((image, index) => (
            <Grid item key={index}>
              <Paper>
                <img
                  src={`/storage/images/${image.image_path}`}
                  alt={`Image ${index}`}
                  className='w-full md:h-[300px] rounded-md md:w-[300px]'
                />
                <Button
                  startIcon={<Delete />}
                  variant="contained"
                  color="error"
                  onClick={() => { onDeleteClick(image.id) }}
                  fullWidth
                >
                  Delete
                </Button>
              </Paper>
            </Grid>
          )):(
            <Typography variant='body1' color={'red'} p={3}>No images</Typography>
          )}
      </Grid>

      {/* Delete Confirmation Modal */}
       <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            {/* Add a focusable element (e.g., a button) for initial focus */}
            <button className="hidden" autoFocus />
            <p className="flex items-center"><span className="text-red-500 font-bold text-4xl mr-5"><CiWarning /></span>Are you sure you want to delete this image?</p>
            <div className="flex justify-end mt-4 space-x-3">
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(imageIdToDelete)}
                disabled={processing}
              >
                {processing?<span>Deleting</span>:<span>Yes, Delete</span>}
              </Button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
    </div>
  );
}
