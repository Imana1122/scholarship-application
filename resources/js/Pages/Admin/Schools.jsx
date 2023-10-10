import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AdminLayoutComponent } from '../../components/pagelayouts/AdminLayoutComponent';
import { PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import TButton from '../../components/TButton';
import { useStateContext } from '../../contents/ContextProvider';
import { Link, router } from '@inertiajs/react';
import Modal from '../../components/Modal';
import { CiWarning } from 'react-icons/ci';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';
import StudentsForSchool from './StudentsForSchool';


function Row( props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const {onDeleteClick}=props;
    const{openModal}= props;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="left" >{row.school_name}</TableCell>
        <TableCell align="left" >{row.school_type}</TableCell>
        <TableCell align="left">{row.school_email}</TableCell>
        <TableCell align="left">{row.school_phone}</TableCell>
        <TableCell align="left">{row.school_address}</TableCell>
        <TableCell align="left">{row.school_category}</TableCell>
        <TableCell align="left">{row.principal_name}</TableCell>
        <TableCell align="left">{row.principal_phone}</TableCell>
        <TableCell align="left">{row.principal_email}</TableCell>
        <TableCell align="left">
            {row.school_license ? (
                <Button onClick={() => openModal(`/storage/images/${row.school_license}`)}>View</Button>
            ) : (
                <span className='text-red-500 text-sm'>null</span>
            )}
        </TableCell>

        <TableCell align="left">{row.established_date}</TableCell>
        <TableCell className="border border-gray-200 p-2">
            <Link href={`/school/update-form/${row.id}`}>
            <TButton circle  color="green">
                <PencilIcon className="w-5 h-5 mr-2" />
            </TButton>
            </Link>
        </TableCell>
        <TableCell>
        {row.id && (
            <TButton
            onClick={() => { onDeleteClick(row.id) }}
            circle
            color="red"
            >
            <TrashIcon className="w-5 h-5" />
            </TButton>
        )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          <StudentsForSchool students={row.students}/>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>
  );
}

Row.propTypes = {
    row: PropTypes.shape({
        school_name: PropTypes.string.isRequired,
        school_type: PropTypes.string.isRequired,
        school_email: PropTypes.string.isRequired,
        students: PropTypes.shape({
          All: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              symbol_number: PropTypes.string,
              imagePath: PropTypes.string,
            })
          ),
          Passed: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                symbol_number: PropTypes.string,
                imagePath: PropTypes.string,
              })
          ),
          Failed: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                symbol_number: PropTypes.string,
                imagePath: PropTypes.string,
              })
          ),
          OnHold: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                symbol_number: PropTypes.string,
                imagePath: PropTypes.string,
              })
          ),
        }).isRequired,
      }).isRequired

};

export default function Schools(props) {
  const [schoolsWithStudents,setSchoolWithStudents] = useState(props.schoolsWithStudents);
  const { searchQuery } = useStateContext();


  React.useEffect(()=>{
    if(searchQuery){
        axios.get(`/user/search-schools/${searchQuery}`).then((response)=>{setSchoolWithStudents(response.data)})
    }else{
        setSchoolWithStudents(props.schoolsWithStudents)
    }
  },[searchQuery])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [schoolIdToDelete, setSchoolIdToDelete] = useState(null);

  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
  const [imageUrl, setImageUrl]=React.useState('');

    // Function to open the modal with the image URL
  const openModal = (url) => {
      setIsImageModalOpen(true);
      setImageUrl(url);
  };


  const handleDelete=(schoolIdToDelete) =>{
    axios
      .delete(`/school/delete/${schoolIdToDelete}`)
      .then((response) => {
        if (response.data.message) {
          // Deletion was successful
          toast.success('Student Deleted Successfully.');
          setIsModalOpen(false)
          router.visit('/user/schools')
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
    setSchoolIdToDelete(studentId);
  };

  return (
    <AdminLayoutComponent title={`Schools :: ${schoolsWithStudents.length}`}
    currentUser={props.currentUser}
    buttons={
      <TButton color="green" to="/school/create">
        <PlusCircleIcon className="h-5 w-5 mr-2" />
        New
      </TButton>
    }>
    <div style={{ overflowX: 'auto' }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead className='bg-slate-700'>
            <TableRow >
              <TableCell />
              <TableCell sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>ID </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>Name </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>Type </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>Email </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>Phone </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700 , fontSize:16}}>Address </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700 , fontSize:16}}>Category </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700 , fontSize:16}}>Principal_Name </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>Principal_Phone </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>Principal_Email </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>Liscense </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>Established_Date </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>Change </TableCell>
              <TableCell align="left" sx={{ color: 'white', fontWeight: 700, fontSize:16 }}>Delete </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schoolsWithStudents.length > 0 ? (schoolsWithStudents.map((school) => (
              <Row key={school.id} row={school} onDeleteClick={onDeleteClick} openModal={openModal}/>
            ))):(
                <p>No_schools</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>


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
            onClick={() => handleDelete(schoolIdToDelete)}
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
}
