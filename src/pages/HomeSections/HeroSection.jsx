import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Button } from '@material-tailwind/react'
const HeroSection = () => {
   
    const navigate = useNavigate();
    return (
        <div>
            <div className='flex flex-col'>
                        <div className='flex items-center justify-start mb-10'>
                            <div>
                            <h1 className='text-white font-bold text-[3rem] mt-10'>
                                The Quickest Way to Deliver your message / your Experience.
                            </h1>
                            <h3 className='text-[2rem] font-bold mt-10 text-gray-500'>Make it visible.</h3>
                            <Button className='w-[10rem] py-[15px] rounded-3xl text-white mt-10' color='pink'
                            onClick={() => navigate("/all-posts")}
                            >
                                Explore Now.
                            </Button>
                        </div>
                        </div>
                        {/* Todo it's not responsive */}
                         
                </div> 
        </div>
    );
};


export default HeroSection;