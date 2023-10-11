import React, { useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Tab } from '@headlessui/react';
import classNames from "classnames";
import { CiWarning } from "react-icons/ci";
import { useStateContext } from "../../contents/ContextProvider";
import TButton from "../../components/TButton";
import { Link, router } from "@inertiajs/react";
import { highlightSearchQuery } from "../../utility/HighlightText";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import axios from "axios";
import { AdminLayoutComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import { Button } from "@mui/material";

export default function Notices (props) {
  const { searchQuery } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noticeIdToDelete, setNoticeIdToDelete] = useState(null);
  const [ processing, setProcessing] = useState(false);

  const [notices, setNotices] = useState(props.notices);
  React.useEffect(()=>{
    if(searchQuery){
        axios.get(`/user/search-notices/${searchQuery}`).then((response)=>{setNotices(response.data)})
    }else{
        setNotices(props.notices)
    }
  },[searchQuery])

  const handleDelete=(noticeIdToDelete) =>{
    setProcessing(true);
    axios
      .delete(`/notice/delete/${noticeIdToDelete}`)
      .then((response) => {
        if (response.status === 200) {
          // Deletion was successful
          toast.success('Notice Deleted Successfully.');
          router.visit('/user/notices');
        } else {
          // Handle other response statuses if needed
          toast.error('Failed to delete notice.');
        }
      })
      .catch((error) => {
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
      }).finally(() => {
        setProcessing(false); // Setting processing back to false here, it will run regardless of success or error
      });

    }


  const onDeleteClick = (studentId) => {
    setIsModalOpen(true);
    setNoticeIdToDelete(studentId);

  };

  return (
    <AdminLayoutComponent
      title="Notices"
      currentUser={props.currentUser}
      buttons={
        <TButton color="pink" to="/notice/create">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          New
        </TButton>
      }
    >
      {/* Render notices in tab format */}
      <div className='md:flex md:justify-center md:items-center w-full'  >

        {Object.keys(notices).length > 0 ? (
          <div className="block px-1 py-16 sm:px-0 w-full" >
            <Tab.Group>
              {/* Tab List */}
              <Tab.List className="flex flex-col md:flex-row justify-between rounded-xl bg-blue-900/20 p-1">
                {Object.keys(notices).map((notice) => (
                  <Tab
                    key={notice}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    {notice}
                  </Tab>
                ))}
              </Tab.List>

              {/* Tab Panels */}
              <Tab.Panels className="mt-2">
                {Object.values(notices).map((notices, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      'rounded-xl bg-white p-3 text-sm overflow-x-auto max-w-full',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    {/* Table to display notices */}

                    <div  style={{ overflowX: 'auto'}}>
                    <table className="w-full border border-collapse border-gray-200 rounded-sm ">
                    <thead className="bg-slate-700 text-white">
                        <tr>
                          <th className="border border-gray-200 p-2">ID</th>
                          <th className="border border-gray-200 p-2">Type</th>
                          <th className="border border-gray-200 p-2">Content</th>
                          <th className="border border-gray-200 p-2">Created_At</th>
                          <th className="border border-gray-200 p-2">Updated_At</th>
                          <th className="border border-gray-200 p-2">Change</th>
                          <th className="border border-gray-200 p-2">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notices && notices.length > 0 ? (
                          notices.map((notice) => (
                            <tr className="border border-gray-200" key={notice.id}>
                              <td className="border border-gray-200 p-2"><div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(notice.id.toString(), searchQuery) }} /></td>
                              <td className="border border-gray-200 p-2">{notice.type}</td>
                              <td className="border border-gray-200 p-2">{notice.content}</td>
                              <td className="border border-gray-200 p-2">{new Date(notice.created_at).toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })}</td>
                              <td className="border border-gray-200 p-2">{new Date(notice.updated_at).toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })}</td>
                              <td className="border border-gray-200 p-2">
                                  <Link href={`/notice/update-form/${notice.id}`} className="flex justify-center">
                                    <TButton circle  color="green">
                                      <PencilIcon className="w-5 h-5 mr-2" />
                                    </TButton>
                                  </Link>
                              </td>
                              <td>
                                {notice.id && (
                                    <div className="flex justify-center">
                                    <TButton
                                    onClick={() => { onDeleteClick(notice.id) }}
                                    circle
                                    color="red"

                                    >
                                    <TrashIcon className="w-5 h-5" />
                                    </TButton>
                                    </div>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="border border-gray-200 p-2" colSpan={10}>
                              No notices available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
            {/* Modal for delete confirmation */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="p-4">
                {/* Add a focusable element (e.g., a button) for initial focus */}
                <button className="hidden" autoFocus />
                <p className="flex items-center">
                  <span className="text-red-500 font-bold text-4xl mr-5">
                    <CiWarning />
                  </span>
                  Are you sure you want to delete this notice?
                </p>
                <div className="flex justify-end mt-4 space-x-2">
                <Button
                    variant="contained"
                    color="error"
                    disabled={processing}
                    onClick={() => handleDelete(noticeIdToDelete)}
                    >
                    {processing ? (
                        <span>Deleting...</span>
                    ) : (
                        <span>Yes, Delete</span>
                    )}
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
        ) : (
          <p className='text-xl my-5 text-green-700 font-light'>Loading......</p>
        )}
      </div>
    </AdminLayoutComponent>
  );
};
