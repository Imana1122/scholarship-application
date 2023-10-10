import React from 'react';
import { Container, Typography, Grid, Paper, ImageList, ImageListItem } from '@mui/material';
import { Transition } from '@headlessui/react';
import UserLayoutComponent from '../../components/pagelayouts/UserLayoutComponent';
import Members from './Members';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';


export default function About(props){
  const {aboutImages, aboutDetails} = props;

  return (
    <UserLayoutComponent>
      <Container className="mt-5">
      <Transition
          show={true}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Paper elevation={3} className="p-6 rounded-lg shadow-lg mb-5">
            <Grid container spacing={3}>
              {/* Left column for text */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h4" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body1" paragraph>
                  {aboutDetails.about_description1 ? aboutDetails.about_description1 : <>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    tincidunt urna eu dapibus. Integer tristique nunc ac justo
                    tincidunt, eget convallis nisi volutpat. Pellentesque ut varius
                    enim, in posuere justo. Vivamus lacinia odio et erat dictum, id
                    malesuada odio efficitur.
                  </>}
                </Typography>
                <Typography variant="body1" paragraph>
                  {aboutDetails.about_description2 ? aboutDetails.about_description2 : <>Nullam sollicitudin, turpis at pharetra vehicula, libero libero
                    pellentesque dolor, a malesuada neque eros eget nisi. Phasellus
                    eget congue ipsum. Nam nec odio nec sem posuere venenatis a eget
                    ligula. Nulla facilisi. Vivamus eu tellus non nunc pretium
                    dignissim.
                  </>}
                </Typography>
              </Grid>
              {/* Right column for image list */}
              <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height:'450px'}}>
                <div>
                <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {aboutImages.length>0 && aboutImages.map((image,index)=>(
            <SwiperSlide key={index}>
                <img src={`/storage/images/${image.image_path}`} alt="about" />
          </SwiperSlide>
        ))}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
                </div>
              </Grid>



            </Grid>
          </Paper>
      </Transition>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Transition
                show={true}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <Paper elevation={3} className="p-6 rounded-lg shadow-lg" style={{ height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                    Our Mission
                    </Typography>
                    <Typography variant="body2" paragraph>
                    {aboutDetails.mission_description ? aboutDetails.mission_description :
                    <>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    tincidunt urna eu dapibus.
                    </>}
                    {aboutDetails.mission_image_path && <img src={`/storage/images/${aboutDetails.mission_image_path}`} alt="mission"/>}
                    </Typography>
                </Paper>
                </Transition>
        </Grid>
        <Grid item xs={12} sm={6} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Transition
                show={true}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <Paper elevation={3} className="p-6 rounded-lg shadow-lg" style={{ height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                    Our Team
                    </Typography>
                    <Typography variant="body2" paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    tincidunt urna eu dapibus.
                    </Typography>
                    <Members members={props.members}/>
                </Paper>
                </Transition>
        </Grid>
      </Grid>

      </Container>
      </UserLayoutComponent>
  );
};
