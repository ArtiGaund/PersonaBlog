import React, { useState, useEffect } from 'react';
import { Container, PostForm } from '../components/index'
import appwriteService from '../backendAppwrite/config'
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [ post, setPost ] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    // to bring all values so we need useEffect, if change in slug
    useEffect(() => {
        if(slug){
            appwriteService.getPost(slug).then((post) => {
                if(post){
                    setPost(post)
                }
            })
        }else{
            navigate("/")
        }
    }, [ slug, navigate])
    return (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    );
};



export default EditPost;