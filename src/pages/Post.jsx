import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../backendAppwrite/config'
import { Button, Container} from '../components/index'
import parse from 'html-react-parser'
import { useSelector, useDispatch } from 'react-redux'
import { deletePost, getCurrentPost, clearCurrentPost } from '../store/postSlice'

const Post = () => {
    // const [ post, setPost ] = useState(null)
    const { slug }= useParams()
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
    
    const dispatch = useDispatch();
    const currentPost = useSelector((state) => state.post.currentPost);
    const isAuthor = ( currentPost && userData ? currentPost.userId === userData.$id : false)
    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((currentPost) => {
                if(currentPost) 
                 { 
                    dispatch(getCurrentPost(currentPost))
                }
                else {
                    console.log("Not able to get data from appwrite ");
                    navigate("/");
            }
            })
        }else{
            dispatch(clearCurrentPost());
            console.log("Slug is not found");
            navigate("/")
        }
    }, [ slug, navigate, dispatch ])

    const DeletePost = () => {
        appwriteService.deletePost(currentPost.$id).then((status) => {
            if(status){
                appwriteService.deleteFile(currentPost.Image);
                dispatch(deletePost(currentPost?.$id))
                alert("Post have been deleted successfully")
                navigate("/");
            }
        })
    }
   
    const curData = currentPost ? new Date(currentPost.uploadYear) : null
    // console.log("6 Cur date ", curData)
    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    const formattedDate = curData ? curData.toLocaleDateString(undefined, options) : null;
    // console.log("Date ",formattedDate)
    return (
        <div className='py-8'>
           
            <Container>
               { currentPost ? (
                
               <div className='flex flex-col gap-8 justify-center'>
                    <div className='flex flex-row pt-10'>
                        <div className='flex-1 justify-start items-start ml-20'>
                            <h1 className='text-white text-[4rem]'>{currentPost?.title}</h1>
                            {/* Footer for author and date of upload */}
                                {formattedDate && userData && (
                                    <div className='text-gray-500 text-sm'> By {userData.name} - {formattedDate}</div>
                                )}
                            </div>
                        <div className='flex-1 flex items-end justify-end mr-8'>
                            {isAuthor && (
                                <div className='flex right-0 p-4 sm:mb-4'>
                                    <Link to={`/edit-post/${currentPost?.$id}`}>
                                        <Button bgColor='bg-green-500' className='mr-3'>Edit</Button>
                                    </Link>
                                    <Button bgColor='bg-red-500' onClick={DeletePost}>Delete</Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex justify-center items-center w-full'>
                        <img 
                        src={appwriteService.getFilePreview(currentPost.Image)}
                        className='rounded-xl'
                        />
                    </div>
                    <div className='text-white'>
                        {parse(currentPost.content)}
                    </div>
                </div>
                ) : null}
            </Container>
        </div>
    );
};


export default Post;