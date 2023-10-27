import React from 'react';
import logo from '../images/logo.png'

const Logo = ({ width = '100px'}) => {
    return (
        <div className='font-bold text-blue-800 lg:text-2xl leading-6 tracking-wide sm:text-sm'>
            PersonaBlog
        </div>
    );
};


export default Logo;