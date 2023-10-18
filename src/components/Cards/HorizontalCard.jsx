import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react"
import appwriteService from '../../backendAppwrite/config'
import { Link } from 'react-router-dom'

export default function HorizontalCard({ $id, title, Image, content, uploadedYear }){
    return (
        <Link to={`/post/${$id}`}>
        <Card className='w-full max-w-[48rem] flex-row' >
            <CardHeader
            shadow={false}
            floated={false}
            className='m-0 w-2/5 shrink-0 rounded-r-none'
            >
                <img src={appwriteService.getFilePreview(Image)} alt={title} className='h-full w-full object-cover'/>
            </CardHeader>
            <CardBody className='h-[40vh]'>
                <Typography variant='h4' color='blue-gray' className='mb-2'>
                    {title}
                </Typography>
                <Typography color='gray' className='mb-8 font-normal'>
                    {/* Like so many organization these days, Autodesk is a company transition. It was until recently a
                    transitional boxed software company selling licenses. Yet its own business model disruption is only
                    part of the story. */}
                    {content}
                </Typography>
                <a href='#' className='inline-block flex-col'>
                    <Button variant='text' className='flex items-center gap-2'>Learn More</Button>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                    >
                         <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                        />
                    </svg>
                    <Typography>{uploadedYear}</Typography>
                </a>
               
            </CardBody>
        </Card>
        </Link>
    );
};



// export default HorizontalCard;