import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../backendAppwrite/config'
import { Button, Container} from '../components/index'
import parse from 'html-react-parser'
import { useSelector} from 'react-redux'

const Post = () => {
    const [ post, setPost ] = useState(null)
    const { slug }= useParams()
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = ( post && userData ? post.userId === userData.$id : false)
    //
   
    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post) setPost(post)
                else {
                    console.log("Not able to get data from appwrite ");
                    navigate("/");
            }
            })
        }else{
            console.log("Slug is not found");
            navigate("/")
        }
    }, [ slug, navigate ])
    const curData = post ? new Date(post.uploadYear) : null
    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    const formattedDate = curData ? curData.toLocaleDateString(undefined, options) : null;
    // console.log("Date ",formattedDate)
    return (
        <div className='py-8'>
            <Container>
               { post ? (
               <div className='flex flex-col gap-8 justify-center'>
                    <div className='flex flex-row pt-10'>
                        <div className='flex-1 justify-start items-start ml-20'>
                            <h1 className='text-white text-[4rem]'>{post.title}</h1>
                            {console.log("Date ")}
                            {/* Footer for author and date of upload */}
                                {formattedDate && userData && (
                                    <div className='text-gray-500 text-sm'> By {userData.name} - {formattedDate}</div>
                                )}
                            </div>
                        <div className='flex-1 flex items-end justify-end mr-8'>
                            {isAuthor && (
                                <div className='flex right-0 p-4 sm:mb-4'>
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button bgColor='bg-green-500' className='mr-3'>Edit</Button>
                                    </Link>
                                    <Button bgColor='bg-red-500'>Delete</Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-center items-center w-full'>
                        <img 
                        src={appwriteService.getFilePreview(post.Image)}
                        className='rounded-xl'
                        />
                    </div>
                    <div className='text-white'>
                        {parse(post.content)}
                    </div>
                    {console.log("Post content", parse(post.content))}
                </div>
                ) : null}
            </Container>
        </div>
    );
};


export default Post;