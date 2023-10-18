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
CardFooter
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
                navigate("/all-posts")
            }
        } catch (error) {
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
                    </CardFooter>
                </Card>
            </form>
       </div>
    );
};



export default Login;