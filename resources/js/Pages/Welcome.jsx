import React from 'react';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import UserLayoutComponent from "../components/pagelayouts/UserLayoutComponent";
import { ScholarshipBanner } from "../Components/user/ScholarshipBanner";


export default function Welcome(props) {
    const [imageData,setImageData]=React.useState(props.images)

  return (
    <UserLayoutComponent activeRoute={props.activeRoute}>
      <div className="flex flex-col w-full">

        {/* Render the child routes/components */}
        {imageData && (

        <div className="w-full">
            <Box sx={{ width: 'full', height: 'fit', overflowY: 'scroll' }}>
                <ImageList variant="woven" cols={3} gap={3}  sx={{transform: 'translateZ(0)',}}>
                    {imageData.map((image) => (
                        <ImageListItem key={image.background_image}>
                            <img

                            src={`/storage/images/${image.background_image}?w=248&fit=crop&auto=format`}
                            alt={image.title}
                            />
                            <ImageListItemBar
                                sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                }}
                                title={image.title}
                                position="top"
                                actionIcon={
                                <IconButton
                                    sx={{ color: 'white' }}
                                    aria-label={`star ${image.title}`}
                                >
                                    <StarBorderIcon />
                                </IconButton>
                                }
                                actionPosition="left"
                            />
                        </ImageListItem>

                    ))}
                </ImageList>
            </Box>
        </div>
        )}
        <div className="w-full">
        <ScholarshipBanner errors={props.errors}/>
        </div>

      </div>
    </UserLayoutComponent>
  );
}

