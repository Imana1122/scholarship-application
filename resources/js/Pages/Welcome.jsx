import React from 'react';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import UserLayoutComponent from "../components/pagelayouts/UserLayoutComponent";
import { ScholarshipBanner } from "../Components/user/ScholarshipBanner";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

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
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {  images.length > 0 &&   images.map((image,index)=>(
            <SwiperSlide key={index}>
            <img src={`/storage/images/${image.background_image}`} alt="background" />
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
        )}
        <div className="w-full">
        <ScholarshipBanner errors={props.errors}/>
        </div>

      </div>
    </UserLayoutComponent>
  );
}

