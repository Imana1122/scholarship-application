import React from 'react';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import UserLayoutComponent from "../components/pagelayouts/UserLayoutComponent";
import { ScholarshipBanner } from "../Components/user/ScholarshipBanner";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/keyboard';
import 'swiper/css/mousewheel';
import 'swiper/css/virtual';
import { EffectCoverflow, Mousewheel,Keyboard,Virtual} from 'swiper/modules';
import './Welcome.css'

export default function Welcome(props) {
  const {images} = props;
  return (
    <UserLayoutComponent activeRoute={props.activeRoute}>
      <div className="flex flex-col w-full">

        {/* Render the child routes/components */}
        {  images && (

        <div className="w-full container">

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
        scrollbar={{ draggable: true }}
        modules={[EffectCoverflow,Mousewheel,Keyboard,Virtual]}
        className="swiper_container"
      >
        {  images.length > 0 &&   images.map((image,index)=>(
            <SwiperSlide key={index}>
            <img src={`/storage/images/${image.background_image}`} alt="background" />
          </SwiperSlide>
        ))}


      </Swiper>

        </div>
        )}
        <div className="w-full">
        <ScholarshipBanner errors={props.errors}/>
        </div>

      </div>
    </UserLayoutComponent>
  );
}

