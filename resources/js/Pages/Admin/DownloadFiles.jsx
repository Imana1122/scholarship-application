import React, { useEffect, useState } from "react";
import { MinusCircleIcon, PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
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
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Close, SkipNextOutlined, SkipPreviousOutlined } from "@mui/icons-material";
import {Modal as MuiModal} from '@mui/material';

export default function DownloadFiles(props) {
  const { searchQuery } = useStateContext();
  const [files, setFiles] = useState([]);

  React.useEffect(()=>{
    if(searchQuery){
        axios.get(`/user/search-files/${searchQuery}`).then((response)=>{setFiles(response.data)})
    }else{
        setFiles(props.files)
    }
  },[searchQuery])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileIdToDelete, setFileIdToDelete] = useState(null);
  const [processing, setProcessing] = useState(false);



  const search = () => {
    // Implement your search logic here
  };

  const [isFileModalOpen, setIsFileModalOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  const [scale, setScale] = useState(1.0); // Initial zoom level

const handleZoomIn = () => {
  if (scale < 5.0) { // Adjust the maximum zoom level as needed
    setScale(scale + 0.1); // You can adjust the zoom increment
  }
};

const handleZoomOut = () => {
  if (scale > 0.2) { // Adjust the minimum zoom level as needed
    setScale(scale - 0.1); // You can adjust the zoom decrement
  }
};


  // Function to open the modal with the file URL
  const openModal = (url) => {
    setIsFileModalOpen(true);
    setFileUrl(url);
  };

  const handleDelete = (fileId) => {
    setProcessing(true);
    axios
      .delete(`/download-file/delete/${fileId}`)
      .then((response) => {
        setProcessing(false);
        if (response.data.message) {
          // Deletion was successful
          toast.success("File Deleted Successfully.");
          setIsModalOpen(false);
          router.visit('/user/download-files');
        } else {
          // Handle other response statuses if needed
          toast.error("Failed to delete file.");
        }
      })
      .catch((error) => {
        setProcessing(false);
        if (error.response) {
          // The request was made and the server responded with an error status code
          toast.error(`Error: ${error.response.data.error}`);
        } else if (error.request) {
          // The request was made but no response was received
          toast.error("No response received from the server.");
        } else {
          // Something happened in setting up the request that triggered an error
          toast.error(`Error: ${error.message}`);
        }
      });
  };

  const onDeleteClick = (fileId) => {
    setIsModalOpen(true);
    setFileIdToDelete(fileId);
  };

  return (
    <AdminLayoutComponent
      title="Files"
      currentUser={props.currentUser}
      buttons={
        <TButton color="green" href="/download-file/create">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          New
        </TButton>
      }
    >
      <div className="mt-3 text-sm" style={{ overflowX: "auto" }}>
        <table className="w-full text-gray-700 border border-collapse border-gray-200 rounded-sm">
          <thead className="bg-gray-400">
            <tr>
              <th className="border border-gray-200 p-2">ID</th>
              <th className="border border-gray-200 p-2">
                File
              </th>
              <th className="border border-gray-200 p-2">File_Name</th>
              <th className="border border-gray-200 p-2">Description</th>
              <th className="border border-gray-200 p-2">Change</th>
              <th className="border border-gray-200 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {files && files.length > 0 ? (
              files.map((file) => (
                <tr className="border border-gray-200" key={file.id}>
                  <td className="border border-gray-200 p-2">
                    {/* Convert the ID to a string and use the highlightSearchQuery function to display it */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: highlightSearchQuery(
                          file.id.toString(),
                          searchQuery
                        ),
                      }}
                    />
                  </td>
                  <td className="border border-gray-200 p-2 w-20 h-20 flex items-center justify-center">
                    {file.download ? (
                      <Button
                        onClick={() =>
                          openModal(`/storage/files/${file.download}`)
                        }
                      >
                        VIEW
                      </Button>
                    ) : (
                      <span className="text-red-500 text-sm">null</span>
                    )}
                  </td>
                  <td className="border border-gray-200 p-2">{file.download}</td>
                  <td className="border border-gray-200 p-2">{file.description}</td>
                  <td className="border border-gray-200 p-2">
                    <div className="flex justify-center">
                    <Link href={`/download-file/update-form/${file.id}`}>
                      <TButton circle color="green">
                        <PencilIcon className="w-5 h-5 mr-2" />
                      </TButton>
                    </Link>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center">
                      {file.id && (
                        <TButton
                          onClick={() => onDeleteClick(file.id)}
                          circle
                          color="red"
                        >
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
                  No files available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal for displaying PDF */}
        <MuiModal
        open={isFileModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={() => setIsFileModalOpen(false)}>
          <div className="relative flex flex-col">

            <div className="sticky top-0 w-full justify-between bg-white p-4 border-t border-gray-300 z-50 flex">
              <div className='flex space-x-3'>
              <Button onClick={() => handleZoomOut()} variant="outlined">
                <MinusCircleIcon />
              </Button>
              <Button onClick={() => handleZoomIn()} variant="outlined">
                <PlusCircleIcon />
              </Button>
              </div>
              <Button onClick={() => setIsFileModalOpen(false)} variant="contained" color='error'>
                <Close />
              </Button>
            </div>
            <div className="w-full h-[500px] overflow-auto flex justify-center" style={{ paddingBottom: "50px" }}>
              {/* ... PDF content */}
              <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} scale={scale} />
              </Document>
            </div>
            <div className="sticky flex bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300">
              <Button
                variant="outlined"
                className="flex justify-start"
              >
                {pageNumber} <span className="mx-2"> of </span> {numPages}
              </Button>
              <div className="w-full text-center flex space-x-3 justify-end">
                {pageNumber > 1 && (
                  <Button
                    onClick={() => handlePageChange(pageNumber - 1)}
                    variant="outlined"
                  >
                    <SkipPreviousOutlined />
                  </Button>
                )}
                {pageNumber < numPages && (
                  <Button
                    onClick={() => handlePageChange(pageNumber + 1)}
                    variant="outlined"
                  >
                    <SkipNextOutlined />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </MuiModal>

        {/* Modal for delete confirmation */}
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            {/* Add a focusable element (e.g., a button) for initial focus */}
            <button className="hidden" autoFocus />
            <p className="flex items-center">
              <span className="text-red-500 font-bold text-4xl mr-5">
                <CiWarning />
              </span>
              Are you sure you want to delete this file?
            </p>
            <div className="flex justify-end mt-4 space-x-3">
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(fileIdToDelete)}
                disabled={processing}
              >
                {processing ? <span>Deleting</span> : <span>Yes, Delete</span>}
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
}
