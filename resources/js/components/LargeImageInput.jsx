import React, { useState } from 'react';
import { Avatar, Button, Typography } from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';
import { ImageToBase64 } from '../utility/ImageToBase64';
import { HiPhotograph } from 'react-icons/hi';


export const LargeImageInput = ({ setData, imagePath, error, image='school_license_file' })=> {
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = async (e) => {
    const base64Image = await ImageToBase64(e.target.files[0]);

    setImagePreview(base64Image);

    // Pass the base64 image to the parent component
    setData((prevData) => ({
        ...prevData,
        [image]: e.target.files[0],
    }));
  };

  return (
    <>
    <div className={`flex flex-col items-center border border-1 p-3 rounded-sm ${error? 'border-red-500':'border-slate-500'}`}>

        <div className='flex flex-col items-center space-y-3'>
          {imagePath || imagePreview ? (<img src={imagePreview?imagePreview:`/storage/images/${imagePath}`} className='w-[300px] h-[300px] rounded-md'/>):(<HiPhotograph className='w-20 h-20 text-slate-500'/>)}

          <Button
            variant="contained"
            component="label"
            className="relative rounded-md border border-gray-400 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            startIcon={<CloudUploadOutlined />}
          >
            <input
                type="file"
                accept="image/*"
                id="image-input"
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />
            Change
        </Button>
        </div>

    </div>
    {
        error&& <div className='flex justify-center'><Typography variant="caption" color="error">
            {error}
        </Typography></div>
    }
  </>
  );
}
