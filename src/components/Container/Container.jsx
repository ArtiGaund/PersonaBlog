import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Container({children}) {
  return (
  <div className='w-full max-w-7xl mx-auto px-4'>
    {children}
    <ToastContainer />
    </div>);
  
}

export default Container