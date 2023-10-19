import React, { useState, useEffect } from 'react';
import { CardNoImage } from '../../components/index'
import appwriteService from '../../backendAppwrite/config'

const RecentBlogSection = () => {
    const [ posts, setPosts ] = useState([])
    useEffect(() => {
        appwriteService.getAllPost().then((posts) => {
            if(posts) setPosts(posts.documents);
        })
    }, [])

    const descendingOrderPosts = posts
    .slice()
    .sort((a,b) =>{
        // console.log("a ", a.uploadYear)
        // b.uploadYear - a.uploadYear
        const x=new Date(a.uploadYear);
        const y=new Date(b.uploadYear);
        return y-x
        // console.log("Data ",y-x);
    } 
    );
    

    const top6Posts = descendingOrderPosts.slice(0,6);
    return (
        <div className='flex flex-col gap-5 h-[100vh]'>
            <div>
                <h1 className='text-white'>Recent posts</h1>
            </div>
            <div className='flex flex-col'>
                {top6Posts.map((post) => (
                    <div key={post.$id}>
                        <CardNoImage {...post}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentBlogSection;