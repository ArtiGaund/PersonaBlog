import React from 'react';
import {Container, Divider } from '../components/index'
import HeroSection from './HomeSections/HeroSection'
import FeaturedBlogSection from './HomeSections/FeaturedBlogSection';
import RecentBlogSection from './HomeSections/RecentBlogSection';

const Home = () => {    
    return (
        <div className='w-full bg-gray-900 min-h-screen'>
            <Container>
                {/* <div className='flex flex-col'>
                        <div className='flex items-center justify-center mb-10'>
                            <div>
                            <h1 className='text-[#98EC65] font-bold text-[5rem]'>
                                Creative
                            </h1>
                            <h3 className='text-white text-[2rem] font-bold'>Desgin Studio</h3>
                            <button className='w-[10rem] py-[6px] rounded-3xl bg-[#98EC65] mt-[1rem]'
                            onClick={() => navigate("/all-posts")}
                            >
                                Explore Now.
                            </button>
                        </div>
                        </div>
                        {/* Todo it's not responsive */}
                        {/* <div className='flex flex-row'>
                            {posts.slice(0,4).map((post) => (
                                <div className='p-2 w-full sm:w-full lg:w-1/2 xl:w-1/3' key={post.$id}>
                                    <ImageOverlapCard {...post}/>
                                </div>
                            ))}
                        </div> */}
                {/* </div> */} 
                <HeroSection />
                <Divider />
                <FeaturedBlogSection />
                <Divider />
                <RecentBlogSection />
            </Container>
        </div>
    );
};



export default Home;