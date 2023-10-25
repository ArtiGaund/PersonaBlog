import React, { useEffect, useState } from 'react';
import appwriteService from '../backendAppwrite/config'
import { Container, HorizontalCard, Divider } from '../components/index'
import authService from '../backendAppwrite/auth';
// import { useLocation, useNavigate } from 'react-router-dom';

const AllPosts = () => {
   const [ posts, setPosts ] = useState([])
   
   useEffect(()=> {
    appwriteService.getAllPost().then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })
   },[])

//    useEffect(() => {
//     const handleConfirmEmailVerification = async() => {
//         try {
//             console.log("User id inside handle function ",userId)
//             console.log("Secret inside handle function ",secret)
//             const userIdAsString = userId.toString();
//             const secretAsString = secret.toString();
//             const verified = await authService.confirmEmailVerification(userIdAsString,secretAsString)
//             if(verified){
//                 setEmailVerified(true)
//                 console.log("Email verified by confirm Email verification method ")
//             } else{
//                 console.log("Value is not going into method")
//             }
           
//         } catch (error) {
//             console.log("Error in handle function ",error)
//         }
//     }
//     if(userId && secret && !emailVerified){
//         handleConfirmEmailVerification()
//     }

//     if(!emailVerified){
//         const user = authService.getCurrentUser();
//         if(user){
//             setUser(user)
//         }
//     }
//    }, [ userId, secret, emailVerified ])
    return (
        <Container>
        <div className='w-full py-8'>
            <div className='mx-auto max-w-7xl px-6 lg:px-8 mt-4 mb-6 p-0'>
                <div className='mx-auto max-w-2xl lg:mx-0'>
                    <h1 className='text-[12rem] font-bold tracking-tighter text-white sm:text-xl'>From the blog</h1>
                    <p className='mt-2 text-lg leading-8 text-gray-600'>Learn how to grow by reading others blogs.</p>
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