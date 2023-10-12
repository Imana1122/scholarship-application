import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import UserLayoutComponent from '../../components/pagelayouts/UserLayoutComponent';
import Modal from '@mui/material/Modal';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

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

  // Function to open the modal with the file URL
  const openModal = (url) => {
    setIsFileModalOpen(true);
    setFileUrl(url);
  };

  const newplugin = defaultLayoutPlugin()

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
        {files.length > 0 ? ( files.map((file, index) => (
          <Card key={index} className="my-4 flex flex-col space-y-3">
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
                    onClick={() => { openModal(`/storage/files/${file.download}`)}}
                  >
                    View
                  </Button>
                ) : (
                  <span className="text-red-500 text-sm">null</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))):(
            <Typography variant="h6" gutterBottom >
                No files available for download
              </Typography>
        )}

        {/* Modal for displaying PDF */}
        <Modal
          open={isFileModalOpen}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          onClose={() => setIsFileModalOpen(false)}
        >
        <div className='flex flex-col items-center w-full h-full'>
          <Button color='error' variant='contained' onClick={() => setIsFileModalOpen(false)}>Close</Button>
          <div className=' w-full h-full overflow-auto'>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                {fileUrl && <>
                    <div
                        style={{
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                            height: '750px',
                            width:'100%'
                        }}
                    >
                        <Viewer fileUrl={fileUrl} plugins={[newplugin]}/>
                    </div>
                </>}
                {!fileUrl && <>No PDF</>}
          </Worker>
          </div>
        </div>
        </Modal>
      </div>
    </UserLayoutComponent>
  );
}
