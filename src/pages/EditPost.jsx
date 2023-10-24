import React, { useEffect} from 'react';
import { Container, PostForm } from '../components'
import appwriteService from '../backendAppwrite/config'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../store/postSlice';

function EditPost(){
    //slug is needed, we need to take out values from url
    const { slug } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const post = useSelector((state) => state.post.currentPost);
    // to bring all values so we need useEffect, if change in slug
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(slug){
                    const fetchedPost = await appwriteService.getPost(slug);
                    if(fetchedPost){
                        dispatch(updatePost(fetchedPost))
                    }else{
                        navigate("/")
                    }
                }
            } catch (error) {
                console.log("Error fetching post: ",error);
                navigate("/")
            }
        }
        fetchData();
    }, [ slug, navigate, dispatch])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
};



export default EditPost;