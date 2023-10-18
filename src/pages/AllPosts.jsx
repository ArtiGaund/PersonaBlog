import React, { useEffect, useState } from 'react';
import appwriteService from '../backendAppwrite/config'
import { Container, ImageOverlapCard, HorizontalCard } from '../components/index'

const AllPosts = () => {
   const [ posts, setPosts ] = useState([])
   useEffect(()=> {
    appwriteService.getAllPost().then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })
   },[])
    return (
        <div className='w-full py-8'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8 mt-4 mb-6 p-0'>
                <div className='mx-auto max-w-2xl lg:mx-0'>
                    <h2 className='text-3xl font-bold tracking-tighter text-gray-900 sm:text-xl'>From the blog</h2>
                    <p className='mt-2 text-lg leading-8 text-gray-600'>Learn how to grow your business with our expert advice.</p>
                </div>
            </div>

            <Container>
                <div className='flex flex-wrap items-stretch mx-4 mt-5'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-full lg:w-1/2 xl:w-1/3'>
                            <HorizontalCard {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
           
        </div>
    );
};


export default AllPosts;