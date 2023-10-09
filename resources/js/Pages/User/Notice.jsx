import React, {useState, useEffect} from 'react'
import UserLayoutComponent from '../../components/pagelayouts/UserLayoutComponent'
import { Alert, AlertTitle } from '@mui/material';

export default function Notice(props){
    const [notices,setNotices] = useState(props.notices);

    useEffect(()=>{

    })

  return (
    <UserLayoutComponent activeRoute={props.activeRoute}>
        <div className='w-screen flex flex-col space-y-5 p-10 '>
        {notices.length > 0 ? (notices.map((notice, index) => (
        <Alert  variant="outlined" severity={notice.type} key={index}>
          <AlertTitle>
            {notice.type === 'error' ? 'Error' : notice.type === 'info' ? 'Info' : notice.type === 'warning'? 'Warning' : 'Success'}
          </AlertTitle>

            {notice.content} — <strong>check it out!</strong>
        </Alert>
      ))):(
        <div className='flex justify-center'><Typography>No notices now!!</Typography></div>
      )}
        </div>
    </UserLayoutComponent>
  )
}
