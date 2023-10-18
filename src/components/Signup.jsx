import React, { useState } from 'react';
import authService from '../backendAppwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { set, useForm } from 'react-hook-form'
import { Logo } from '../components/index'
import { data } from 'autoprefixer';
import { Card, CardBody, CardHeader, Typography, Input, CardFooter, Button } from '@material-tailwind/react';
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
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                navigate("/all-posts")
            }
        } catch (error) {
            console.log("Registration form :: error ",error);
        }
    }
    return (
        <div className='flex items-center justify-center'>
           
                    {/* error display */}
                    {error && <p className='mt-8 text-center text-red-600'>{error}</p>}
                    <form onSubmit={handleSubmit(create)}>
                        <Card className='w-96'>
                            <CardHeader
                            variant='gradient'
                            color='gray'
                            className='mb-4 grid h-28 place-items-center'
                            >
                                <Typography variant='h3' color='white'>Sign Up</Typography>
                            </CardHeader>
                            <CardBody className='flex flex-col gap-4'>
                                <Input 
                                label='name'
                                size='lg'
                                {...register("name", {
                                    required: true,
                                })}
                                />
                                <Input 
                                label='email'
                                size='lg'
                                type='email'
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) =>  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                    }
                                })}
                                />
                                <Input 
                                label='password'
                                size='lg'
                                type='password'
                                {...register("password",{
                                    required:true,
                                })}
                                />
                            </CardBody>
                            <CardFooter className='pt-0'>
                                <Button variant='gradient' fullWidth type='submit'>Sign Up</Button>
                                <Typography variant='small' className='mt-6 flex justify-center'>
                                    Already have an account ? &nbsp;
                               
                                        <Typography
                                        as='a'
                                        href='/login'
                                        variant='small'
                                        color='blue-gray'
                                        className='ml-1 font-bold hover:underline'
                                        >
                                            Sign In
                                        </Typography>
                                </Typography>
                            </CardFooter>
                        </Card>
                    </form>
        </div>
    );
};


export default Signup;