    import React from 'react';
    import appwriteService from '../../backendAppwrite/config'
    import { Link } from 'react-router-dom'
    import ImageCard from './ImageCard';
    import parse from 'html-react-parser'
    function ImageOverlapCard({ $id, title, Image, content }){
        return (
            <Link to={`/post/${$id}`}>
                <main style={{ display: 'flex', gap: '16px'}}>
                    <div className='card-container'>
                        <ImageCard imgSrc={appwriteService.getFilePreview(Image)}>
                            <h3 className='text-xl font-bold mb-2'>{title}</h3>
                            <div>{parse(content)}</div>
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