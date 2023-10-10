import React, { useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { AdminLayoutComponent } from "../../components/pagelayouts/AdminLayoutComponent";
import TButton from "../../components/TButton";
import { useStateContext } from "../../contents/ContextProvider";
import { highlightSearchQuery } from "../../utility/HighlightText";
import Modal from "../../components/Modal";
import { CiWarning } from "react-icons/ci";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "@inertiajs/react";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { Button } from "@mui/material";

export default function StudentsForSchool({students}){

  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [imageUrl, setImageUrl]=React.useState('');

  // Function to open the modal with the image URL
  const openModal = (url) => {
   setIsImageModalOpen(true);
  setImageUrl(url);
  };

  return (
    <>
      {/* Render students in tab format */}
      <div className='md:flex md:justify-center md:items-center '>

        {Object.keys(students).length > 0 ? (
          <div className="block px-1 py-16 sm:px-0 overflow-x-auto">
            <Tab.Group>
              {/* Tab List */}
              <Tab.List className="flex flex-col md:flex-row justify-between rounded-xl bg-yellow-700/20 p-1 ">
                {Object.keys(students).map((student) => (
                  <Tab
                    key={student}
                    className={({ selected }) =>
                      classNames(
                        'w-screen md:w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-black',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white shadow'
                          : 'text-green-700 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    {student}
                  </Tab>
                ))}
              </Tab.List>

              {/* Tab Panels */}
              <Tab.Panels className="mt-2" >
                {Object.values(students).map((students, idx) => (
                  <Tab.Panel
                    key={idx}
                    className=
                      'rounded-xl bg-white p-3 overflow-x-auto max-w-full ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2'

                  >
                    {/* Table to display students */}
                    <div  style={{ overflowX: 'auto' }}>
                    <table className="w-full border border-collapse border-gray-200 rounded-sm" >
                    <thead className="bg-yellow-700/20 text-black">
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
                          <th className="border border-gray-200 p-2">School</th>
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
                              <td className="border border-gray-200 p-2">{student.symbol_number}</td>
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
                              <td className="border border-gray-200 p-2">{student.school_id}</td>
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

                              <td className="border border-gray-200 p-2 ">
                                {student.preferred_major && student.preferred_school && student.preferred_school_address ? (
                                    <div className="flex justify-center items-center mt-3 space-x-2">
                                    <Link href={`/student/admin-update-result-form/${student.id}`}>
                                      <TButton circle  color="green">
                                        <PencilIcon className="w-5 h-5 mr-2" />
                                      </TButton>
                                    </Link>

                                  </div>
                                ):(
                                    <span className="text-red-500">not_applied</span>
                                )}

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

          </div>
        ) : (
          <p className='text-xl my-5 text-green-700 font-light'>Loading......</p>
        )}
      </div>
      </>
  );
};
