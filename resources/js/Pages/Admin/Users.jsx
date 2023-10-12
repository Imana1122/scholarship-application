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
import { Link, router } from "@inertiajs/react";

export default function Users(props){
  const { searchQuery } = useStateContext();
  const [ users, setUsers] = useState([]);

  React.useEffect(()=>{
    if(searchQuery){
        axios.get(`/user/search-users/${searchQuery}`).then((response)=>{setUsers(response.data)})
    }else{
        setUsers(props.users)
    }
  },[searchQuery])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);



  const handleDelete = (userId) => {
    // Send the delete request
    axios
      .delete(`/user/delete/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          toast.success('User deleted successfully');
          setIsModalOpen(false)
          router.visit('/user/users')
        }
      })
      .catch((error) => {
        // Handle the error
        if ( error.response.data.error) {
          // Show a toast notification with the error message
          toast.error(error.response.data.error);
        } else {
          // Show a generic error message
          toast.error('An error occurred while deleting the user.');
        }
        setIsModalOpen(false)
        router.visit('/user/users')
      });
  };


  const onDeleteClick = (userId) => {
    setIsModalOpen(true);
    setUserIdToDelete(userId);
  };

  return (
    <AdminLayoutComponent
      title="Users"
      buttons={
        <TButton color="blue" to="/user/create">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          New
        </TButton>
      }
      currentUser={props.currentUser}
    >
      <div className="mt-3 text-sm" style={{ overflowX: 'auto' }}>
        <table className="w-full border border-collapse border-gray-200 rounded-sm">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="border border-gray-200 p-2">ID</th>
              <th className="border border-gray-200 p-2">Name</th>
              <th className="border border-gray-200 p-2">Phone_Number</th>
              <th className="border border-gray-200 p-2">Role</th>
              <th className="border border-gray-200 p-2">Change</th>
              <th className="border border-gray-200 p-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr className="border border-gray-200" key={user.id}>
                  <td className="border border-gray-200 p-2">
                    {/* Convert the ID to a string and use the highlightSearchQuery function to display it */}
                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(user.id.toString(), searchQuery) }} />
                  </td>

                  <td className="border border-gray-200 p-2">
                    {user.name}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {user.phone_number}
                  </td>

                  <td className="border border-gray-200 p-2">
                    {user.role.role}
                  </td>

                  <td className="border border-gray-200 p-2">
                        <Link href={`/user/update-form/${user.id}`} className="flex justify-center">
                        <TButton circle  color="green">
                            <PencilIcon className="w-5 h-5 mr-2" />
                        </TButton>
                        </Link>
                  </td>

                  <td className="border border-gray-200 p-2">
                    <div className="flex justify-center">
                        {user.id && (
                          <TButton onClick={() => { onDeleteClick(user.id) }} circle color="red">
                            <TrashIcon className="w-5 h-5" />
                          </TButton>
                        )}
                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-200 p-2" colSpan={6}>
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Modal for delete confirmation */}
        <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            {/* Add a focusable element (e.g., a button) for initial focus */}
            <button className="hidden" autoFocus />
            <p className="flex items-center"><span className="text-red-500 font-bold text-4xl mr-5"><CiWarning /></span>Are you sure you want to delete this user?</p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => handleDelete(userIdToDelete)}
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
    </AdminLayoutComponent>
  );
};
