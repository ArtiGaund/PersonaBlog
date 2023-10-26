import React, { useEffect, useState } from 'react';
import appwriteService from '../../backendAppwrite/config'
import {Container, ImageOverlapCard} from '../../components/index'
import { useNavigate, Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

import { FreeMode, Pagination } from 'swiper/modules'
import { RxArrowTopRight } from 'react-icons/rx'
import { freeze } from '@reduxjs/toolkit';
// import appwriteService from '../../backendAppwrite/config'

const FeaturedBlogSection = () => {
    const [ posts, setPosts ] = useState([])
    useEffect(() => {
        appwriteService.getAllPost().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])
    return (
        <div>
            <div className='p-6'>
                <span className='text-white font-bold'>Featured Post</span>
            </div>
            
            <div className="flex items-center justify-center flex-col h-[500px] gap-10">
            <Swiper
            breakpoints={{
                340: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                700: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }}
              freeMode={true}
              pagination={{
                clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="max-w-[90%] lg:max-w-[100%]"
            >
                {posts.slice(0,8).map((post) => (
                              <SwiperSlide key={post.$id}>
                              <div className="flex flex-col gap-6 mb-10 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[400px] lg:w-[350px] overflow-hidden cursor-pointer">
                                <div
                                  className="absolute inset-0 bg-cover bg-center"
                                  style={{ backgroundImage: `url(${appwriteService.getFilePreview(post.Image)})` }}
                                />
                                <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
                                <div className="relative flex flex-col gap-3">
                                  {/* <icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" /> */}
                                  <h1 className="text-xl lg:text-2xl">{post.title} </h1>
                                  {/* <p className="lg:text-[18px]">{post.content} </p> */}
                                </div>
                                <Link to={`/post/${post.$id}`}><RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" /></Link>
                              </div>
                            </SwiperSlide>
                ))}
                </Swiper>
                
            </div> 
        </div>
       
    );
};


export default FeaturedBlogSection;