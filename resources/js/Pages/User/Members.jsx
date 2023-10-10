import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Grid,
} from '@mui/material';

export default function Members({members}) {
  return (
      <div>
        <Grid container spacing={1}>
          {members.map((member, index) => (
            <Grid item xs={12} key={index}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <Avatar
                    alt="Profile Picture"
                    src={`/storage/images/${member.imagePath}`}
                    style={{ width: 100, height: 100 , marginRight:5}} // Increase the size here
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                    {member.name}
                    <span className='ml-3 text-sm text-slate-400'>
                      {member.phone_number}
                    </span>
                    </>
                }
                  secondary={
                    member.description
                  }
                />
              </ListItem>
              {index < members.length - 1 && <Divider variant="inset" component="li" />}
            </Grid>
          ))}
        </Grid>
      </div>
  );
}
