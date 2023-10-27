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
                                 class="block w-[20rem] md:w-[30rem] px-5 py-3 mt-2 text-gray-700
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
                                 class="block w-[20rem] md:w-[30rem] px-5 py-3 mt-2 text-gray-700
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
                                class="block w-[20rem] md:w-[30rem] px-5 py-3 mt-2 text-gray-700
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
                                    class="flex items-center justify-center w-[20rem] md:w-[30rem] px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 text-center">
                                    <span>Sign Up </span>
                                </button>
                            </div>
                            {/* <div>
                                <p className='flex items-center justify-center'>Or</p>
                            </div> */}
                            {/* <div> */}
                                {/* <div className='flex flex-row gap-4 items-center justify-center'> */}
                                     {/* <!-- Google --> */}
                                    {/* <div>
                                        <button>
                                            <svg 
                                            class='h-7 w-7 text-red-800'
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24">
                                                <path
                                                 d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                                                fill-rule="evenodd"
                                                clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                    </div> */}
                                     {/* Git hub icon */}
                                    {/* <div>
                                        <button 
                                            onClick={() => SignupUsingGithub()}>
                                            <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 text-black"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                                 <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </button>
                                    </div> */}
                                {/* </div> */}
                            {/* </div> */}
                            
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