import React, { useEffect, useState } from 'react';
import authService from '../backendAppwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Logo, Container } from '../components/index'
import signup from "../images/signup.jpg"
import { toast } from 'react-toastify';
const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [ error, setError ] = useState("")
    const { register, handleSubmit } = useForm();

    const create = async(data) => {
        setError("")
        try {
                const userData = await authService.createAccount(data)
                if(userData){
                        dispatch(login(userData))
                    toast.success("Account created successfully !", {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    navigate("/all-posts")
                }
           
        } catch (error) {
           toast.error("There is an error to create an account. ", {
            position: toast.POSITION.TOP_RIGHT
           })
            console.log("Registration form :: error ",error);
        }
    }
    return (
        <Container>
            <div className='flex justify-center h-[35rem]  bg-white rounded-3xl'>
                {/* error display */}
                {error && <p className='mt-8 text-center text-red-600'>{error}</p>}
                <div className='hidden lg:block lg:w-2/5  bg-purple-300 rounded-3xl'
                 style={{ 
                    backgroundImage: `url(${signup})`,
                    backgroundSize: 'cover',
                    height: '100%',
                    width: '100%',
                }}
                ></div>
               <div className='flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5'>
                    <div className='w-full'>
                        <h1 className='flex items-center justify-center text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white'>
                            Create Account
                        </h1>
                        <form className='grid grid-flow-row gap-4 mt-8 md:grid-flow-row items-center justify-center'
                        onSubmit={handleSubmit(create)}
                        >
                            <div>
                                <input
                                 type="text" 
                                 placeholder="Full Name" 
                                 className="block w-[20rem] md:w-[30rem] px-5 py-3 mt-2 text-gray-700
                                placeholder-gray-600 bg-white border border-gray-200 rounded-md
                                dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300
                                dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400
                                focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                {...register("name", { required: true, })}
                                 />
                            </div>
                            <div>
                                <input
                                 type="email" 
                                 placeholder="Email" 
                                 className="block w-[20rem] md:w-[30rem] px-5 py-3 mt-2 text-gray-700
                                placeholder-gray-600 bg-white border border-gray-200 rounded-md
                                dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300
                                dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400
                                focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                {...register("email", {
                                                required: true,
                                                validate: {
                                                    matchPattern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                        "Email address must be a valid address",
                                                    }
                                })}
                                />
                            </div>
                            <div>
                                <input
                                type="password"
                                placeholder="Password"
                                className="block w-[20rem] md:w-[30rem] px-5 py-3 mt-2 text-gray-700
                                placeholder-gray-600 bg-white border border-gray-200 rounded-md
                                dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300
                                dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400
                                focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                {...register("password",{ required:true, })}
                                />
                            </div>
                            <div>
                                <div className='flex flex-row justify-end'>
                                    <span className='flex pt-2 text-blue-600'><a className=' cursor-pointer hover:text-blue-300 hover:underline' href="/forgotpassword">Forgot password </a> ?</span>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="flex items-center justify-center w-[20rem] md:w-[30rem] px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center">
                                    <span>Sign Up </span>
                                </button>
                            </div>
                           
                            
                        </form>
                        <div>
                        <div className='flex item-center justify-center mt-6 bottom-0'>
                            <p className='text-gray-500'>Already have an account ?  &nbsp;</p>
                            <a className='cursor-pointer text-blue-500' href='/login'>Sign In</a>
                        </div>
                    </div>
                    </div>
                   
                </div>
                
            </div>
      </Container>
      

    );
};


export default Signup;