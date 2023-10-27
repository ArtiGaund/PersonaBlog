import React, { useEffect, useState } from 'react';
//for clickable and re direction
import { Link, useNavigate } from 'react-router-dom'
// login from authSlice
import { login as authLogin } from '../store/authSlice'
//authService
import authService from '../backendAppwrite/auth'
import { useDispatch } from 'react-redux'
// form 
import { useForm } from 'react-hook-form'
import { Container } from '../components/index';
import signin from "../images/signin.jpg"
import { toast } from 'react-toastify';

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [ error, setError ] = useState("")
    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                toast.success('Login successfully !', {
                    position: toast.POSITION.TOP_RIGHT
                })
                navigate("/all-posts")
            }
        } catch (error) {
            toast.error('Login Failed !', {
                position: toast.POSITION.TOP_RIGHT
            })
            console.log("Login form :: error ",error)
            return false
        }
    }
    return (
        <Container>
            <div className='flex justify-center h-[35rem]  bg-black rounded-3xl'>
                 {/* if error generated */}
                {error && <p className='mt-8 text-red-500 text-center'>{error}</p>}
            <div className='hidden lg:block lg:w-3/5  bg-purple-300 rounded-3xl'
            style={{ 
                backgroundImage: `url(${signin})`,
                backgroundSize: 'cover',
                height: '100%',
                width: '100%',
            }}
            ></div>
            <div className='flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-2/5'>
                    <div className='w-full'>
                        <h1 className='flex text-2xl font-semibold tracking-wider text-white capitalize dark:text-white'>
                            Sign In
                        </h1>
                        <div>
                        <div className='flex item-center justify-center flex-col p-2 gap-2'>
                            <p className='flex text-white text-sm'>If you don't have account register ?</p>
                            <span className='flex text-white text-sm'>You can &nbsp;<a className='cursor-pointer text-pink-500' href='/signup'>Sign Up</a></span>
                            
                        </div>
                        <form className='grid grid-flow-row gap-4 mt-8 md:grid-flow-row items-center justify-center'
                        onSubmit={handleSubmit(login)}
                        >
                            <div>
                                <input
                                 type="email" 
                                 placeholder="Email" 
                                 className="block w-[10rem] md:w-[20rem] px-5 py-3 mt-2 text-white
                                placeholder-gray-400 bg-gray-900 rounded-md
                                dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300
                                dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400
                                focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                {...register("email", {
                                                        required: true,
                                                         validate: {
                                                             matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                                     "Email address must be a valid address",
                                                         }
                                                     })}
                                />
                            </div>
                            <div>
                                <input
                                type="password"
                                placeholder="Password"
                                className="block w-[10rem] md:w-[20rem] px-5 py-3 mt-2 text-gray-700
                                placeholder-gray-400 bg-gray-900 rounded-md
                                dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300
                                dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400
                                focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                {...register("password",{ required:true, })}
                                />
                            </div>
                            <div>
                                <div className='flex flex-row items-center justify-center'>
                                    <a className='flex pt-2 text-gray-600' href="/forgotpassword"> &nbsp; Forgot password ?</a>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="flex items-center justify-center w-[10rem] md:w-[20rem] px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-pink-600 rounded-md hover:bg-pink-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center">
                                    <span>Sign Up </span>
                                </button>
                            </div>
                            <div>
                                <p className='flex items-center justify-center'>Or</p>
                            </div>

                        </form>
                        
                    </div>
                   </div>
                </div>
            </div>
        </Container>
    );
};



export default Login;