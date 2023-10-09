import React from 'react';
import UserLayoutComponent from '../../components/pagelayouts/UserLayoutComponent';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Grid,
} from '@mui/material';

export default function Downloads(props) {
  const { members } = props;

  return (
    <UserLayoutComponent>
      <div>
        <Grid container spacing={3}>
          {members.map((member, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="Profile Picture"
                    src={`/storage/images/${member.imagePath}`}
                    style={{ width: 100, height: 100 }} // Increase the size here
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={member.name}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="textPrimary">
                        {member.phone_number}
                      </Typography>
                      {member.description}
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < members.length - 1 && <Divider variant="inset" component="li" />}
            </Grid>
          ))}
        </Grid>
      </div>
    </UserLayoutComponent>
  );
}
