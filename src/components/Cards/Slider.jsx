import React from 'react';
import appwriteService from '../../backendAppwrite/config';
import { SwiperSlide } from 'swiper/react';

function Slider({ $id, title, Image, content }) {
  return (
    <SwiperSlide key={$id}>
      <div className="flex flex-col gap-6 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${appwriteService.getFilePreview(Image)})` }}
        />
        <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
        <div className="relative flex flex-col gap-3">
          <h1 className="text-xl lg:text-2xl">{title}</h1>
          <p className="lg:text-[18px]">{content}</p>
        </div>
      </div>
    </SwiperSlide>
  );
}

export default Slider;
