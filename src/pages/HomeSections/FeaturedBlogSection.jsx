import React, { useEffect, useState } from 'react';
import appwriteService from '../../backendAppwrite/config'
import {Container, ImageOverlapCard} from '../../components/index'
import { useNavigate } from 'react-router-dom'

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
            
            <div className='flex flex-wrap'>
                {posts.slice(0,4).map((post) => (
                    <div className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4' key={post.$id}>
                        <div className='h-full flex flex-col justify-between'>
                             <ImageOverlapCard {...post}/>
                        </div>
                        
                    </div>
                ))}
            </div> 
        </div>
    );
};


export default FeaturedBlogSection;