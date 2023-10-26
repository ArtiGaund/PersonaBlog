import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    CardFooter,
} from "@material-tailwind/react"
import appwriteService from '../../backendAppwrite/config'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

export default function HorizontalCard({ $id, title, Image, content, uploadYear }){
    const curData = new Date(uploadYear)
    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    const formattedDate = curData.toLocaleDateString(undefined, options);

    // limit the content to a specific number of characters
    const maxLength = 130;
    const newContent = content.length > maxLength ? content.substring(0,maxLength) + '...' : content
    return (
        <Link to={`/post/${$id}`}>
            <Card className='mt-6 w-96 p-3 h-100 bg-gray-800 hover:scale-105'>
                <CardHeader color='blue-gray' className='relative h-56'>
                    <img src={appwriteService.getFilePreview(Image)} alt={title}
                    className='w-full h-full object-center object-cover '
                    />
                </CardHeader>
                <CardBody className='h-40 overflow-y-auto'>
                    <Typography variant='h5' color='white' className='mb-2'>{title}</Typography>
                    <Typography className='text-sm text-gray-400'>{parse(newContent)}</Typography>
                </CardBody>
                <CardFooter className='pt-0 gap-1'>
                    <Button color='pink'>Read More</Button>
                    <span className='text-[11px] ml-8 text-gray-500'>Last updated {formattedDate}</span>
                </CardFooter>
            </Card>
        </Link>
    );
};



// export default HorizontalCard;