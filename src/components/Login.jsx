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

import {
Card,
Input,
Checkbox,
Button,
Typography,
CardHeader,
CardBody,
CardFooter,
IconButton
} from "@material-tailwind/react"
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
                alert("Login successfully")
                navigate("/all-posts")
            }
        } catch (error) {
            alert("Login failed")
            console.log("Login form :: error ",error)
            return false
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            {/* if error generated */}
            {error && <p className='mt-8 text-red-500 text-center'>{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <Card className='w-96'>
                    <CardHeader
                    variant='gradient'
                    color='gray'
                    className='mb-4 grid h-20 place-items-center'
                    >
                        <Typography variant='h3' color='white'>Sign In</Typography>
                    </CardHeader>
                    <CardBody className='flex flex-col gap-4'>
                        <Input 
                        label='email'
                        size='lg'
                        type='email'
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input 
                        label='password'
                        size='lg'
                        type='password'
                        {...register("password", {
                            required: true,
                        })}
                        />
                    </CardBody>
                    <CardFooter className='pt-0'>
                        <Button variant='gradient' fullWidth type='submit' >Sign In</Button>
                        <Typography variant='small' className='mt-6 flex justify-center'>
                            Don&apos;t have a account ?
                            <Typography
                            as='a'
                            href='/signup'
                            variant='small'
                            color='blue-gray'
                            className='ml-1 font-bold hover:underline'
                            >
                                Sign Up
                            </Typography>
                            
                        </Typography>
                            <div className='flex flex-row gap-5 items-center justify-center p-5 cursor-pointer'>
                                {/* <!-- Google --> */}
                                <div>
                                    <svg 
                                    className='h-7 w-7 text-red-900'
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                                        fill-rule="evenodd"
                                        clip-rule="evenodd" />
                                    </svg>
                                </div>
                                 {/* Twitter icon */}
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 text-blue-700"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </div>
                                {/* Git hub icon */}
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-black"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </div>
                            </div>
                    </CardFooter>
                </Card>
            </form>
       </div>
    );
};



export default Login;