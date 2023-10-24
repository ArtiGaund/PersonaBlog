import React from 'react';
import { Link } from 'react-router-dom'
// import appwriteService from '../../backendAppwrite/config'
import parse from 'html-react-parser'

function CardNoImage({ $id, title, content, uploadYear}){
    const curData = new Date(uploadYear)
    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    const formattedDate = curData.toLocaleDateString(undefined, options);


    // limit the content to a specific number of characters
    const maxLength = 200;
    const newContent = content.length > maxLength ? content.substring(0,maxLength) + '...' : content
    return (
            <Link to={`/post/${$id}`}>
                <div className='bg-gray-900 p-6 rounded-lg shadow-xl flex flex-col gap-3'>
                <div>
                    <h2 className='text-gray-700 font-bold'>| &nbsp; {formattedDate}</h2>
                </div>
                <div>
                    <h2 className='text-2xl font-bold mb-2 text-white'>{title}</h2>  
                </div>
                <div>
                    <p className='text-white'>{parse(newContent)}</p>
                </div>
                <div>
                    <div className='text-pink-500'>Read article </div>
                </div>
               
            </div>
            </Link>
            
    );
};


export default CardNoImage;