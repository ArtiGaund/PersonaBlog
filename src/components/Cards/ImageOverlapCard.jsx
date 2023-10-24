import React from 'react';
import appwriteService from '../../backendAppwrite/config'
import { Link } from 'react-router-dom'
import {
    Card, CardBody, CardHeader, Typography,
} from "@material-tailwind/react"
import ImageCard from './ImageCard';
import parse from 'html-react-parser'
function ImageOverlapCard({ $id, title, Image, content }){
    // const image = 
    return (
        <Link to={`/post/${$id}`}>
            {/* <Card
            shadow={false}
            className='relative grid h-[30rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center'>
                <CardHeader
                floated={false}
                shadow={false}
                color='transparent'
                style={{ backgroundImage: `url(${appwriteService.getFilePreview(Image)})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                className={`absolute inset-0 m-0 h-full w-full rounded-none`}
                >
                    <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50'/>
                </CardHeader>
                <CardBody className='relative py-14 px-6 md:px-12'>
                    <Typography variant='h2' color='white' className='mb-6 font-medium leading-[1.5]'>
                        {title}
                    </Typography>
                </CardBody>
            </Card> */}
            {/* <div className='text-gray-900 grid h-65 place-items-center bg-gray-400 antialiased rounded-xl'>
                <img src={appwriteService.getFilePreview(Image)} alt={title}
                className='w-65 h-65 object-cover object-center rounded-lg shadow-md'
                />
                <div className='px-4 relative -mt-16'>
                    <div className='p-6 bg-white rounded-lg shadow-lg'>
                        <h4 className='mt-1 text-sm font-semibold uppercase leading-tight truncate'>
                            {title}
                        </h4>
                    </div>  
                </div>
            </div> */}
            <main style={{ display: 'flex', gap: '16px'}}>
                <div className='card-container'>
                    <ImageCard imgSrc={appwriteService.getFilePreview(Image)}>
                        <h3 className='text-xl font-bold mb-2'>{title}</h3>
                        <p>{parse(content)}</p>
                        <div className='space-x-4 mt-4'>
                            <button className='btn'>
                            
                            </button>
                        </div>
                    </ImageCard>
                </div>
                
            </main>
        </Link>
        
    );
};



export default ImageOverlapCard;