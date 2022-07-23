import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Keyboard } from "swiper";
import slidesrc from "assets/images/Slide.png";
import slidesrc2 from "assets/images/Slide2.jpg";
import { Navigation } from "swiper";
const Carousel = () => {
  return (
    <>
      <Swiper
        autoplay={true}
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        modules={[Keyboard]}
        className="mySwiper"
        effect="cards"
      >
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper"></Swiper>
        <SwiperSlide>
          <img src={slidesrc} alt="slid" width="100%" height="300px" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slidesrc2} alt="slid" width="100%" height="300px" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
