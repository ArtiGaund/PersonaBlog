import React from 'react';
import {Container, Divider } from '../components/index'
import HeroSection from './HomeSections/HeroSection'
import FeaturedBlogSection from './HomeSections/FeaturedBlogSection';
import RecentBlogSection from './HomeSections/RecentBlogSection';

const Home = () => {    
    return (
        <div className='w-full bg-gray-900 min-h-screen'>
            <Container>
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