import React, { useEffect, useState } from 'react';
import appwriteService from '../backendAppwrite/config'
import { Container, HorizontalCard, Divider } from '../components/index'
import authService from '../backendAppwrite/auth';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AllPosts = () => {
   const [ posts, setPosts ] = useState([])
   // email verification
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search)
   const userId = searchParams.get('userId')
   const secret = searchParams.get('secret')

   const [ user, setUser ] = useState({})
   const [ emailVerified, setEmailVerified ] = useState(false);
    

   useEffect(()=> {
    appwriteService.getAllPost().then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })
   },[])
   const handleConfirmEmailVerification = async({ userId, secret }) => {
    try {
        return await authService.confirmEmailVerification({userId,secret}).then((response) => {
            setEmailVerified(true)
            console.log("Email verified by confirm Email verification method ")
        })
        .catch((error) => {
            console.log("Error in verification method in authService ")
        })
    } catch (error) {
        console.log("Error in handle function ",error)
    }
}



useEffect(() => {
    // Check if email verification has been confirmed
    if (emailVerified) return;

    if(userId && secret && !emailVerified){
        handleConfirmEmailVerification({userId,secret});
        const user = authService.getCurrentUser();
        
        if(user) setUser(user)
        console.log("User after verification ",user);
         console.log('Email verified ',emailVerified)
    }
    if(!emailVerified){
        const user = authService.getCurrentUser();
        console.log("User if email not verified ",user)  
        if(user){
            setUser(user)
        }
    }

   
}, [emailVerified, userId, secret]);


    return (
        <Container>
        <div className='w-full py-8'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8 mt-4 mb-6 p-0'>
                <div className='mx-auto max-w-2xl lg:mx-0'>
                    <h1 className='text-[12rem] font-bold tracking-tighter text-white sm:text-xl'>From the blog</h1>
                    <div className='mt-2 text-lg leading-8 text-gray-600'>Learn how to grow by reading others blogs.</div>
                </div>
            </div>
            
           
                <Divider />
                <div className='flex flex-wrap items-stretch mx-4 mt-5'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-full lg:w-1/2 xl:w-1/3'>
                            <HorizontalCard {...post}/>
                        </div>
                    ))}
                </div>
            
           
        </div>
        </Container>
    );
};


export default AllPosts;