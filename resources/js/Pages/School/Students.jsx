import React, { useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Tab } from '@headlessui/react';
import classNames from "classnames";
import { CiWarning } from "react-icons/ci";
import { useStateContext } from "../../contents/ContextProvider";
import { SchoolLayoutComponent } from "../../components/pagelayouts/SchoolLayoutComponent";
import TButton from "../../components/TButton";
import { Link } from "@inertiajs/react";
import { highlightSearchQuery } from "../../utility/HighlightText";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Typography } from "@mui/material";

export default function Students (props) {
  const {searchQuery} = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState(null);

  const [students, setStudents] = useState(props.students);

  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [imageUrl, setImageUrl]=React.useState('');

  useEffect(()=>{
    if(searchQuery){
        axios.get(`/school/search-students/${searchQuery}`).then((response)=>{setStudents(response.data)})
    }else{
        setStudents(props.students)
    }
  },[searchQuery])

  // Function to open the modal with the image URL
  const openModal = (url) => {
   setIsImageModalOpen(true);
  setImageUrl(url);
  };

  const handleDelete=(studentIdToDelete) =>{
    axios
      .delete(`/student/delete/${studentIdToDelete}`)
      .then((response) => {
        if (response.status === 200) {
          // Deletion was successful
          toast.success('Student Deleted Successfully.');
        } else {
          // Handle other response statuses if needed
          toast.error('Failed to delete student.');
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
      });
    }


  const onDeleteClick = (studentId) => {
    setIsModalOpen(true);
    setStudentIdToDelete(studentId);
  };

  return (
    <SchoolLayoutComponent
      title="Students"
      currentUser={props.currentUser}
      buttons={
        <TButton color="blue" to="/student/create">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          New
        </TButton>
      }
    >
      {/* Render students in tab format */}
      <div className='md:flex md:justify-center md:items-center'>

        {Object.keys(students).length > 0 ? (
          <div className="block px-1 py-16 sm:px-0 w-full">
            <Tab.Group>
              {/* Tab List */}
              <Tab.List className="flex flex-col md:flex-row justify-between rounded-xl bg-blue-900/20 p-1">
                {Object.keys(students).map((student) => (
                  <Tab
                    key={student}
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
                    {student}
                  </Tab>
                ))}
              </Tab.List>

              {/* Tab Panels */}
              <Tab.Panels className="mt-2">
                {Object.values(students).map((students, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      'rounded-xl bg-white p-3 overflow-x-auto max-w-full',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    {/* Table to display students */}
                    <div  style={{ overflowX: 'auto' }}>
                    <Typography variant="h6">Total:{students.length}</Typography>
                    <table className="w-full text-gray-700 border border-collapse border-gray-200 rounded-sm">
                      <thead className="bg-gray-400">
                        <tr>
                          <th className="border border-gray-200 p-2">ID</th>
                          <th className="border border-gray-200 p-2">Symbol_Number</th>
                          <th className="border border-gray-200 p-2">
                            Image
                          </th>
                          <th className="border border-gray-200 p-2">Phone</th>
                          <th className="border border-gray-200 p-2">Name</th>
                          <th className="border border-gray-200 p-2">Gender</th>
                          <th className="border border-gray-200 p-2">GPA</th>
                          <th className="border border-gray-200 p-2">Permanent_Address</th>
                          <th className="border border-gray-200 p-2">Temporary_Address</th>
                          <th className="border border-gray-200 p-2">Father's_Name</th>
                          <th className="border border-gray-200 p-2">Father's_Phone_Number</th>
                          <th className="border border-gray-200 p-2">Mother's_Name</th>
                          <th className="border border-gray-200 p-2">Mother's_Phone_Number</th>
                          <th className="border border-gray-200 p-2">Preferred_School</th>
                          <th className="border border-gray-200 p-2">Preferred_Major</th>
                          <th className="border border-gray-200 p-2">Preferred_School_Address</th>
                          <th className="border border-gray-200 p-2">Marks</th>
                          <th className="border border-gray-200 p-2">Rank</th>
                          <th className="border border-gray-200 p-2">Result</th>
                          <th className="border border-gray-200 p-2">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students && students.length > 0 ? (
                          students.map((student) => (
                            <tr className="border border-gray-200" key={student.id}>
                              <td className="border border-gray-200 p-2">{student.id}</td>
                              <td className="border border-gray-200 p-2"><div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(student.symbol_number.toString(), searchQuery) }} /></td>
                              <td className="border border-gray-200 p-2 w-20 h-20 flex items-center justify-center">
                                {student.imagePath ? (
                                    <Button onClick={() => openModal(`/storage/images/${student.imagePath}`)}>View</Button>
                                ) : (
                                    <span className='text-red-500 text-sm'>null</span>
                                )}
                              </td>
                              <td className="border border-gray-200 p-2">{student.phone_number}</td>
                              <td className="border border-gray-200 p-2">{student.first_name}_{student?.middle_name}_{student.last_name}</td>
                              <td className="border border-gray-200 p-2">{student.gender}</td>
                              <td className="border border-gray-200 p-2">{student.scored_gpa}</td>
                              <td className="border border-gray-200 p-2">{student.permanent_address}</td>
                              <td className="border border-gray-200 p-2">{student.temporary_address}</td>
                              <td className="border border-gray-200 p-2">{student.father_name}</td>
                              <td className="border border-gray-200 p-2">{student.father_phone_number}</td>
                              <td className="border border-gray-200 p-2">{student.mother_name}</td>
                              <td className="border border-gray-200 p-2">{student.mother_phone_number}</td>
                              <td className="border border-gray-200 p-2">{student.preferred_school?student.preferred_school:<span className="text-red-500">not_applied</span>}</td>
                              <td className="border border-gray-200 p-2">{student.preferred_major?student.preferred_major:<span className="text-red-500">not_applied</span>}</td>
                              <td className="border border-gray-200 p-2">{student.preferred_school_address?student.preferred_school_address:<span className="text-red-500">not_applied</span>}</td>
                              <td className="border border-gray-200 p-2">{student.marks? student.marks: <span className="text-red-500">not_published</span>}</td>
                              <td className="border border-gray-200 p-2">{student.rank? student.rank: <span className="text-red-500">not_published</span>}</td>
                              <td className="border border-gray-200 p-2">{student.result? student.result: <span className="text-red-500">not_published</span>}</td>

                              <td className="border border-gray-200 p-2">
                                <div className="flex justify-between items-center mt-3 space-x-2">
                                  <Link href={`/student/update-form/${student.id}`}>
                                    <TButton circle  color="green">
                                      <PencilIcon className="w-5 h-5 mr-2" />
                                    </TButton>
                                  </Link>
                                  <div className="flex items-center">
                                    {student.id && (
                                      <TButton
                                        onClick={() => { onDeleteClick(student.id) }}
                                        circle
                                        color="red"
                                      >
                                        <TrashIcon className="w-5 h-5" />
                                      </TButton>
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="border border-gray-200 p-2" colSpan={10}>
                              No students available
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

            {/** Modal for photo */}
            <Modal show={isImageModalOpen} onClose={() => setIsImageModalOpen(false)}>
                <img src={imageUrl} alt="Image" className='w-full h-[600px] rounded-md '/>
            </Modal>


            {/* Modal for delete confirmation */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="p-4">
                {/* Add a focusable element (e.g., a button) for initial focus */}
                <button className="hidden" autoFocus />
                <p className="flex items-center">
                  <span className="text-red-500 font-bold text-4xl mr-5">
                    <CiWarning />
                  </span>
                  Are you sure you want to delete this student?
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(studentIdToDelete)}
                  >
                    Yes, Delete
                  </button>
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
    </SchoolLayoutComponent>
  );
};
