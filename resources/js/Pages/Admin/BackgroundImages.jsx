import React, { useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AdminLayoutComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import TButton from "../../components/TButton";
import { useStateContext } from "../../contents/ContextProvider";
import { highlightSearchQuery } from "../../utility/HighlightText";
import Modal from "../../components/Modal";
import { CiWarning } from "react-icons/ci";
import { Link, router } from "@inertiajs/react";
import { Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

export default function BackgroundImages(props){
  const { searchQuery } = useStateContext();
  const [images, setImages] = useState([]);

  React.useEffect(()=>{
    if(searchQuery){
        axios.get(`/user/search-images/${searchQuery}`).then((response)=>{setImages(response.data)})
    }else{
        setImages(props.images)
    }
  },[searchQuery])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageIdToDelete, setImageIdToDelete] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setImages(props.images);
  }, [props.images]);

  const search = () => {

  }

  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [imageUrl, setImageUrl]=React.useState('');

    // Function to open the modal with the image URL
  const openModal = (url) => {
        setIsImageModalOpen(true);
        setImageUrl(url);
  };

  const handleDelete=(imageId) =>{
    setProcessing(true);
    axios
      .delete(`/background-image/delete/${imageId}`)
      .then((response) => {
        setProcessing(false);
        if (response.data.message) {
          // Deletion was successful
          toast.success('Image Deleted Successfully.');
          setIsModalOpen(false)
          router.visit('/user/background-images')
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

  const onDeleteClick = (imageId) => {
    setIsModalOpen(true);
    setImageIdToDelete(imageId);
  };

  return (
    <AdminLayoutComponent
      title="Images"
      currentUser={props.currentUser}
      buttons={
        <TButton color="green" to="/background-image/create">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          New
        </TButton>
      }
    >
      <div className="mt-3 text-sm">
        <table className="w-full text-gray-700 border border-collapse border-gray-200 rounded-sm">
          <thead className="bg-gray-400">
            <tr>
              <th className="border border-gray-200 p-2">ID</th>
              <th className="border border-gray-200 p-2 w-20 h-20 flex items-center justify-center">
                Image
              </th>
              <th>Change</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {images.length > 0 ? (
              images.map((image) => (
                <tr className="border border-gray-200" key={image.id}>
                  <td className="border border-gray-200 p-2">
                    {/* Convert the ID to a string and use the highlightSearchQuery function to display it */}
                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(image.id.toString(), searchQuery) }} />
                  </td>
                  <td className="border border-gray-200 p-2 w-20 h-20 flex items-center justify-center">
                    {image.background_image ? (
                        <Button onClick={() => openModal(`/storage/images/${image.background_image}`)}>View</Button>
                    ) : (
                        <span className='text-red-500 text-sm'>null</span>
                    )}
                  </td>
                  <td className="border border-gray-200 p-2">
                      <Link href={`/background-image/update-form/${image.id}`}>
                        <TButton circle color="green">
                          <PencilIcon className="w-5 h-5 mr-2" />
                        </TButton>
                      </Link>
                  </td>
                  <td>
                  <div className="flex justify-center">
                        {image.id && (
                          <TButton onClick={() => { onDeleteClick(image.id) }} circle color="red">
                            <TrashIcon className="w-5 h-5" />
                          </TButton>
                        )}
                      </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-200 p-2" colSpan={7}>
                  No images available
                </td>
              </tr>
            )}
          </tbody>
        </table>

         {/** Modal for photo */}
         <Modal show={isImageModalOpen} onClose={() => setIsImageModalOpen(false)}>
            <div>
            <img src={imageUrl} alt="Image" className='w-full rounded-md '/>
            </div>
        </Modal>


        {/* Modal for delete confirmation */}
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
    </AdminLayoutComponent>
  );
};
