import React from 'react'
import GuestLayoutComponent from '../../components/pagelayouts/GuestLayoutComponent'
import { Button, List, ListItem, ListItemText } from '@mui/material'
import { Link } from '@inertiajs/react'

export default function ChooseUser(){
  return (
    <GuestLayoutComponent>
        <div className='flex flex-col items-center w-full'>
        <List component="nav">

          <ListItem
            variant="contained"
          >
            <Button
              color="primary"
              href="/user-login-form"
              component={Link}
              variant="contained"
              fullWidth
            >
              User
            </Button>
          </ListItem>

          <ListItem
            variant="contained"

          >
            <Button
              color="primary"
              href="/school-login-form"
              component={Link}
              variant="contained"
              fullWidth
            >
              School
            </Button>
          </ListItem>
        </List>
        </div>
    </GuestLayoutComponent>
  )
}
