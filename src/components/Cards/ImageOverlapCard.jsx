import React from 'react';
import appwriteService from '../../backendAppwrite/config'
import { Link } from 'react-router-dom'

function ImageOverlapCard({ $id, title, Image }){

    return (
        <Link to={`/post/${$id}`}>
            <div className='text-gray-900 grid h-[100vh] place-items-center bg-gray-400 antialiased'>
                <img src={appwriteService.getFilePreview(Image)} alt={title}
                className='w-full object-cover object-center rounded-lg shadow-md'
                />
                <div className='px-4 relative -mt-16'>
                    <div className='p-6 bg-white rounded-lg shadow-lg'>
                        <div className='flex items-baseline'>
                            <span className='font-semibold bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full uppercase tracking-wide'>
                                New
                            </span>
                            <div className='ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wide'>
                                2 baths &bull; 3 rooms
                            </div>
                        </div>
                        <h4 className='mt-1 text-xl font-semibold uppercase leading-tight truncate'>
                            {title}
                        </h4>
                        <div className='mt-1'>
                            <span className='text-gray-600 text-sm'>4/5 rating</span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
        
    );
};



export default ImageOverlapCard;