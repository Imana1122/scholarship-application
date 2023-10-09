import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Document, Page } from 'react-pdf';
import UserLayoutComponent from '../../components/pagelayouts/UserLayoutComponent';
import { Close, SkipNextOutlined, SkipPreviousOutlined } from '@mui/icons-material';
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Downloads({ files }) {
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

  const handleDownload = (downloadUrl, fileName) => {
    // Create an anchor element
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;

    // Set the download attribute to specify the file name
    anchor.download = fileName || 'downloaded_file.pdf';

    // Trigger a click event to initiate the download
    anchor.click();
  };

  return (
    <UserLayoutComponent>
      <div>
        {files.map((file, index) => (
          <Card key={index}  className="my-4 flex flex-col space-y-3">
            <CardContent>
              {/* Download Description */}
              <Typography variant="h6" gutterBottom>
                {file.description}
              </Typography>

              <div className='flex space-x-3'>
                {/* Download Button */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDownload(`/storage/files/${file.download}`, file.download)}
              >
                Download
              </Button>

              {/* View Button */}
              {file.download ? (
                <Button
                  variant='outlined'
                  onClick={() => openModal(`/storage/files/${file.download}`)}

                >
                  View
                </Button>
              ) : (
                <span className="text-red-500 text-sm">null</span>
              )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Modal for displaying PDF */}
        <Modal
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
            <div className="w-100% h-[500px] overflow-auto flex justify-center" style={{ paddingBottom: "50px" }}>
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
        </Modal>
      </div>
    </UserLayoutComponent>
  );
}
