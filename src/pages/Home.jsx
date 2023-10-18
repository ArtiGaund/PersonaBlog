import React, { useEffect, useState } from 'react';
import appwriteService from '../backendAppwrite/config'
import {Container, ImageOverlapCard} from '../components/index'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [ posts, setPosts ] = useState([])
    useEffect(() => {
        appwriteService.getAllPost().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])
    const navigate = useNavigate();
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-col'>
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
                        <div className='flex flex-row'>
                            {posts.slice(0,4).map((post) => (
                                <div className='p-2 w-full sm:w-full lg:w-1/2 xl:w-1/3' key={post.$id}>
                                    <ImageOverlapCard {...post}/>
                                </div>
                            ))}
                        </div>
                </div>
            </Container>
        </div>
    );
};



export default Home;